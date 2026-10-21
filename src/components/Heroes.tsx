import { useState } from 'react';
import archer from '../assets/img/hero-archer.webp';
import barbarian from '../assets/img/hero-barbarian.webp';
import paladin from '../assets/img/hero-paladin.webp';
import priestess from '../assets/img/hero-priestess.webp';
import sorceress from '../assets/img/hero-sorceress.webp';
import type { Hero, HeroId } from '../content.ts';
import { useLang } from '../i18n.tsx';
import { PixelIcon, type IconName } from './PixelIcon.tsx';
import { Section, SectionHeading } from './ui.tsx';

const ART: Record<HeroId, string> = { paladin, barbarian, archer, sorceress, priestess };
/** Intrinsic crop sizes, kept in sync with scripts/optimize-images.mjs. */
const ART_SIZE: Record<HeroId, [number, number]> = {
  paladin: [260, 320],
  barbarian: [340, 400],
  archer: [300, 350],
  sorceress: [240, 360],
  priestess: [230, 420],
};
const ICON: Record<HeroId, IconName> = {
  paladin: 'shield',
  barbarian: 'axe',
  archer: 'bow',
  sorceress: 'flame',
  priestess: 'radiance',
};
/** Class colors from the game's DPS meter. */
const COLOR: Record<HeroId, string> = {
  paladin: 'var(--color-paladin)',
  barbarian: 'var(--color-barbarian)',
  archer: 'var(--color-archer)',
  sorceress: 'var(--color-sorceress)',
  priestess: 'var(--color-priestess)',
};
const PARTY_SIZE = 3;

export function Heroes() {
  const { t } = useLang();
  const [party, setParty] = useState<HeroId[]>(['paladin', 'archer', 'priestess']);
  const [notice, setNotice] = useState(false);

  const toggle = (id: HeroId) => {
    if (party.includes(id)) {
      setParty(party.filter((p) => p !== id));
      setNotice(false);
    } else if (party.length < PARTY_SIZE) {
      setParty([...party, id]);
      setNotice(false);
    } else {
      setNotice(true);
    }
  };

  const byId = new Map(t.heroes.list.map((h) => [h.id, h]));

  return (
    <Section id="heroes" className="bg-void">
      <SectionHeading kicker={t.heroes.kicker} title={t.heroes.title} lead={t.heroes.lead} />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
        {t.heroes.list.map((hero) => (
          <li key={hero.id}>
            <HeroCard hero={hero} picked={party.includes(hero.id)} onToggle={() => toggle(hero.id)} />
          </li>
        ))}
      </ul>

      <div className="panel studs mt-10 grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
        <div>
          <p className="pixel-label mb-3 text-gold">
            {t.heroes.partyTitle}{' '}
            <span className="text-muted">
              {party.length}/{PARTY_SIZE}
            </span>
          </p>
          <ol className="flex gap-3">
            {Array.from({ length: PARTY_SIZE }, (_, i) => {
              const id = party[i];
              const hero = id ? byId.get(id) : undefined;
              return (
                <li
                  key={i}
                  className="grid size-20 place-items-center border bg-void text-center"
                  style={{ borderColor: id ? COLOR[id] : 'var(--color-edge)' }}
                >
                  {id && hero ? (
                    <span className="flex flex-col items-center gap-1" style={{ color: COLOR[id] }}>
                      <PixelIcon name={ICON[id]} className="size-8" />
                      <span className="pixel-label text-[0.55rem] tracking-normal">{hero.name}</span>
                    </span>
                  ) : (
                    <span className="pixel-label text-[0.55rem] text-muted/60">{t.heroes.emptySlot}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <div aria-live="polite">
          <p className="pixel-label mb-2 text-ember-hi">
            {notice ? t.heroes.full : party.length < PARTY_SIZE ? t.heroes.partyHint : t.heroes.synergyTitle}
          </p>
          <p className="text-ink/85">{t.heroes.synergy(party)}</p>
        </div>
      </div>
    </Section>
  );
}

function HeroCard({ hero, picked, onToggle }: { hero: Hero; picked: boolean; onToggle: () => void }) {
  const color = COLOR[hero.id];
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={picked}
      className={`group panel flex h-full w-full flex-col text-left transition duration-200 hover:-translate-y-1 ${
        picked ? '' : 'opacity-80 hover:opacity-100'
      }`}
      style={{
        borderColor: picked ? color : undefined,
        boxShadow: picked ? `0 0 0 1px ${color}, 0 0 28px -6px ${color}` : undefined,
      }}
    >
      <div className="relative h-40 overflow-hidden border-b border-edge bg-void sm:h-52">
        <img
          src={ART[hero.id]}
          alt={`${hero.name} — ${hero.role}`}
          width={ART_SIZE[hero.id][0]}
          height={ART_SIZE[hero.id][1]}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-panel to-transparent" />
        <span
          className="pixel-label absolute top-2 right-2 border bg-void/85 px-1.5 py-0.5 text-[0.55rem]"
          style={{ color, borderColor: color }}
        >
          {picked ? '✓' : '+'}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-center gap-2" style={{ color }}>
          <PixelIcon name={ICON[hero.id]} className="size-5 shrink-0" />
          <h3 className="font-display text-lg font-bold sm:text-xl">{hero.name}</h3>
        </div>
        <p className="pixel-label text-[0.58rem] tracking-[0.08em] text-muted">{hero.role}</p>
        <p className="text-[0.95rem] leading-snug text-ink/85">{hero.blurb}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {hero.traits.map((skill) => (
            <li key={skill} className="border border-edge bg-void/60 px-2 py-0.5 text-xs text-ink/70">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
