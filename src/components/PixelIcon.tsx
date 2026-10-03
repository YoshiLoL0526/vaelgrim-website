// 12×12 pixel icons drawn by code, in the spirit of the game's own effects.
// `X` = outline (currentColor), `o` = fill (lighter), `d` = shade (darker), `.` = empty.

const ICONS = {
  sword: [
    '..........XX',
    '.........XoX',
    '........XoX.',
    '.......XoX..',
    '......XoX...',
    '.X...XoX....',
    '..X.XoX.....',
    '...XXX......',
    '...dXX......',
    '..dX..X.....',
    '.dX.........',
    'dd..........',
  ],
  chest: [
    '............',
    '..XXXXXXXX..',
    '.XooooooooX.',
    '.XoXXXXXXoX.',
    'XXXXXXXXXXXX',
    'XooooXXooooX',
    'XooooXoXoooX',
    'XooooXXooooX',
    'XooooooooooX',
    'XddddddddddX',
    'XXXXXXXXXXXX',
  ],
  skull: [
    '...XXXXXX...',
    '..XooooooX..',
    '.XooooooooX.',
    '.XooooooooX.',
    '.XoXXooXXoX.',
    '.XoXXooXXoX.',
    '.XooooooooX.',
    '..XXooXooXX.',
    '...XoXoXoX..',
    '...XXXXXXX..',
  ],
  hourglass: [
    '.XXXXXXXXXX.',
    '..XooooooX..',
    '..XooooooX..',
    '...XooooX...',
    '....XooX....',
    '.....XX.....',
    '.....XX.....',
    '....X..X....',
    '...X.oo.X...',
    '..X.oooo.X..',
    '..XooooooX..',
    '.XXXXXXXXXX.',
  ],
  shield: [
    '.XXXXXXXXXX.',
    '.XoooXXoooX.',
    '.XoooXXoooX.',
    '.XXXXXXXXXX.',
    '.XoooXXoooX.',
    '.XoooXXoooX.',
    '..XooXXooX..',
    '..XooXXooX..',
    '...XoXXoX...',
    '....XXXX....',
    '.....XX.....',
  ],
  axe: [
    '....XXX.....',
    '..XXooXX....',
    '.XoooXdX....',
    'XooooXdX....',
    'XooooXdX....',
    '.XoooXdX....',
    '..XXooXd....',
    '....XXXd....',
    '......dX....',
    '......dX....',
    '......dX....',
    '......XX....',
  ],
  bow: [
    '...XXo......',
    '..Xd..o.....',
    '.Xd....o....',
    '.Xd.....o...',
    'Xd......o.X.',
    'XXXXXXXXXXXX',
    'Xd......o.X.',
    '.Xd.....o...',
    '.Xd....o....',
    '..Xd..o.....',
    '...XXo......',
  ],
  flame: [
    '.....X......',
    '....XoX.....',
    '....XoX..X..',
    '...XooX.XoX.',
    '..XoooXXooX.',
    '..XooooooX..',
    '.XoooXXoooX.',
    '.XooXooXooX.',
    '.XooXooXooX.',
    '..XooooooX..',
    '...XXXXXX...',
  ],
  radiance: [
    '.....XX.....',
    '.....oo.....',
    '..X..XX..X..',
    '...XXooXX...',
    '...XooooX...',
    'XoXooooooXoX',
    'XoXooooooXoX',
    '...XooooX...',
    '...XXooXX...',
    '..X..XX..X..',
    '.....oo.....',
    '.....XX.....',
  ],
  gem: [
    '............',
    '..XXXXXXXX..',
    '.XooXooXooX.',
    'XXXXXXXXXXXX',
    '.XooXooXooX.',
    '..XoXooXoX..',
    '...XoXXoX...',
    '....XooX....',
    '.....XX.....',
  ],
  sparkle: [
    '.....X......',
    '.....X......',
    '....XoX.....',
    'XXXXoooXXXX.',
    '....XoX.....',
    '.....X....X.',
    '.....X...XoX',
    '..........X.',
    '..X.........',
    '.XoX........',
    '..X.........',
  ],
  cauldron: [
    '..o..o..o...',
    '...o..o..o..',
    '............',
    '.XXXXXXXXXX.',
    'XooooooooooX',
    'XoooddooooX.',
    '.XooooooooX.',
    '.XooooooddX.',
    '..XooooooX..',
    '...XXXXXX...',
    '..X......X..',
  ],
  tree: [
    '.....XX.....',
    '.....XX.....',
    '....X..X....',
    '...X....X...',
    '..XX....XX..',
    '..XX....XX..',
    '..X.X..X.X..',
    '.X...XX...X.',
    'XX...XX...XX',
    'XX...XX...XX',
  ],
  portal: [
    '....XXXX....',
    '..XXooooXX..',
    '.XooddddooX.',
    '.Xodd..ddoX.',
    'Xod......doX',
    'Xod......doX',
    'Xod......doX',
    '.Xodd..ddoX.',
    '.XooddddooX.',
    '..XXooooXX..',
    '....XXXX....',
  ],
  stairs: [
    'XXXX........',
    'XooX........',
    'XddXXXX.....',
    'XooooooX....',
    'XddddddXXX..',
    'XoooooooooX.',
    'XddddddddddX',
    'XooooooooooX',
    'XXXXXXXXXXXX',
  ],
  swords: [
    'X..........X',
    '.X........X.',
    '..X......X..',
    '...X....X...',
    '....X..X....',
    '.....XX.....',
    '.....XX.....',
    '....X..X....',
    '.dXX....XXd.',
    '..d......d..',
    '.d........d.',
  ],
} as const;

export type IconName = keyof typeof ICONS;

const OPACITY = { X: 1, o: 0.45, d: 0.22 } as const;

export function PixelIcon({ name, className = '' }: { name: IconName; className?: string }) {
  const rows = ICONS[name];
  const top = Math.floor((12 - rows.length) / 2);
  const pixels: { x: number; y: number; c: 'X' | 'o' | 'd' }[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === 'X' || c === 'o' || c === 'd') pixels.push({ x, y: y + top, c });
    });
  });
  return (
    <svg
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      {pixels.map(({ x, y, c }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" opacity={OPACITY[c]} />
      ))}
    </svg>
  );
}
