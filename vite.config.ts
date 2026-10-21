import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

const REQUIRED = ['VITE_GAME_URL', 'VITE_SITE_URL'];

/** `https://vaelgrim.com/` -> `https://vaelgrim.com`, rejecting relative values. */
function normalizeSiteUrl(raw: string): string {
  const url = raw.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(url)) {
    throw new Error(`VITE_SITE_URL must be an absolute http(s) URL, got "${raw}".`);
  }
  return url;
}

/**
 * Emits robots.txt and a bilingual sitemap (with hreflang alternates) from
 * VITE_SITE_URL, so the domain lives in one place.
 */
function seoFiles(siteUrl: string): Plugin {
  let isSsrBuild = false;
  return {
    name: 'vaelgrim-seo-files',
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        // Use the normalized URL (no trailing slash) even if .env has one.
        return html.replaceAll('%VITE_SITE_URL%', siteUrl);
      },
    },
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    generateBundle() {
      if (isSsrBuild) return;
      const lastmod = new Date().toISOString().slice(0, 10);
      const alternates = [
        `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/"/>`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es/"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>`,
      ];
      const urls = [
        { loc: `${siteUrl}/`, priority: '1.0' },
        { loc: `${siteUrl}/es/`, priority: '0.9' },
      ].flatMap((page) => [
        '  <url>',
        `    <loc>${page.loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${page.priority}</priority>`,
        ...alternates,
        '  </url>',
      ]);

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...urls,
          '</urlset>',
          '',
        ].join('\n'),
      });
    },
  };
}

// `base: './'` keeps every asset URL relative, so `dist/` works from any folder
// of a static host (Hostinger public_html, a subfolder, or opened from disk).
export default defineConfig(({ command, mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd());

  if (command === 'build') {
    // A build without these would ship a broken canonical, sitemap and og:image.
    const missing = REQUIRED.filter((key) => !env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing ${missing.join(', ')}: copy .env.example to .env and fill it in.`);
    }
  }

  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL ?? 'https://vaelgrim.com');

  return {
    base: './',
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    build: {
      assetsInlineLimit: 0,
      // The SSR build only needs entry-server.js; don't copy the public/ files.
      copyPublicDir: !isSsrBuild,
      // The client build has two HTML entries: `/` and `/es/`. The SSR build
      // is invoked separately with `--ssr src/entry-server.tsx`.
      rollupOptions: isSsrBuild
        ? undefined
        : {
            input: {
              main: resolve(process.cwd(), 'index.html'),
              es: resolve(process.cwd(), 'es/index.html'),
            },
          },
    },
  };
});
