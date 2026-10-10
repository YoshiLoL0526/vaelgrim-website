// Every visible string of the site, in English (the game's language) and Spanish.
// Game names (classes, zones, bosses, stations) stay in English in both.

export type Lang = 'en' | 'es';
export type HeroId = 'paladin' | 'barbarian' | 'archer' | 'sorceress' | 'priestess';
export type PillarIcon = 'sword' | 'chest' | 'skull' | 'hourglass';

export interface Hero {
  id: HeroId;
  name: string;
  role: string;
  blurb: string;
  traits: [string, string, string];
}

export interface Act {
  numeral: string;
  region: string;
  theme: string;
  boss: string;
  zones: string[];
}

export interface Copy {
  nav: { heroes: string; world: string; loot: string; endgame: string; follow: string; discord: string };
  langLabel: string;
  hero: { kicker: string; tagline: string[]; lead: string; play: string; trailer: string; discord: string };
  pillars: { icon: PillarIcon; title: string; text: string }[];
  about: {
    kicker: string;
    title: string;
    body: string[];
    stats: { value: string; label: string }[];
  };
  heroes: {
    kicker: string;
    title: string;
    lead: string;
    partyTitle: string;
    partyHint: string;
    emptySlot: string;
    full: string;
    synergyTitle: string;
    synergy: (party: HeroId[]) => string;
    list: Hero[];
  };
  world: {
    kicker: string;
    title: string;
    lead: string;
    act: string;
    boss: string;
    sideTitle: string;
    side: { name: string; text: string }[];
    acts: Act[];
  };
  loot: {
    kicker: string;
    title: string;
    lead: string;
    rarities: { id: Rarity; name: string; text: string }[];
    stationsTitle: string;
    stations: { name: string; text: string }[];
  };
  endgame: {
    kicker: string;
    title: string;
    lead: string;
    modes: { name: string; tag: string; text: string }[];
  };
  art: { kicker: string; title: string; text: string; painted: string; combat: string };
  cta: { title: string; text: string; play: string; note: string; discord: string; contact: string };
  footer: { tagline: string; rights: string; original: string; disclaimer: string; top: string; discord: string };
}

export type Rarity = 'normal' | 'magic' | 'rare' | 'set' | 'unique' | 'legendary';

const ZONES = {
  act1: ['Mirewood Edge', 'Gravewind Hills', 'Ruined Abbey', 'Hall of Thorns'],
  act2: ['Dustwind Flats', 'Bleached Canyon', 'Sunken Necropolis', 'Halls of the Horned King'],
  act3: ['Choking Thicket', 'Sunless Marsh', 'Thornveil Ruins', 'The Drowned Oculus'],
  act4: ['Ashscar Approach', 'Blackspire Bastion', 'Brimstone Span', 'Gates of Ruin'],
};

const has = (party: HeroId[], id: HeroId) => party.includes(id);

const en: Copy = {
  nav: { heroes: 'Heroes', world: 'World', loot: 'Loot', endgame: 'Endgame', follow: 'Follow on X', discord: 'Discord' },
  langLabel: 'Español',
  hero: {
    kicker: 'Web3 dark fantasy idle RPG',
    tagline: ['Five heroes.', 'One fate.', 'Your own legend.'],
    lead: 'Your party fights on its own, wave after wave, act after act. You make the calls that matter: who goes, what they learn, what they wear and where they farm.',
    play: 'Follow us on X',
    trailer: 'Discover the game',
    discord: 'Join the Discord',
  },
  pillars: [
    { icon: 'sword', title: 'Build your heroes', text: 'Skills, talents and gear for every hero.' },
    { icon: 'chest', title: 'Earn epic loot', text: 'Every drop can change a build.' },
    { icon: 'skull', title: 'Defeat the forces of evil', text: 'Undead, beasts and demons.' },
    { icon: 'hourglass', title: 'Never stop advancing', text: 'Combat runs while you plan.' },
  ],
  about: {
    kicker: 'The pitch',
    title: 'You don’t swing the sword. You design the party.',
    body: [
      'Vaelgrim is a Web3 game: a side-view idle RPG in pixel art. Three heroes push through a grim world, facing waves of undead, orcs and demons. Combat is automatic; the depth is in the decisions.',
      'Choose three of five classes, shape each one with skills and a talent tree, socket gems, enchant your gear and pick where to farm next. Loot is the heart of the game.',
    ],
    stats: [
      { value: '5', label: 'Heroes' },
      { value: '3', label: 'In your party' },
      { value: '4', label: 'Acts' },
      { value: '60', label: 'Max level' },
    ],
  },
  heroes: {
    kicker: 'Choose your party',
    title: 'Five heroes, three slots',
    lead: 'Your account has all five heroes, but only three march at a time. Experience is shared, so every pick is a trade-off. Try a line-up:',
    partyTitle: 'Your party',
    partyHint: 'Pick three heroes',
    emptySlot: 'Empty',
    full: 'Party full — remove a hero first',
    synergyTitle: 'How they fight',
    synergy: (p) => {
      if (p.length < 3) return 'Add heroes to see how your party plays.';
      const lines: string[] = [];
      if (has(p, 'priestess')) lines.push('The Priestess keeps everyone standing with heals and shields.');
      else lines.push('No healer: you will lean on life steal, armor and killing fast.');
      if (has(p, 'paladin')) lines.push('The Paladin’s aura lifts the whole party.');
      if (has(p, 'barbarian')) lines.push('The Barbarian wades into the pack and hits everything at once.');
      if (has(p, 'archer') && has(p, 'sorceress')) lines.push('Archer and Sorceress melt waves from the back line.');
      else if (has(p, 'archer')) lines.push('The Archer picks off targets from range.');
      else if (has(p, 'sorceress')) lines.push('The Sorceress controls the field with fire, frost and lightning.');
      const front = (['paladin', 'barbarian'] as HeroId[]).filter((id) => has(p, id)).length;
      if (front === 0) lines.push('Nobody holds the front line: a risky, fast glass-cannon party.');
      return lines.join(' ');
    },
    list: [
      {
        id: 'paladin',
        name: 'Paladin',
        role: 'Aura · Melee',
        blurb: 'A holy warrior whose aura empowers or shields the whole party.',
        traits: ['Aura of Valor', 'Shield Slam', 'Divine Verdict'],
      },
      {
        id: 'barbarian',
        name: 'Barbarian',
        role: 'Melee · Area',
        blurb: 'Raw strength. Heavy weapons that cleave through entire waves.',
        traits: ['Cleave', 'Rallying Roar', 'Earthsplitter'],
      },
      {
        id: 'archer',
        name: 'Archer',
        role: 'Ranged',
        blurb: 'Patient and precise. Arrows, volleys and traps from the back line.',
        traits: ['Multishot', 'Snare Trap', 'Arrow Storm'],
      },
      {
        id: 'sorceress',
        name: 'Sorceress',
        role: 'Elemental magic',
        blurb: 'Master of fire, frost and lightning. Controls the battlefield.',
        traits: ['Ember Burst', 'Rime Spear', 'Arc Lightning'],
      },
      {
        id: 'priestess',
        name: 'Priestess',
        role: 'Healing · Defense',
        blurb: 'Light in the dark. Heals, wards and burns the unholy with radiant light.',
        traits: ['Mend', 'Blessed Ward', 'Radiant Lance'],
      },
    ],
  },
  world: {
    kicker: 'The world',
    title: 'Four acts of darkness',
    lead: 'Each act is a region with its own bestiary, ten zones and a named boss waiting at the end. Clear a zone to open the next.',
    act: 'Act',
    boss: 'Boss',
    sideTitle: 'Off the main road',
    side: [
      { name: 'Lairs', text: 'Elite packs and a guardian with a richer chest.' },
      { name: 'Depths', text: 'Long, deep runs where waves keep getting tougher.' },
      { name: 'Hunting Grounds', text: 'Dense hordes, fast kills, steady experience.' },
    ],
    acts: [
      {
        numeral: 'I',
        region: 'The Blighted Vale',
        theme: 'Rotting forests, haunted hills and a fallen abbey.',
        boss: 'Vessara, the Pale Matron',
        zones: ZONES.act1,
      },
      {
        numeral: 'II',
        region: 'The Sundered Dunes',
        theme: 'Wind-scoured deserts, warcamps and sealed tombs.',
        boss: 'Gharox, the Horned Tyrant',
        zones: ZONES.act2,
      },
      {
        numeral: 'III',
        region: 'The Withered Canopy',
        theme: 'Choking jungle, bloody marshes and drowned ruins.',
        boss: 'Vaelrith, the Hollow Warlock',
        zones: ZONES.act3,
      },
      {
        numeral: 'IV',
        region: 'The Ashen Gate',
        theme: 'Burning wastes and the throne of a fallen king.',
        boss: 'Mortivane, the Oathbroken King',
        zones: ZONES.act4,
      },
    ],
  },
  loot: {
    kicker: 'Loot',
    title: 'Every drop can change a build',
    lead: 'Affixes roll within ranges, so no two items are alike. Uniques can reshape your skills, and the rarest finds only fall at the edge of the world.',
    rarities: [
      { id: 'normal', name: 'Normal', text: 'Plain bases. Good for sockets.' },
      { id: 'magic', name: 'Magic', text: 'One or two affixes.' },
      { id: 'rare', name: 'Rare', text: 'Several random affixes.' },
      { id: 'set', name: 'Set', text: 'Bonuses grow with each piece.' },
      { id: 'unique', name: 'Unique', text: 'Fixed powers and skill modifiers.' },
      { id: 'legendary', name: 'Legendary', text: 'Endgame only. Five or six affixes.' },
    ],
    stationsTitle: 'Make it yours at camp',
    stations: [
      { name: 'Jeweler', text: 'Socket gems and combine them into higher grades.' },
      { name: 'Enchanter', text: 'Add an enchantment: pick one of three offers.' },
      { name: 'Transmuter', text: 'Fuse, rebase and add sockets to your gear.' },
      { name: 'Talents', text: 'A talent tree per class with linked paths.' },
    ],
  },
  endgame: {
    kicker: 'Endgame',
    title: 'Beyond the last act',
    lead: 'Hitting level 60 is where the hunt begins.',
    modes: [
      {
        name: 'The Breach',
        tag: 'Level 60',
        text: 'Open a Breach Stone to tear into a zone packed with elites. Its final guardian guards the only Legendary drops.',
      },
      {
        name: 'The Endless Descent',
        tag: 'Daily · Ranked',
        text: 'One attempt a day. Floor after floor the monsters grow stronger and every ten floors an act boss returns. How deep can you go?',
      },
      {
        name: 'PvP Arena',
        tag: '3 vs 3',
        text: 'Pit your party against another player’s. Same rules, different builds — the better design wins.',
      },
    ],
  },
  art: {
    kicker: 'Pixel art',
    title: 'A dark world, pixel by pixel',
    text: 'Side-view battles with animated sprites, and every spell, hit and aura drawn by code.',
    painted: 'Key art',
    combat: 'Real in-game combat',
  },
  cta: {
    title: 'Your legend starts now',
    text: 'Vaelgrim is on its way: free to play, right in your browser. Join the Discord and follow us on X for news, previews and the launch date.',
    play: 'Follow @playvaelgrim',
    note: 'Coming soon to your browser',
    discord: 'Join the Discord',
    contact: 'Contact',
  },
  footer: {
    tagline: 'A dark fantasy Web3 idle RPG.',
    rights: 'All rights reserved.',
    original: 'An original game: its world, heroes and names are its own.',
    disclaimer:
      'Inspired by Diablo II. Vaelgrim is an independent project, not affiliated with, endorsed by or sponsored by Blizzard Entertainment.',
    top: 'Back to top',
    discord: 'Discord',
  },
};

const es: Copy = {
  nav: { heroes: 'Héroes', world: 'Mundo', loot: 'Botín', endgame: 'Endgame', follow: 'Síguenos en X', discord: 'Discord' },
  langLabel: 'English',
  hero: {
    kicker: 'RPG idle Web3 de fantasía oscura',
    tagline: ['5 héroes.', 'Un mismo destino.', 'Tu propia leyenda.'],
    lead: 'Tu grupo pelea solo, oleada tras oleada, acto tras acto. Tú tomas las decisiones que importan: quién va, qué aprende, qué equipo lleva y dónde farmea.',
    play: 'Síguenos en X',
    trailer: 'Descubre el juego',
    discord: 'Únete al Discord',
  },
  pillars: [
    { icon: 'sword', title: 'Mejora tus héroes', text: 'Habilidades, talentos y equipo para cada uno.' },
    { icon: 'chest', title: 'Consigue botín épico', text: 'Cada drop puede cambiar una build.' },
    { icon: 'skull', title: 'Derrota a las fuerzas del mal', text: 'No muertos, bestias y demonios.' },
    { icon: 'hourglass', title: 'Avanza sin parar', text: 'El combate sigue mientras planeas.' },
  ],
  about: {
    kicker: 'La idea',
    title: 'Tú no blandes la espada. Tú diseñas al grupo.',
    body: [
      'Vaelgrim es un juego Web3: un RPG idle de vista lateral en pixel art. Tres héroes se abren paso por un mundo sombrío entre oleadas de muertos vivientes, orcos y demonios. El combate es automático; la profundidad está en las decisiones.',
      'Elige tres de cinco clases, dales forma con habilidades y un árbol de talentos, engarza gemas, encanta el equipo y decide dónde farmear después. El botín es el corazón del juego.',
    ],
    stats: [
      { value: '5', label: 'Héroes' },
      { value: '3', label: 'En tu grupo' },
      { value: '4', label: 'Actos' },
      { value: '60', label: 'Nivel máximo' },
    ],
  },
  heroes: {
    kicker: 'Elige tu grupo',
    title: 'Cinco héroes, tres plazas',
    lead: 'Tu cuenta tiene a los cinco, pero solo marchan tres a la vez. La experiencia se reparte, así que cada elección cuenta. Prueba una formación:',
    partyTitle: 'Tu grupo',
    partyHint: 'Elige tres héroes',
    emptySlot: 'Vacío',
    full: 'Grupo completo: quita a un héroe antes',
    synergyTitle: 'Cómo pelean',
    synergy: (p) => {
      if (p.length < 3) return 'Añade héroes para ver cómo juega tu grupo.';
      const lines: string[] = [];
      if (has(p, 'priestess')) lines.push('La Priestess mantiene a todos en pie con curas y escudos.');
      else lines.push('Sin sanadora: dependerás del robo de vida, la armadura y matar rápido.');
      if (has(p, 'paladin')) lines.push('El aura del Paladin potencia a todo el grupo.');
      if (has(p, 'barbarian')) lines.push('El Barbarian se mete en la manada y golpea a todos a la vez.');
      if (has(p, 'archer') && has(p, 'sorceress')) lines.push('Archer y Sorceress deshacen oleadas desde la retaguardia.');
      else if (has(p, 'archer')) lines.push('El Archer elimina objetivos a distancia.');
      else if (has(p, 'sorceress')) lines.push('La Sorceress controla el campo con fuego, hielo y rayo.');
      const front = (['paladin', 'barbarian'] as HeroId[]).filter((id) => has(p, id)).length;
      if (front === 0) lines.push('Nadie aguanta la primera línea: un grupo rápido y frágil, de alto riesgo.');
      return lines.join(' ');
    },
    list: [
      {
        id: 'paladin',
        name: 'Paladin',
        role: 'Aura · Cuerpo a cuerpo',
        blurb: 'Guerrero sagrado cuya aura potencia o protege a todo el grupo.',
        traits: ['Aura of Valor', 'Shield Slam', 'Divine Verdict'],
      },
      {
        id: 'barbarian',
        name: 'Barbarian',
        role: 'Cuerpo a cuerpo · Área',
        blurb: 'Fuerza bruta. Armas pesadas que parten oleadas enteras.',
        traits: ['Cleave', 'Rallying Roar', 'Earthsplitter'],
      },
      {
        id: 'archer',
        name: 'Archer',
        role: 'Distancia',
        blurb: 'Paciencia y precisión. Flechas, ráfagas y trampas desde atrás.',
        traits: ['Multishot', 'Snare Trap', 'Arrow Storm'],
      },
      {
        id: 'sorceress',
        name: 'Sorceress',
        role: 'Magia elemental',
        blurb: 'Domina el fuego, el hielo y el rayo. Controla el campo de batalla.',
        traits: ['Ember Burst', 'Rime Spear', 'Arc Lightning'],
      },
      {
        id: 'priestess',
        name: 'Priestess',
        role: 'Curación · Defensa',
        blurb: 'Luz en la oscuridad. Cura, protege y quema a los impíos con luz radiante.',
        traits: ['Mend', 'Blessed Ward', 'Radiant Lance'],
      },
    ],
  },
  world: {
    kicker: 'El mundo',
    title: 'Cuatro actos de oscuridad',
    lead: 'Cada acto es una región con su propio bestiario, diez zonas y un jefe con nombre esperando al final. Supera una zona para abrir la siguiente.',
    act: 'Acto',
    boss: 'Jefe',
    sideTitle: 'Fuera del camino principal',
    side: [
      { name: 'Lairs', text: 'Manadas de élite y un guardián con un cofre más rico.' },
      { name: 'Depths', text: 'Recorridos largos donde cada oleada es más dura.' },
      { name: 'Hunting Grounds', text: 'Hordas densas, muertes rápidas y experiencia constante.' },
    ],
    acts: [
      {
        numeral: 'I',
        region: 'The Blighted Vale',
        theme: 'Bosques podridos, colinas embrujadas y una abadía caída.',
        boss: 'Vessara, the Pale Matron',
        zones: ZONES.act1,
      },
      {
        numeral: 'II',
        region: 'The Sundered Dunes',
        theme: 'Desiertos azotados por el viento, campamentos de guerra y tumbas selladas.',
        boss: 'Gharox, the Horned Tyrant',
        zones: ZONES.act2,
      },
      {
        numeral: 'III',
        region: 'The Withered Canopy',
        theme: 'Selva asfixiante, pantanos de sangre y ruinas sumergidas.',
        boss: 'Vaelrith, the Hollow Warlock',
        zones: ZONES.act3,
      },
      {
        numeral: 'IV',
        region: 'The Ashen Gate',
        theme: 'Páramos en llamas y el trono de un rey caído.',
        boss: 'Mortivane, the Oathbroken King',
        zones: ZONES.act4,
      },
    ],
  },
  loot: {
    kicker: 'Botín',
    title: 'Cada drop puede cambiar una build',
    lead: 'Los afijos salen dentro de rangos, así que no hay dos objetos iguales. Los únicos pueden transformar tus habilidades, y los hallazgos más raros solo caen en el borde del mundo.',
    rarities: [
      { id: 'normal', name: 'Normal', text: 'Bases simples. Buenas para engarces.' },
      { id: 'magic', name: 'Magic', text: 'Uno o dos afijos.' },
      { id: 'rare', name: 'Rare', text: 'Varios afijos al azar.' },
      { id: 'set', name: 'Set', text: 'Bonos que crecen con cada pieza.' },
      { id: 'unique', name: 'Unique', text: 'Poderes fijos y modificadores de habilidad.' },
      { id: 'legendary', name: 'Legendary', text: 'Solo en el endgame. Cinco o seis afijos.' },
    ],
    stationsTitle: 'Hazlo tuyo en el campamento',
    stations: [
      { name: 'Jeweler', text: 'Engarza gemas y combínalas en grados superiores.' },
      { name: 'Enchanter', text: 'Añade un encantamiento: elige una de tres ofertas.' },
      { name: 'Transmuter', text: 'Fusiona, cambia la base y añade engarces al equipo.' },
      { name: 'Talents', text: 'Un árbol de talentos por clase, con caminos enlazados.' },
    ],
  },
  endgame: {
    kicker: 'Endgame',
    title: 'Más allá del último acto',
    lead: 'Llegar al nivel 60 es donde empieza la cacería.',
    modes: [
      {
        name: 'The Breach',
        tag: 'Nivel 60',
        text: 'Abre una Breach Stone y entra en una zona llena de élites. Su guardián final es el único que suelta objetos Legendary.',
      },
      {
        name: 'The Endless Descent',
        tag: 'Diaria · Ranking',
        text: 'Un intento al día. Piso a piso los monstruos se hacen más fuertes y cada diez pisos vuelve un jefe de acto. ¿Hasta dónde llegarás?',
      },
      {
        name: 'PvP Arena',
        tag: '3 contra 3',
        text: 'Enfrenta tu grupo al de otro jugador. Mismas reglas, builds distintas: gana el mejor diseño.',
      },
    ],
  },
  art: {
    kicker: 'Pixel art',
    title: 'Un mundo oscuro, píxel a píxel',
    text: 'Combates de vista lateral con sprites animados, y cada hechizo, golpe y aura dibujado por código.',
    painted: 'Arte promocional',
    combat: 'Combate real del juego',
  },
  cta: {
    title: 'Tu leyenda empieza ahora',
    text: 'Vaelgrim está en camino: gratis y directo en el navegador. Únete al Discord y síguenos en X para enterarte de novedades, adelantos y la fecha de lanzamiento.',
    play: 'Seguir a @playvaelgrim',
    note: 'Muy pronto en tu navegador',
    discord: 'Únete al Discord',
    contact: 'Contacto',
  },
  footer: {
    tagline: 'Un RPG idle Web3 de fantasía oscura.',
    rights: 'Todos los derechos reservados.',
    original: 'Un juego original: su mundo, sus héroes y sus nombres son propios.',
    disclaimer:
      'Inspirado en Diablo II. Vaelgrim es un proyecto independiente, sin afiliación, respaldo ni patrocinio de Blizzard Entertainment.',
    top: 'Volver arriba',
    discord: 'Discord',
  },
};

export const COPY: Record<Lang, Copy> = { en, es };
