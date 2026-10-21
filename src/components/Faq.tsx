import { useLang } from '../i18n.tsx';
import { Section, SectionHeading } from './ui.tsx';

export function Faq() {
  const { t } = useLang();
  return (
    <Section id="faq" className="grain bg-bg">
      <SectionHeading kicker={t.faq.kicker} title={t.faq.title} lead={t.faq.lead} />
      <div className="mx-auto max-w-3xl border-y border-edge">
        {t.faq.items.map((item) => (
          <details key={item.q} className="group border-b border-edge last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold text-ink transition-colors hover:text-gold-hi [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center border border-edge-hi text-xl leading-none text-gold transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-5 text-ink/75">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
