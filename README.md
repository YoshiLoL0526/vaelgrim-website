# Vaelgrim — sitio web

Página de presentación del juego (React + TypeScript + Vite + Tailwind CSS v4). Se compila a
HTML/CSS/JS estáticos: no necesita Node en el servidor.

## Comandos

- `npm run dev`: servidor de desarrollo.
- `npm run build`: comprueba tipos y genera `dist/`.
- `npm run preview`: sirve `dist/` en local para revisarlo.
- `npm run images`: regenera las imágenes recortadas y comprimidas (`src/assets/img/`, favicon y
  `public/og-image.jpg`) a partir del arte original de `assets/`.

## Configuración (`.env`)

El `.env` no se versiona: copia `.env.example` a `.env` y rellénalo antes de compilar. Si falta
alguna variable, `npm run build` se detiene con un aviso en lugar de generar enlaces rotos.

- `VITE_GAME_URL`: a dónde llevan los botones «Play now».
- `VITE_SITE_URL`: URL absoluta del sitio, para la imagen al compartir en redes (`og:image`).

Son valores públicos que se incrustan al compilar: cámbialos y vuelve a ejecutar `npm run build`.

## Subir a Hostinger

1. Con el `.env` listo, `npm run build`.
2. Comprime **el contenido** de `dist/` (incluido el `.htaccess` oculto) en un zip, súbelo a
   `public_html/` con el Administrador de archivos y extráelo ahí (o súbelo por FTP).

Todas las rutas son relativas (`base: './'`), así que también funciona dentro de una subcarpeta.

## Contenido

Los textos están en `src/content.ts`, en inglés y español (el idioma se elige por el navegador y
se cambia con el botón EN/ES). Los nombres del juego (clases, zonas, jefes) se dejan en inglés.
La fuente Silkscreen es la misma del juego (licencia OFL, `src/assets/fonts/OFL.txt`).
