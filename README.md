# Vaelgrim — sitio web

[![Deploy](https://github.com/YoshiLoL0526/vaelgrim-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/YoshiLoL0526/vaelgrim-website/actions/workflows/deploy.yml)
[![Licencia del código: MIT](https://img.shields.io/badge/c%C3%B3digo-MIT-blue.svg)](LICENSE)

Página de presentación del juego [Vaelgrim](https://vaelgrim.com) (React + TypeScript + Vite +
Tailwind CSS v4). Se compila a HTML/CSS/JS estáticos: no necesita Node en el servidor.

## Requisitos

- Node.js 20.19+ o 22.12+ (lo exige Vite 8) y npm.

## Inicio rápido

```bash
npm ci
cp .env.example .env   # y rellena los valores
npm run dev
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/` | Componentes React, textos (`content.ts`), i18n y estilos. |
| `src/assets/` | Imágenes optimizadas, vídeo y fuente del juego. |
| `assets/` | Arte original a resolución completa (fuente de `npm run images`). |
| `public/` | Ficheros copiados tal cual: `.htaccess`, `404.html`, favicon, imagen OG. |
| `index.html`, `es/index.html` | Metadatos SEO de cada idioma. |
| `scripts/` | Optimización de imágenes, prerenderizado y empaquetado para Hostinger. |

## Comandos

- `npm run dev`: servidor de desarrollo.
- `npm run build`: comprueba tipos, genera `dist/` y **prerenderiza** las dos versiones
  (`dist/index.html` en inglés y `dist/es/index.html` en español) para que los buscadores vean
  el contenido sin ejecutar JavaScript.
- `npm run preview`: sirve `dist/` en local para revisarlo.
- `npm run images`: regenera las imágenes recortadas y comprimidas (`src/assets/img/`, favicon,
  `public/og-image.jpg` y las variantes responsive del hero y del arte promocional) a partir del
  arte original de `assets/`.

## Configuración (`.env`)

El `.env` no se versiona: copia `.env.example` a `.env` y rellénalo antes de compilar. Si falta
alguna variable, `npm run build` se detiene con un aviso en lugar de generar enlaces rotos.

- `VITE_GAME_URL`: a dónde llevan los botones «Play now».
- `VITE_SITE_URL`: URL absoluta del sitio. Se usa para el canonical, los `hreflang`, `og:image`,
  `robots.txt` y `sitemap.xml`. Cámbiala y vuelve a compilar si algún día cambias de dominio.

Son valores públicos que se incrustan al compilar.

## Despliegue automático en Hostinger

Cada push a `main` (o una ejecución manual desde la pestaña *Actions*) lanza
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): instala dependencias, compila y
prerenderiza el sitio y sincroniza `dist/` con el servidor por **FTPS**. Solo sube lo que cambió y
borra del servidor lo que ya no existe en `dist/` (guarda su estado en
`.ftp-deploy-sync-state.json`, en el propio servidor).

Configuración, una sola vez, en *Settings → Environments → `production`* del repositorio:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| Secret | `FTP_SERVER` | Host FTP de Hostinger (p. ej. `ftp.vaelgrim.com` o la IP del panel). |
| Secret | `FTP_USERNAME` | Usuario de la cuenta FTP. |
| Secret | `FTP_PASSWORD` | Contraseña de la cuenta FTP. |
| Variable (opcional) | `FTP_SERVER_DIR` | Carpeta remota; por defecto `./` (la cuenta FTP ya entra en `public_html`). |
| Variable (opcional) | `VITE_GAME_URL`, `VITE_SITE_URL` | Sobrescriben los valores por defecto del build. |

Las credenciales FTP solo viven como *secrets* de GitHub: nunca en el código ni en `.env`.
Conviene crear en Hostinger una cuenta FTP dedicada a este despliegue, limitada a la carpeta del
sitio.

## Subir a Hostinger a mano (alternativa)

1. Con el `.env` listo, ejecuta `bash scripts/package-hostinger.sh` (en Windows, desde Git Bash):
   compila el sitio y genera `vaelgrim-hostinger.zip` en la raíz del proyecto, con el contenido
   de `dist/` en la raíz del zip (incluidos `.htaccess` y `404.html`). Acepta otra ruta como
   argumento: `bash scripts/package-hostinger.sh otro-nombre.zip`.
2. Sube el zip a `public_html/` con el Administrador de archivos (o FTP) y extrae el contenido ahí.
   En Hostinger el sitio debe estar configurado como **sitio estático**, no como aplicación Node.
   Activa antes el SSL del dominio: el `.htaccess` redirige a `https://vaelgrim.com`.

También puedes hacerlo a mano: `npm run build` y comprimir **el contenido** de `dist/` (incluido
el `.htaccess` oculto) en un zip.

Las rutas de los assets son relativas (`base: './'`), así que el HTML también carga desde una
subcarpeta. El canonical, el `sitemap.xml` y las redirecciones del `.htaccess` asumen que el sitio
se publica en la raíz de `vaelgrim.com`.

## SEO incluido en el build

- Dos páginas prerenderizadas con todo el contenido y los encabezados (H1/H2), no una SPA vacía:
  `/` (inglés) y `/es/` (español).
- `title`, meta description, canonical, `hreflang` (`en`, `es`, `x-default`), Open Graph, Twitter
  Cards y `theme-color` propios de cada idioma.
- Datos estructurados JSON-LD (`WebSite`, `WebPage`, `Organization` y `VideoGame`).
- `robots.txt` y `sitemap.xml` generados automáticamente desde `VITE_SITE_URL`; el sitemap incluye
  las dos URLs y sus alternativas `xhtml:link`.
- Selector EN/ES con enlaces reales entre `/` y `/es/` (rastreables, compartibles y con
  `aria-current`), no un botón que cambia el texto sin cambiar la URL.
- `404.html` con `noindex` para no crear «soft 404».
- Imágenes con `width`/`height`, `loading="lazy"` y `srcset` responsive en el hero y el arte.
- `.htaccess` con redirección a HTTPS y sin `www`, compresión Brotli/DEFLATE, caché de un año
  para los assets con hash, `no-cache` para el HTML, cabeceras de seguridad y MIME correctos.
- Contenido bilingüe con una sección de preguntas frecuentes visible y rastreable.

### Después de desplegar

1. Comprueba que abren `https://vaelgrim.com/robots.txt`, `https://vaelgrim.com/sitemap.xml`,
   `https://vaelgrim.com/` y `https://vaelgrim.com/es/`.
2. Da de alta el dominio en [Google Search Console](https://search.google.com/search-console) y
   en [Bing Webmaster Tools](https://www.bing.com/webmasters), verifica la propiedad y envía
   `sitemap.xml`.
3. Pasa las dos versiones por [Rich Results Test](https://search.google.com/test/rich-results) y
   [PageSpeed Insights](https://pagespeed.web.dev/).
4. Revisa la vista previa social con el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/)
   o el depurador de Facebook/X después de cada cambio de `og-image.jpg`.
5. Si añades el token de verificación de Search Console, ponlo en `index.html` y `es/index.html`,
   y vuelve a compilar.

### Versiones de idioma

- `/` es la versión inglesa y `/es/` la española. Cada una tiene su propio `lang`, `title`,
  descripción, canonical, Open Graph y JSON-LD.
- Las dos se enlazan con `hreflang` (`en`, `es`, `x-default`) y el selector EN/ES usa rutas
  relativas, así que también funciona si algún día publicas el sitio en una subcarpeta.
- Los metadatos de cada página están en `index.html` y `es/index.html`; los textos visibles, en
  `src/content.ts`. Si cambias el título o la descripción de una versión, actualiza también el
  JSON-LD de su HTML.
- Para añadir otro idioma: crea `xx/index.html` con sus metadatos, añade la entrada en
  `vite.config.ts` (`rollupOptions.input`), en `scripts/prerender.mjs`, en el sitemap y en los
  `hreflang` de las dos páginas.

## Contenido

Los textos están en `src/content.ts`, en inglés y español. El idioma se elige por la URL
(`/` en inglés, `/es/` en español), no por el navegador, para que cada versión tenga una URL
indexable. Los nombres del juego (clases, zonas, jefes) se dejan en inglés.
La fuente Silkscreen es la misma del juego (licencia OFL, `src/assets/fonts/OFL.txt`).

## Seguridad

El sitio es estático y no maneja datos de usuarios. Las variables de `.env` son públicas (se
incrustan en el HTML), así que **no pongas nunca secretos en variables `VITE_*`**. Para reportar
una vulnerabilidad, consulta [SECURITY.md](SECURITY.md).

## Licencia

- **Código fuente**: [MIT](LICENSE).
- **Arte (creado con herramientas de IA), logotipos, textos promocionales y la marca
  «Vaelgrim»**: © Raidel Martínez Santos, todos los derechos reservados. No están cubiertos por la licencia MIT; consulta
  [LICENSE](LICENSE) para el detalle de qué ficheros quedan excluidos.
- **Sprites de personajes** (visibles en el vídeo de combate `src/assets/video/` y en
  `combat-poster.webp`): [Tiny RPG Character Asset Pack](https://zerie.itch.io/tiny-rpg-character-asset-pack)
  de [Zerie](https://zerie.itch.io/), usados bajo su licencia. No están cubiertos por la licencia
  MIT y no se pueden extraer ni redistribuir.
- La fuente Silkscreen se distribuye bajo la [SIL Open Font License](src/assets/fonts/OFL.txt).

Vaelgrim es un proyecto independiente, sin afiliación, respaldo ni patrocinio de Blizzard
Entertainment.
