'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';
import { Sparkles, Users, MessageSquare, Clock, Puzzle } from 'lucide-react';
import Counter from '@/components/ui/Counter';

const HARD = [
  { label: 'AutoCAD', value: 75, note: 'Disegno autonomo di planimetrie standard.' },
  { label: 'Lettura mappe catastali', value: 65, note: 'Riconosco simboli, scale, riferimenti.' },
  { label: 'Rilievi sul campo', value: 55, note: 'Prendo misure con supervisione.' },
  { label: 'Gestione documentale', value: 80, note: 'Cartelle, naming, backup: solido.' },
  { label: 'Pratiche edilizie (cenni)', value: 45, note: 'CILA/SCIA: ne capisco il flusso.' },
];

const SOFT = [
  {
    icon: Sparkles,
    title: 'Adattabilità',
    desc: 'Lavorare su attività non previste, ripartire da zero su software che non avevo mai aperto.',
  },
  {
    icon: Users,
    title: 'Team eterogeneo',
    desc: 'Collaborare con figure non informatiche: geometri, architetti, clienti.',
  },
  {
    icon: MessageSquare,
    title: 'Rapporto cliente',
    desc: 'Capire chi non parla la mia lingua tecnica e tradurre il problema in qualcosa di concreto.',
  },
  {
    icon: Clock,
    title: 'Gestione tempo',
    desc: 'Scadenze vere, non scolastiche. Una pratica in ritardo costa al cliente, non a me.',
  },
  {
    icon: Puzzle,
    title: 'Problem solving',
    desc: 'Trovare soluzioni dove il manuale non basta — chiedere, provare, verificare.',
  },
];

function Bar({ label, value, note, idx }: { label: string; value: number; note: string; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <div ref={ref} className="group border-t border-cream/15 pt-4 pb-2">
      <div className="flex items-baseline justify-between mb-2.5">
        <span className="text-cream text-[14px] md:text-[15px] font-medium group-hover:text-amber transition-colors">
          {label}
        </span>
        <span className="font-mono text-amber text-[12px] tabular-nums">
          <Counter to={value} duration={1.4} suffix="%" />
        </span>
      </div>
      <div className="relative h-[2px] bg-cream/10 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: idx * 0.08, ease: ease.out }}
          style={{ width: `${value}%`, transformOrigin: 'left' }}
          className="relative h-full bg-amber overflow-hidden shimmer-overlay"
        />
      </div>
      <p className="text-cream/55 text-[12px] mt-2 leading-snug">{note}</p>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="dark"
      id="skills"
      className="relative w-full bg-ink text-cream py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-3 mb-8"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§05</span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/60">
            <span className="hidden sm:inline">Sintesi — cosa porto via</span>
            <span className="sm:hidden">Sintesi</span>
          </span>
        </motion.div>

        <h2
          className="font-sans font-black tracking-tightest leading-[0.92] mb-8 max-w-5xl"
          style={{ fontSize: 'clamp(1.9rem, 4.4vw, 4.4rem)' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: ease.out }}
            className="block"
          >
            Cosa <em className="font-serif italic font-normal text-amber">porto via</em>.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-cream/75 text-[15px] md:text-[16px] leading-relaxed max-w-2xl mb-10"
        >
          60 ore non bastano a diventare geometra. Bastano a fare una mappa onesta. Due livelli:
          <span className="text-cream"> hard skills misurabili</span> e
          <span className="text-cream"> soft skills che restano</span>.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="font-mono uppercase tracking-widest-mono text-[10px] mb-6 text-cream/70">
              HARD SKILLS · LIVELLO ATTUALE
            </p>
            <div>
              {HARD.map((h, i) => (
                <Bar key={h.label} label={h.label} value={h.value} note={h.note} idx={i} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="font-mono uppercase tracking-widest-mono text-[10px] mb-6 text-cream/70">
              SOFT SKILLS · CINQUE LEZIONI
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOFT.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: ease.out }}
                    whileHover={{ y: -4 }}
                    className="group bg-cream/[0.04] border border-cream/10 hover:border-amber/40 p-5 transition-colors"
                    data-cursor="hover"
                  >
                    <Icon className="w-5 h-5 text-amber mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    <h4 className="text-cream text-[15px] font-bold tracking-tightish mb-1.5">{s.title}</h4>
                    <p className="text-cream/65 text-[12.5px] leading-snug">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* closing — the lesson */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="mt-14 pt-10 border-t border-cream/15 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
        >
          <div className="md:col-span-3">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber">
              LA LEZIONE
            </span>
          </div>
          <div className="md:col-span-9">
            <p
              className="font-serif italic text-cream/90 leading-snug"
              style={{ fontSize: 'clamp(1.3rem, 2.4vw, 2rem)' }}
            >
              Il capolavoro non era diventare geometra. Era{' '}
              <span className="text-amber not-italic font-sans font-bold tracking-tightish">capire</span>{' '}
              che il pensiero informatico — entità, sistemi, flussi — funziona anche dove
              l&apos;informatica, almeno a prima vista, non c&apos;è.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
