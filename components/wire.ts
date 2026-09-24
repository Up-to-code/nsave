// Replicates nsave.com's own JS behaviours on the scraped markup.
// The original site animates the mega-menu links through the CSS `translate`/`opacity`
// properties (its inline `transition-property: color, opacity, translate` proves it),
// and the FAQ accordion through the same grid-template-rows collapse the nav uses.
// NOTE: in the scraped SSR every staggered mega-menu item (the 11 links, the "Tools"
// label AND the "About us" image card) ships as `translate-y-[32px] opacity-0`;
// the site's own JS lifts them to visible. Wire the whole set, not just anchors.
const MEGA_ITEMS =
  'div.absolute.inset-x-0.top-full [style*="transition-property:color, opacity, translate"]';
const OFF_Y = '0px 32px';
const ON_Y = '0px 0px';

type El = HTMLElement;

const isStaggerItem = (el: El) =>
  (el.style.transitionProperty || '').replace(/\s+/g, '').includes('opacity,translate');

const stagger = (el: El, i: number, delayMs: number) => {
  const props = (el.style.transitionProperty || '').split(',').map((p) => p.trim());
  if (!props.length || !props[0]) return;
  el.style.transitionDelay = props
    .map((p) => (p === 'opacity' || p === 'translate' ? `${i * delayMs}ms` : '0ms'))
    .join(', ');
};

export function wireMegaMenu(root: El) {
  const header = root.querySelector('header');
  const panel = header?.querySelector('div.absolute.inset-x-0.top-full') as El | null;
  const trigger = header?.querySelector('nav a[aria-expanded]') as El | null;
  if (!header || !panel || !trigger) return;

  panel.removeAttribute('inert'); // scraped SSR ships collapsed content as inert
  // Every item the site staggers (nav links + the Tools label share one signature:
  // inline `transition-property: color, opacity, translate` and start hidden).
  const items = ([...panel.querySelectorAll(MEGA_ITEMS)] as El[]).filter(isStaggerItem);
  const setClosed = (i: number) => {
    items.forEach((el, n) => {
      stagger(el, i === -1 ? n : i, 0);
      el.style.translate = OFF_Y;
      el.style.opacity = '0';
    });
  };
  const setOpen = () => {
    items.forEach((el, n) => {
      stagger(el, n, 30);
      el.style.translate = ON_Y;
      el.style.opacity = '1';
    });
  };
  setClosed(-1);

  const open = () => {
    panel.classList.remove('grid-rows-[0fr]');
    panel.classList.add('grid-rows-[1fr]');
    setOpen();
    trigger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    if (!panel.classList.contains('grid-rows-[1fr]')) return;
    items.forEach((el, n) => stagger(el, items.length - 1 - n, 20));
    panel.classList.add('grid-rows-[0fr]');
    panel.classList.remove('grid-rows-[1fr]');
    setClosed(-1);
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('mouseenter', open);
  trigger.addEventListener('focus', open);
  header.addEventListener('mouseleave', close);
  panel.addEventListener('mouseenter', open);
  trigger.addEventListener('click', (e) => {
    if (panel.classList.contains('grid-rows-[1fr]')) return; // second click follows the link
    e.preventDefault();
    open();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

export function wireAccordions(root: El) {
  root.querySelectorAll('main h3 button[aria-expanded]').forEach((node) => {
    const btn = node as HTMLButtonElement;
    if (btn.dataset.wired) return;
    btn.dataset.wired = '1';
    const id = btn.getAttribute('aria-controls');
    const panel = (id ? root.querySelector(`#${id}`) : null) ||
      (btn.closest('li')?.querySelector('[data-faq-panel]') as El | null);
    if (!panel) return;

    const setOpen = (on: boolean) => {
      panel.classList.toggle('grid-rows-[1fr]', on);
      panel.classList.toggle('grid-rows-[0fr]', !on);
      btn.setAttribute('aria-expanded', String(on));
      const icon = btn.querySelector('svg');
      if (icon) icon.style.rotate = on ? '45deg' : '0deg';
    };

    btn.addEventListener('click', () => {
      const willOpen = btn.getAttribute('aria-expanded') !== 'true';
      const scope = btn.closest('ul') || root;
      scope.querySelectorAll('h3 button[aria-expanded]').forEach((other) => {
        const o = other as HTMLButtonElement;
        const oid = o.getAttribute('aria-controls');
        const op = (oid ? root.querySelector(`#${oid}`) : null) as El | null;
        if (op) {
          op.classList.add('grid-rows-[0fr]');
          op.classList.remove('grid-rows-[1fr]');
        }
        o.setAttribute('aria-expanded', 'false');
        const oi = o.querySelector('svg');
        if (oi) oi.style.rotate = '0deg';
      });
      setOpen(willOpen);
    });
  });
}

export function wireCountrySelector(root: El) {
  const list = root.querySelector('.country-selector-list');
  if (!list) return;
  const buttons = [...list.querySelectorAll('button')] as El[];
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((o) => {
        o.setAttribute('aria-pressed', 'false');
        o.classList.remove('bg-grey-50');
      });
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('bg-grey-50'); // site styles the active pill via JS, using its grey-50 token
    });
  });
  // reflect the SSR-selected pill on first paint
  buttons.filter((b) => b.getAttribute('aria-pressed') === 'true').forEach((b) => b.classList.add('bg-grey-50'));
}

const MOBILE_LINKS: Array<[string, string]> = [
  ['Personal', '/'],
  ['Business', '/business'],
  ['Pricing', '/pricing'],
  ['Learn', '/help'],
  ['Accounts', '/'],
  ['Send money', '/send-money-home'],
  ['Cards', '/cards'],
  ['Rewards', '/rewards'],
  ['Invest', '/invest'],
  ['Compare', '/compare'],
  ['About us', '/about'],
  ['Get the app', '/get-the-app'],
];

// nsave.com renders its mobile hamburger client-side, so the scraped SSR has no
// nav below the lg breakpoint (nav is `hidden lg:flex`). Inject the button + panel
// so narrow viewports can navigate. Idempotent; scoped to the page root.
export function wireMobileMenu(root: El) {
  const header = root.querySelector('header');
  const bar = header?.querySelector('div.mx-auto.w-full') as El | null;
  if (!header || !bar || bar.querySelector('[data-mobile-menu-btn]')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.dataset.mobileMenuBtn = 'true';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
  btn.className = 'lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-black-6';
  btn.style.fontSize = '20px';
  btn.style.lineHeight = '1';
  btn.textContent = '☰';

  const panel = document.createElement('div');
  panel.dataset.mobileMenuPanel = 'true';
  panel.className = 'lg:hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out';
  const inner = document.createElement('div');
  inner.className = 'overflow-hidden';
  const list = document.createElement('nav');
  list.setAttribute('aria-label', 'Mobile');
  list.className = 'flex flex-col gap-1 bg-white px-5 pb-6 pt-2';
  MOBILE_LINKS.forEach(([label, href]) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.className = 'rounded-[16px] px-4 py-3 text-[17px] leading-[1.16] font-medium hover:bg-grey-50';
    list.appendChild(a);
  });
  inner.appendChild(list);
  panel.appendChild(inner);
  header.appendChild(panel);

  const setOpen = (on: boolean) => {
    panel.classList.toggle('grid-rows-[1fr]', on);
    panel.classList.toggle('grid-rows-[0fr]', !on);
    btn.setAttribute('aria-expanded', String(on));
    btn.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    btn.textContent = on ? '✕' : '☰';
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  list.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) setOpen(false);
  });

  // place the button at the end of the bar (after the CTA)
  bar.appendChild(btn);
}

export function wireInteractions(root: El) {
  wireMegaMenu(root);
  wireMobileMenu(root);
  wireAccordions(root);
  wireCountrySelector(root);
}
