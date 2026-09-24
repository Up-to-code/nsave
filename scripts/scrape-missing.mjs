// One-off: scrape the remaining linked nsave.com routes and split them into
// components/exact/<slug>-{header,main,footer}.html (same shape as existing pages:
// header/footer = full tag, main = inner content of <main>).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const htmlDir = join(root, 'scraped', 'html');
const exactDir = join(root, 'components', 'exact');

const PAGES = [
  ['get-the-app', 'get-the-app'],
  ['calculator-usd-bdt', 'calculator/usd-bdt'],
  ['calculator-usd-egp', 'calculator/usd-egp'],
  ['calculator-usd-pkr', 'calculator/usd-pkr'],
  ['calculator-usd-try', 'calculator/usd-try'],
  ['calculator-usd-mad', 'calculator/usd-mad'],
  ['calculator-usd-ngn', 'calculator/usd-ngn'],
  ['terms-cookie', 'terms/cookie'],
  ['en-bd', 'en-bd'],
  ['en-pk', 'en-pk'],
  ['en-eg', 'en-eg'],
  ['ar', 'ar'],
];

const grab = (html, tag) => {
  const open = html.indexOf(`<${tag}`);
  if (open === -1) return null;
  const openEnd = html.indexOf('>', open);
  const close = html.indexOf(`</${tag}>`, openEnd);
  if (openEnd === -1 || close === -1) return null;
  return { full: html.slice(open, close + tag.length + 3), inner: html.slice(openEnd + 1, close) };
};

for (const [slug, path] of PAGES) {
  const dest = join(htmlDir, `${slug}.html`);
  if (!existsSync(dest)) {
    const url = `https://www.nsave.com/${path}`;
    console.log(`fetch ${url}`);
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      console.error(`  !! HTTP ${res.status} for ${url}, skipping`);
      continue;
    }
    writeFileSync(dest, await res.text());
  } else {
    console.log(`reuse ${slug}.html`);
  }
  const html = readFileSync(dest, 'utf8');
  const header = grab(html, 'header');
  const main = grab(html, 'main');
  const footer = grab(html, 'footer');
  if (!header || !main || !footer) {
    console.error(`  !! split failed for ${slug} (header=${!!header} main=${!!main} footer=${!!footer})`);
    continue;
  }
  writeFileSync(join(exactDir, `${slug}-header.html`), header.full);
  writeFileSync(join(exactDir, `${slug}-main.html`), main.inner);
  writeFileSync(join(exactDir, `${slug}-footer.html`), footer.full);
  console.log(`  ok ${slug}: header=${header.full.length} main=${main.inner.length} footer=${footer.full.length}`);
}
console.log('done');
