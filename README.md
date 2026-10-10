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

1. Con el `.env` listo, ejecuta `bash scripts/package-hostinger.sh` (en Windows, desde Git Bash):
   compila el sitio y genera `vaelgrim-hostinger.zip` en la raíz del proyecto, con el contenido
   de `dist/` en la raíz del zip (incluido el `.htaccess` oculto). Acepta otra ruta como
   argumento: `bash scripts/package-hostinger.sh otro-nombre.zip`.
2. Sube el zip a `public_html/` con el Administrador de archivos (o FTP) y extrae el contenido ahí.

También puedes hacerlo a mano: `npm run build` y comprimir **el contenido** de `dist/` (incluido
el `.htaccess` oculto) en un zip.

Todas las rutas son relativas (`base: './'`), así que también funciona dentro de una subcarpeta.

## Contenido

Los textos están en `src/content.ts`, en inglés y español (el idioma se elige por el navegador y
se cambia con el botón EN/ES). Los nombres del juego (clases, zonas, jefes) se dejan en inglés.
La fuente Silkscreen es la misma del juego (licencia OFL, `src/assets/fonts/OFL.txt`).
