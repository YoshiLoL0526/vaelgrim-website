# Política de seguridad

## Versiones soportadas

Solo se mantiene la versión publicada en <https://vaelgrim.com> (rama `main`).

## Cómo reportar una vulnerabilidad

**No abras un issue público.** Usa la opción privada de GitHub
[«Report a vulnerability»](https://github.com/YoshiLoL0526/vaelgrim-website/security/advisories/new)
o escribe a <contact@vaelgrim.com> con:

- Descripción del problema y su impacto.
- Pasos para reproducirlo (URL, navegador, cabeceras, etc.).

Intentaré responder en un plazo de 7 días.

## Alcance

Es un sitio estático sin backend, cuentas de usuario ni formularios. Entran en el alcance, por
ejemplo, XSS en las páginas generadas, configuración insegura del `.htaccess` o dependencias
vulnerables que acaben en el build. El juego (`play.vaelgrim.com`) no forma parte de este
repositorio.
