// Injects the real nsave FAQ answers (scraped from the site's own payload/chunks)
// into components/exact/*-main.html, using the site's own collapse pattern:
// grid-rows-[0fr] -> grid-rows-[1fr] with transition-[grid-template-rows].
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, '..', 'components', 'exact');
const faq = JSON.parse(readFileSync(join(dir, 'faq.json'), 'utf8'));

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .trim();

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let id = 0;
let injected = 0;
const files = readdirSync(dir).filter((f) => f.endsWith('-main.html'));

for (const file of files) {
  const path = join(dir, file);
  let html = readFileSync(path, 'utf8');
  const starts = [...html.matchAll(/<span class="text-h5 leading-snug font-semibold">/g)].map((m) => m.index);
  // work backwards so indices stay valid
  for (const start of starts.reverse()) {
    const qStart = start + '<span class="text-h5 leading-snug font-semibold">'.length;
    const qEnd = html.indexOf('</span>', qStart);
    if (qEnd === -1) continue;
    const question = decode(html.slice(qStart, qEnd));
    const answer = faq[question];
    if (!answer) {
      console.warn(`  ! no answer for: ${question.slice(0, 60)}`);
      continue;
    }
    const btnEnd = html.indexOf('</button>', qEnd);
    const h3End = html.indexOf('</h3>', btnEnd);
    const liEnd = html.indexOf('</li>', h3End);
    if (btnEnd === -1 || h3End === -1 || liEnd === -1) continue;
    if (html.slice(h3End, liEnd).includes('data-faq-panel')) continue; // idempotent

    id += 1;
    const panelId = `faq-panel-${id}`;
    const panel =
      `<div id="${panelId}" data-faq-panel="true" role="region" aria-label="${esc(question)}" ` +
      `class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out">` +
      `<div class="overflow-hidden"><p class="pb-6 text-body text-grey-900">${esc(answer)}</p></div></div>`;

    // 1) insert the panel just before the closing </li> (indices before liEnd stay valid)
    html = html.slice(0, liEnd) + panel + html.slice(liEnd);

    // 2) now point the button at its panel (button sits before liEnd, so its indices are unchanged)
    const btnStart = html.lastIndexOf('<button', qEnd);
    const btnTagEnd = html.indexOf('>', btnStart);
    const btnTag = html.slice(btnStart, btnTagEnd);
    if (!btnTag.includes('aria-controls')) {
      const patched = btnTag.replace('aria-expanded="false"', `aria-expanded="false" aria-controls="${panelId}"`);
      html = html.slice(0, btnStart) + patched + html.slice(btnTagEnd);
    }
    injected += 1;
  }
  // renumber panel ids in document order (injection runs backwards, so ids would else descend)
  const docOrder = [...html.matchAll(/id="faq-panel-(\d+)"/g)].map((m) => m[1]);
  const map = new Map(docOrder.map((oldId, i) => [oldId, String(i + 1)]));
  html = html.replace(/faq-panel-(\d+)/g, (whole, oldId) => (map.has(oldId) ? `faq-panel-${map.get(oldId)}` : whole));

  writeFileSync(path, html);
}

console.log(`injected ${injected} FAQ panel(s) across ${files.length} page(s)`);
