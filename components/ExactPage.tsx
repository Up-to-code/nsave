'use client';
import { useEffect } from 'react';
import { wireInteractions } from './wire';
import { startAnimations } from './animations';

type Props = { header: string; main: string; footer: string; lang?: string; dir?: string };

// Renders a scraped nsave page verbatim (real markup + real nsave-core.css) and then
// attaches the site's own behaviours: mega-menu, accordions, marquee, hero reveal.
export default function ExactPage({ header, main, footer, lang, dir }: Props) {
  useEffect(() => {
    const el = document.documentElement;
    const prevLang = el.lang;
    const prevDir = el.dir;
    if (lang) el.lang = lang;
    if (dir) el.dir = dir;
    const root = document.getElementById('nx') as HTMLElement | null;
    if (!root) return;
    wireInteractions(root);
    const stop = startAnimations();
    return () => {
      el.lang = prevLang;
      el.dir = prevDir;
      stop();
    };
  }, []);

  return (
    <div id="nx">
      <div dangerouslySetInnerHTML={{ __html: header }} />
      <main dangerouslySetInnerHTML={{ __html: main }} />
      <div dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  );
}
