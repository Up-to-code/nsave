// Replicates nsave.com's own JS behaviours on the scraped markup.
// The original site animates the mega-menu links through the CSS `translate`/`opacity`
// properties (its inline `transition-property: color, opacity, translate` proves it),
// and the FAQ accordion through the same grid-template-rows collapse the nav uses.
const MEGA_LINKS = 'div.absolute.inset-x-0.top-full a[href]';
const OFF_Y = '0px 32px';
const ON_Y = '0px 0px';

type El = HTMLElement;

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
  const links = [...panel.querySelectorAll(MEGA_LINKS)] as El[];
  const setClosed = (i: number) => {
    links.forEach((el, n) => {
      stagger(el, i === -1 ? n : i, 0);
      el.style.translate = OFF_Y;
      el.style.opacity = '0';
    });
  };
  const setOpen = () => {
    links.forEach((el, n) => {
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
    links.forEach((el, n) => stagger(el, links.length - 1 - n, 20));
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

export function wireInteractions(root: El) {
  wireMegaMenu(root);
  wireAccordions(root);
  wireCountrySelector(root);
}
