'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const BuildingWireframe = dynamic(() => import('@/components/3d/BuildingWireframe'), { ssr: false });

const CHIPS = ['Layer', 'Scale', 'Quotature', 'Blocchi', 'Viewport', 'Export DWG/PDF'];

const LEARNED = [
  {
    k: 'Layer',
    v: 'Ogni elemento ha il suo livello: muri, quote, retini, simboli, mobili. Come le classi in informatica — separare per responsabilità rende il disegno leggibile e modificabile.',
  },
  {
    k: 'Scala',
    v: 'Il disegno è in scala reale 1:1, la stampa è in 1:50 o 1:100. La scelta della scala cambia leggibilità e densità informativa, non il contenuto.',
  },
  {
    k: 'Blocchi',
    v: 'Porte, finestre, sanitari salvati come blocchi riutilizzabili. Modifico il blocco una volta e si aggiorna ovunque — l’equivalente di una funzione nel codice.',
  },
  {
    k: 'Quotature',
    v: 'Misure associate alla geometria: se sposto un muro, la quota si aggiorna. Non testo statico ma una relazione fra elementi.',
  },
  {
    k: 'Viewport',
    v: 'Lo spazio modello è infinito e in scala reale; il foglio di stampa è uno o più “viewport” che ritagliano e applicano la scala finale.',
  },
  {
    k: 'Export DWG / PDF',
    v: 'Il DWG è il formato sorgente, modificabile. Il PDF è la fotografia finita. La distinzione vale qui come fra sorgente e build in informatica.',
  },
];

export default function AutoCAD() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="dark"
      id="autocad"
      className="relative w-full bg-ink text-cream py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 50%, rgba(245,158,11,0.08), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-3 mb-8"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§03</span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/60">AutoCAD</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <h2
              className="font-sans font-black tracking-tightest leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(1.9rem, 4.6vw, 4.6rem)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: ease.out }}
                className="block"
              >
                Disegnare
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
                className="block"
              >
                un <em className="font-serif italic font-normal text-amber">edificio</em>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: ease.out }}
                className="block"
              >
                è un <span className="text-amber">sistema</span>.
              </motion.span>
            </h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {CHIPS.map((c) => (
                <motion.span
                  key={c}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
                  }}
                  className="px-4 py-2 border border-cream/20 rounded-full font-mono text-[10px] tracking-widest-mono uppercase text-cream/90 hover:border-amber hover:text-amber transition-colors"
                  data-cursor="hover"
                >
                  {c}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-cream/85 text-[16px] md:text-[17px] leading-relaxed max-w-md mb-6"
            >
              In AutoCAD non si disegna un&apos;immagine. Si costruisce un{' '}
              <em className="font-serif italic text-amber">sistema di entità</em>: coordinate,
              attributi, livelli, relazioni.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="border-l-2 border-amber pl-4 max-w-md text-cream text-[15px] md:text-[16px] leading-snug font-serif italic"
            >
              Sembrava una nuova lingua. Era informatica sotto un altro nome.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: ease.out }}
            className="lg:col-span-7 relative aspect-square w-full"
          >
            <BuildingWireframe revealMs={4500} interactive />
          </motion.div>
        </div>

        {/* deep dive: what I actually learned, with informatica analogies */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="mt-14 pt-10 border-t border-cream/15"
        >
          <div className="mb-8">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/55">
              Sei concetti, sei analogie
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEARNED.map((l, i) => (
              <motion.div
                key={l.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: ease.out }}
                className="group border border-cream/10 bg-cream/[0.03] hover:border-amber/40 transition-colors p-5"
              >
                <h4 className="font-sans font-bold text-cream tracking-tightish text-[17px] md:text-[18px] mb-2 group-hover:text-amber transition-colors">
                  {l.k}
                </h4>
                <p className="text-cream/70 text-[13px] leading-snug">{l.v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mt-12 pt-6 border-t border-cream/15 flex flex-wrap items-baseline gap-x-6 gap-y-2"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber">CONCETTO</span>
          <span className="font-serif italic text-cream/95 text-[18px] md:text-[22px] max-w-4xl leading-snug">
            Lo stesso modo di pensare che impariamo in laboratorio di Informatica: definire entità,
            attributi, relazioni — non &quot;disegnare&quot;.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
