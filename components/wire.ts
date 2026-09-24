'use client';
import { useEffect } from 'react';
export function wire(root: HTMLElement) {
  const header = root.querySelector('header');
  const wrap = header?.querySelector('[inert]') as HTMLElement | null;
  const link = header?.querySelector('nav a[href="/"]') as HTMLElement | null;
  if (header && wrap && link) {
    wrap.removeAttribute('inert');
    const open = () => {
      wrap.classList.remove('grid-rows-[0fr]'); wrap.classList.add('grid-rows-[1fr]');
      wrap.querySelectorAll('.opacity-0').forEach((e) => (e as HTMLElement).classList.remove('translate-y-[32px]', 'opacity-0'));
      link.setAttribute('aria-expanded', 'true');
    };
    const close = () => { wrap.classList.add('grid-rows-[0fr]'); wrap.classList.remove('grid-rows-[1fr]'); };
    link.addEventListener('mouseenter', open);
    header.addEventListener('mouseleave', close);
    link.addEventListener('click', (e) => { if (!wrap.classList.contains('grid-rows-[1fr]')) { e.preventDefault(); open(); } });
  }
  const ans: Record<string, string> = {
    'Who can open': 'Anyone 18+ in 150+ countries with valid ID can open an nsave account in minutes.',
    'real bank': 'Yes - US account+routing (ACH/Wire), UK sort code+account, EU IBAN (SEPA).',
    'How safe': 'Funds held with regulated partners. Bank-grade encryption, 2FA, monitoring.',
    'How long': 'Under 10 minutes. ID + selfie, details issued instantly.',
    'What does it cost': 'Free to open. Small transparent fees on send/convert. See Pricing.',
    'Which currencies': 'Hold USD/EUR/GBP, send to PKR, BDT, EGP, NGN and more.',
  };
  root.querySelectorAll('main ul li h3 button').forEach((b) => {
    const btn = b as HTMLButtonElement;
    if (btn.dataset.w) return; btn.dataset.w = '1';
    const key = Object.keys(ans).find((k) => (btn.textContent || '').includes(k));
    if (!key) return;
    const li = btn.closest('li')!;
    const d = document.createElement('div');
    d.style.cssText = 'max-height:0;overflow:hidden;transition:max-height .3s;';
    d.innerHTML = '<p class="pb-6 text-body text-grey-900">' + ans[key] + '</p>';
    li.appendChild(d);
    btn.addEventListener('click', () => {
      const was = btn.getAttribute('aria-expanded') === 'true';
      root.querySelectorAll('main ul li h3 button').forEach((o) => {
        o.setAttribute('aria-expanded', 'false');
        (o.closest('li')?.querySelector('[data-faq]') as HTMLElement | null)?.style.setProperty('max-height', '0px');
      });
      d.setAttribute('data-faq', '1');
      btn.setAttribute('aria-expanded', String(!was));
      if (!was) d.style.maxHeight = d.scrollHeight + 'px';
    });
  });
  root.querySelectorAll('.country-selector-list button').forEach((b) => {
    const el = b as HTMLButtonElement;
    if (el.dataset.w) return; el.dataset.w = '1';
    el.addEventListener('click', () => {
      root.querySelectorAll('.country-selector-list button').forEach((o) => o.setAttribute('aria-pressed', 'false'));
      el.setAttribute('aria-pressed', 'true');
    });
  });
}
export function useReveal() {
  useEffect(() => { return () => {}; }, []);
}
