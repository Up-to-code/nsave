'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wire } from './wire';
export default function ExactPage({ header, main, footer }: { header: string; main: string; footer: string }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.getElementById('nx') as HTMLElement | null;
    if (root) wire(root);
    const hero = document.querySelector('.hero-load');
    if (hero) {
      hero.classList.remove('hero-load--pending');
      hero.classList.add('hero-load--animating');
      const t = setTimeout(() => {
        hero.classList.remove('hero-load--animating');
        hero.classList.add('hero-load--settled');
        ScrollTrigger.refresh();
      }, 2100);
      (window as unknown as { __heroT?: number }).__heroT = t as unknown as number;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray('#nx main section:not(:first-child)').forEach((sec) => {
        gsap.fromTo(sec as Element, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: sec as Element, start: 'top 92%' },
        });
      });
    });
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach((x) => x.kill()); };
  }, []);
  return (
    <div id="nx">
      <div dangerouslySetInnerHTML={{ __html: header }} />
      <main dangerouslySetInnerHTML={{ __html: main }} />
      <div dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  );
}
