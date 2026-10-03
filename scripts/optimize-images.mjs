// Turns the source art in `assets/` into the cropped, compressed images the site uses.
// Run with `npm run images` after changing anything in `assets/`; outputs are committed.
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'assets';
const OUT = 'src/assets/img';
const PUBLIC = 'public';

const GUARDIAN = `${SRC}/Vaelgrim_ O Guardião das Trevas.png`;
const PAINTED = `${SRC}/Vaelgrim_ Heróis do Destino.png`;
const PIXEL = `${SRC}/Vaelgrim_ Lenda dos Cinco Heróis.png`;
const EMBLEM = `${SRC}/Emblema Sombrio de Vaelgrim.png`;
const BANNER = `${SRC}/DC.png`;

/** Pixel-art crops of each hero from the pixel key art (left, top, width, height). */
const PIXEL_HEROES = {
  barbarian: [95, 420, 340, 400],
  priestess: [415, 400, 230, 420],
  archer: [585, 470, 300, 350],
  sorceress: [880, 460, 240, 360],
  paladin: [1110, 510, 260, 320],
};

const jobs = [
  // Hero: drop the baked-in captions at the bottom, keep the logo.
  sharp(GUARDIAN)
    .extract({ left: 0, top: 0, width: 1536, height: 845 })
    .webp({ quality: 80 })
    .toFile(`${OUT}/hero-guardian.webp`),
  // The five heroes, painted: no logo, no captions.
  sharp(PAINTED)
    .extract({ left: 0, top: 300, width: 1536, height: 535 })
    .webp({ quality: 80 })
    .toFile(`${OUT}/heroes-painted.webp`),
  // The five heroes, pixel art, same band.
  sharp(PIXEL)
    .extract({ left: 0, top: 380, width: 1536, height: 450 })
    .webp({ quality: 85 })
    .toFile(`${OUT}/heroes-pixel.webp`),
  // The pixel key art's castle side, used behind the world section.
  sharp(PIXEL)
    .extract({ left: 880, top: 130, width: 656, height: 520 })
    .webp({ quality: 82 })
    .toFile(`${OUT}/world-castle.webp`),
  // The dark side of the guardian art, used behind the endgame section.
  sharp(GUARDIAN)
    .extract({ left: 700, top: 380, width: 836, height: 460 })
    .webp({ quality: 80 })
    .toFile(`${OUT}/endgame-horde.webp`),
  sharp(BANNER).webp({ quality: 82 }).toFile(`${OUT}/logo-banner.webp`),
  sharp(EMBLEM).resize(640).webp({ quality: 82 }).toFile(`${OUT}/emblem.webp`),
  sharp(EMBLEM).resize(96).webp({ quality: 85 }).toFile(`${OUT}/emblem-small.webp`),
  // Static files that need fixed URLs (favicons, social preview).
  sharp(EMBLEM).resize(64).png().toFile(`${PUBLIC}/favicon.png`),
  sharp(EMBLEM).resize(180).png().toFile(`${PUBLIC}/apple-touch-icon.png`),
  sharp(GUARDIAN)
    .extract({ left: 0, top: 0, width: 1536, height: 806 })
    .resize(1200, 630)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${PUBLIC}/og-image.jpg`),
  ...Object.entries(PIXEL_HEROES).map(([id, [left, top, width, height]]) =>
    sharp(PIXEL)
      .extract({ left, top, width, height })
      .webp({ quality: 88 })
      .toFile(`${OUT}/hero-${id}.webp`),
  ),
];

await mkdir(OUT, { recursive: true });
const results = await Promise.all(jobs);
const total = results.reduce((sum, r) => sum + r.size, 0);
console.log(`${results.length} images written, ${(total / 1024).toFixed(0)} KB in total`);
