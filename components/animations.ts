// Motion layer for the scraped pages. Mirrors how nsave.com drives motion:
// - hero: pure CSS state machine (hero-load--pending/--animating/--settled)
// - stats strip: infinite marquee via the site's own stats-marquee-ltr keyframes
// - rating digits: roll-up driven by the inline translateY(calc(N * 1lh)) value
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type El = HTMLElement;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reads one of the hero's CSS custom properties as milliseconds. */
function heroMs(hero: El, name: string, fallback: number) {
  const raw = getComputedStyle(hero).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return fallback;
  return raw.endsWith('ms') ? value : value * 1000;
}

/** pending -> animating -> settled, timed from the hero's own CSS custom properties.
 *
 *  Faithful to the live site, whose settled state pins `.hero-load__media` to the
 *  hero's top edge (`position: absolute; top: 0`) and lands it below the copy with
 *  `translateY(var(--hero-drop-y, 0px))`. That var is measured at runtime, so the
 *  scrape does not carry it: without it the media would sit at translateY(0) and
 *  paint over the headline. Measure the flow position from the DOM itself.
 */
export function startHero() {
  const heroes = [...document.querySelectorAll('.hero-load')] as El[];
  if (!heroes.length) return () => {};

  const dropOf = (hero: El): number => {
    const media = hero.querySelector('.hero-load__media') as El | null;
    if (!media) return 0;
    const slot = hero.querySelector('.hero-load__media-slot') as El | null;
    const anchor =
      (slot && slot.getBoundingClientRect().height > 0 ? slot : null) ||
      (hero.querySelector('.hero-load__stats') as El | null) ||
      (hero.querySelector('.hero-load__content') as El | null);
    if (!anchor) return 0;
    const heroTop = hero.getBoundingClientRect().top + window.scrollY;
    const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, Math.round(anchorTop - heroTop));
  };

  const setDropVars = () => heroes.forEach((hero) => {
    hero.style.setProperty('--hero-drop-y', `${dropOf(hero)}px`);
  });

  setDropVars();
  // fonts/images change the copy height: recompute until the page is quiescent
  let guard = 0;
  const resync = window.setInterval(() => { setDropVars(); if (++guard > 20) window.clearInterval(resync); }, 250);
  const onResize = () => setDropVars();
  window.addEventListener('resize', onResize);
  let fonts: Promise<unknown> | undefined;
  try {
    fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
  } catch { /* older engines: interval covers it */ }
  if (fonts) void fonts.then(() => setDropVars()).catch(() => {});

  const runs = heroes.map((hero) => {
    const total =
      heroMs(hero, '--hero-mask-ms', 800) +
      heroMs(hero, '--hero-drop-pause-ms', 196) +
      heroMs(hero, '--hero-drop-ms', 956);
    hero.classList.remove('hero-load--pending');
    hero.classList.add('hero-load--animating');
    const t = window.setTimeout(() => {
      hero.classList.remove('hero-load--animating');
      hero.classList.add('hero-load--settled');
      ScrollTrigger.refresh();
    }, total + 60);
    return t;
  });

  return () => {
    window.clearInterval(resync);
    window.removeEventListener('resize', onResize);
    runs.forEach((t) => window.clearTimeout(t));
  };
}

/** Infinite marquee using the site's stats-marquee-ltr keyframes + --marquee-distance. */
export function startStatsMarquee() {
  const track = document.querySelector('.stats-track') as El | null;
  if (!track) return () => {};
  const items = [...track.children] as El[];
  if (!items.length || items[0].dataset.marqueeWrap) return () => {};
  const divider = items[1]?.className ?? '';

  const enable = () => {
    if (track.dataset.marquee === 'on') return;
    // the ul must stay the overflow/drag container, so an inner wrapper does the moving
    const wrap = document.createElement('div');
    wrap.dataset.marqueeWrap = 'true';
    wrap.style.display = 'flex';
    wrap.style.width = 'max-content';
    wrap.style.willChange = 'transform';
    items.forEach((item) => wrap.appendChild(item));
    items.forEach((item, i) => {
      const clone = item.cloneNode(true) as El;
      delete clone.dataset.marqueeWrap;
      if (i === 0 && divider) clone.className = divider; // keep the divider at the seam
      wrap.appendChild(clone);
    });
    track.appendChild(wrap);

    const distance = wrap.scrollWidth / 2;
    if (!distance) return;
    wrap.style.setProperty('--marquee-distance', `${distance}px`);
    track.style.setProperty('--marquee-distance', `${distance}px`);
    wrap.style.animationName = 'stats-marquee-ltr';
    wrap.style.animationDuration = `${Math.min(45, Math.max(14, distance / 45)).toFixed(2)}s`;
    wrap.classList.add('stats-marquee-track');
    track.dataset.marquee = 'on';
  };
  const disable = () => {
    if (track.dataset.marquee !== 'on') return;
    const wrap = track.querySelector('[data-marquee-wrap]') as El | null;
    if (wrap) {
      [...wrap.children].forEach((child, i) => {
        if (i < items.length) track.insertBefore(child, wrap);
      });
      wrap.remove();
    }
    delete track.dataset.marquee;
  };

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => (mq.matches ? disable() : enable());
  sync();
  mq.addEventListener('change', sync);
  return () => {
    mq.removeEventListener('change', sync);
    disable();
  };
}


/** Drag-to-scroll with grab/grabbing cursors; pauses the marquee while held. */
export function startDragScroll() {
  const track = document.querySelector('.stats-track') as El | null;
  if (!track) return () => {};
  let down = false;
  let startX = 0;
  let startLeft = 0;
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    startX = e.clientX;
    startLeft = track.scrollLeft;
    track.style.animationPlayState = 'paused';
  };
  const onMove = (e: PointerEvent) => {
    if (down) track.scrollLeft = startLeft - (e.clientX - startX);
  };
  const onUp = () => {
    if (!down) return;
    down = false;
    track.style.animationPlayState = '';
  };
  track.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  return () => {
    track.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  };
}

/** Rolls the SSR-final digits up from 0 when the rating block scrolls into view.
 *  The target is cached on the element, because the first run rewrites the style
 *  (and StrictMode runs effects twice in dev). */
export function startCounters() {
  const isDigit = (el: Element) => /height:\s*1lh/.test(el.getAttribute('style') || '');
  const reels = [
    ...new Set(
      ([...document.querySelectorAll('main [style*="1lh"]')] as El[])
        .filter(isDigit)
        .map((digit) => digit.parentElement)
        .filter((parent): parent is El => !!parent)
    ),
  ];
  if (!reels.length) return () => {};
  const observers: IntersectionObserver[] = [];
  const groups = new Map<El, { reel: El; settle: () => void }[]>();

  reels.forEach((reel) => {
    const declared = (reel.getAttribute('style') || '').match(/calc\(\s*(-?\d+(?:\.\d+)?)\s*\*\s*1lh\s*\)/);
    if (declared) reel.dataset.reelTarget = declared[1];
    const target = reel.dataset.reelTarget;
    if (!target) return; // target unknown: leave the SSR value alone rather than show 0

    const settle = () => {
      const value = reel.dataset.reelTarget;
      if (value && reel.isConnected) reel.style.transform = `translateY(calc(${value} * 1lh))`;
    };
    reel.style.transition = 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
    reel.style.transform = 'translateY(calc(0 * 1lh))';

    // the reel is clipped to one line by an overflow-hidden wrapper, so its own
    // intersection ratio never gets high enough: watch the enclosing section instead
    const trigger = (reel.closest('section') || reel) as El;
    const group = groups.get(trigger) || [];
    group.push({ reel, settle });
    groups.set(trigger, group);
  });

  groups.forEach((group, trigger) => {
    if (trigger.getBoundingClientRect().top < window.innerHeight) {
      group.forEach(({ settle }) => settle()); // already on screen: never sit at zero
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      group.forEach(({ settle }) => settle());
      io.disconnect();
    }, { threshold: 0.15 });
    io.observe(trigger);
    observers.push(io);
  });

  return () => {
    observers.forEach((io) => io.disconnect());
    reels.forEach((reel) => {
      if (reel.dataset.reelTarget && reel.isConnected) {
        reel.style.transform = `translateY(calc(${reel.dataset.reelTarget} * 1lh))`;
      }
    });
  };
}

/** Subtle scroll reveal for the body sections below the hero. */
export function startReveals() {
  if (prefersReducedMotion()) return () => {};
  const sections = gsap.utils.toArray('#nx main > section:not(:first-child)') as Element[];
  if (!sections.length) return () => {};
  const ctx = gsap.context(() => {
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: { trigger: section, start: 'top 88%', once: true },
        }
      );
    });
  });
  return () => ctx.revert();
}

/** Boots the whole motion layer for a page and returns a teardown fn. */
export function startAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  const stops = [startHero(), startStatsMarquee(), startDragScroll(), startCounters(), startReveals()];
  return () => {
    stops.forEach((stop) => stop());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

