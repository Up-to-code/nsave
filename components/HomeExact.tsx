'use client';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import headerHtml from './header_raw.html';
import mainHtml from './main_raw.html';
import footerHtml from './footer_raw.html';

export default function HomeExact() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hero = document.querySelector('.hero-load');
    if (hero) {
      hero.classList.remove('hero-load--pending');
      hero.classList.add('hero-load--animating');
      const t = setTimeout(() => {
        hero.classList.remove('hero-load--animating');
        hero.classList.add('hero-load--settled');
      }, 2200);
      (window as unknown as { __heroT?: number }).__heroT = t as unknown as number;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray('main section').forEach((sec) => {
        gsap.from(sec as Element, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sec as Element, start: 'top 88%' },
        });
      });
    });
    const track = document.querySelector('.stats-track') as HTMLElement | null;
    let cleanup = () => {};
    if (track) {
      let down = false;
      let sx = 0;
      let sl = 0;
      const pd = (e: PointerEvent) => {
        down = true;
        sx = e.clientX;
        sl = track.scrollLeft;
      };
      const pu = () => {
        down = false;
      };
      const pm = (e: PointerEvent) => {
        if (down) track.scrollLeft = sl - (e.clientX - sx);
      };
      track.addEventListener('pointerdown', pd);
      window.addEventListener('pointerup', pu);
      window.addEventListener('pointermove', pm);
      cleanup = () => {
        track.removeEventListener('pointerdown', pd);
        window.removeEventListener('pointerup', pu);
        window.removeEventListener('pointermove', pm);
      };
    }
    return () => {
      ctx.revert();
      cleanup();
    };
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
      <main dangerouslySetInnerHTML={{ __html: mainHtml }} />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
