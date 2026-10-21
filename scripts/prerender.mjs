// Injects the server-rendered app into both language pages so crawlers and
// social previews get the full content without running JavaScript. Runs after:
//   vite build
//   vite build --ssr src/entry-server.tsx --outDir .ssr
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const SSR_DIR = '.ssr';
const ROOT_MARKER = '<div id="root"></div>';

const files = await readdir(SSR_DIR);
const entry = files.find((file) => /^entry-server\.(m?js)$/.test(file));
if (!entry) {
  throw new Error(`prerender: no entry-server.js found in ${SSR_DIR}/ (run the SSR build first).`);
}

const { render } = await import(pathToFileURL(resolve(SSR_DIR, entry)).href);

const pages = [
  // `/es/index.html` is one level down, so its assets are `../assets/...`.
  { file: 'dist/index.html', lang: 'en', assetPrefix: './' },
  { file: 'dist/es/index.html', lang: 'es', assetPrefix: '../' },
];

for (const page of pages) {
  const html = await readFile(page.file, 'utf8');
  if (!html.includes(ROOT_MARKER)) {
    throw new Error(`prerender: ${page.file} has no empty #root to fill.`);
  }

  const markup = render(page.lang);
  // The SSR build resolves imported assets to `/assets/...` while the client
  // build uses `base: './'`. Make each page's markup relative to its own folder
  // so hydration finds the same URLs and the zip also works in a subfolder.
  const relativeMarkup = markup.replace(/(["'\s])\/assets\//g, `$1${page.assetPrefix}assets/`);

  await writeFile(page.file, html.replace(ROOT_MARKER, `<div id="root">${relativeMarkup}</div>`));
  console.log(`==> Prerendered ${page.lang} (${markup.length.toLocaleString('en-US')} chars) into ${page.file}`);
}

await rm(SSR_DIR, { recursive: true, force: true });
