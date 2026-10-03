import type { Rarity } from '../content.ts';
import { useLang } from '../i18n.tsx';
import { PixelIcon, type IconName } from './PixelIcon.tsx';
import { Section, SectionHeading } from './ui.tsx';

/** Rarity colors (D-012), same values as the game client. */
const RARITY_COLOR: Record<Rarity, string> = {
  normal: 'var(--color-normal)',
  magic: 'var(--color-magic)',
  rare: 'var(--color-rare)',
  set: 'var(--color-set)',
  unique: 'var(--color-unique)',
  legendary: 'var(--color-legendary)',
};
const STATION_ICON: IconName[] = ['gem', 'sparkle', 'cauldron', 'tree'];
const STATION_COLOR = ['var(--color-gem)', 'var(--color-enchant)', 'var(--color-unique)', 'var(--color-gold)'];

export function Loot() {
  const { t } = useLang();
  return (
    <Section id="loot" className="grain bg-void">
      <SectionHeading kicker={t.loot.kicker} title={t.loot.title} lead={t.loot.lead} />

      <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,22rem)]">
        <ol className="grid gap-3 sm:grid-cols-2">
          {t.loot.rarities.map((r, i) => {
            const color = RARITY_COLOR[r.id];
            return (
              <li
                key={r.id}
                className="panel flex items-center gap-4 border-l-4 p-4"
                style={{ borderLeftColor: color }}
              >
                <span
                  className="grid size-11 shrink-0 place-items-center border bg-void"
                  style={{ borderColor: color, color, boxShadow: `inset 0 0 14px -4px ${color}` }}
                >
                  <PixelIcon name={i < 4 ? 'sword' : i === 4 ? 'shield' : 'radiance'} className="size-6" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold" style={{ color }}>
                    {r.name}
                  </span>
                  <span className="block text-sm text-ink/70">{r.text}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <ItemTooltip />
      </div>

      <h3 className="pixel-label mt-20 mb-6 text-center text-gold">{t.loot.stationsTitle}</h3>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {t.loot.stations.map((s, i) => (
          <li key={s.name} className="panel p-6 text-center">
            <span
              className="mx-auto mb-4 grid size-14 place-items-center border bg-void"
              style={{ color: STATION_COLOR[i], borderColor: STATION_COLOR[i] }}
            >
              <PixelIcon name={STATION_ICON[i] ?? 'gem'} className="size-8" />
            </span>
            <p className="font-display text-lg font-bold text-ink">{s.name}</p>
            <p className="mt-2 text-sm text-ink/70">{s.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** A sample item card in the style of the in-game tooltip. Stats are illustrative. */
function ItemTooltip() {
  return (
    <figure
      className="relative mx-auto w-full max-w-sm border border-unique/60 bg-[#0b0910]/95 p-5 font-pixel text-[0.7rem] leading-relaxed shadow-[0_0_0_1px_#000,0_0_40px_-8px_rgb(232_145_58/45%)]"
      aria-label="Example item"
    >
      <div className="mb-3 flex items-center gap-3 border-b border-edge pb-3">
        <span className="grid size-12 place-items-center border border-unique/70 bg-void text-unique">
          <PixelIcon name="axe" className="size-8" />
        </span>
        <div>
          <p className="text-[0.8rem] text-unique">Gutripper</p>
          <p className="text-muted">Unique Bearded Axe</p>
        </div>
      </div>
      <p className="text-ink">Damage: 11–19</p>
      <p className="text-muted">Required level: 6</p>
      <div className="my-3 space-y-0.5 text-magic">
        <p>+32% Enhanced Damage</p>
        <p>+6 to Strength</p>
        <p>+4% Life Steal</p>
        <p className="text-unique">+1 to Cleave</p>
        <p className="text-unique">Cleave makes its targets bleed</p>
      </div>
      <p className="text-enchant">Enchant: +12% Attack Speed</p>
      <div className="mt-3 flex gap-1.5">
        <span className="size-4 rotate-45 border border-gem bg-gem/40" />
        <span className="size-4 rotate-45 border border-edge-hi bg-void" />
      </div>
    </figure>
  );
}
