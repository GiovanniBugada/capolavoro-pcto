'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const CARDS = [
  {
    eyebrow: 'INFORMATICA + TPSIT',
    title: 'Il software come sistema',
    body: 'AutoCAD non è uno strumento di disegno: è un applicativo con una logica precisa, fatto di entità, attributi, file, formati. Lo stesso modo di pensare che impariamo in laboratorio.',
    bg: '#0a0a0a',
    fg: '#fafaf7',
    accent: '#f59e0b',
    num: '01',
  },
  {
    eyebrow: 'SISTEMI E RETI',
    title: 'I dati di uno studio',
    body: 'In studio ho visto in concreto la differenza fra un archivio organizzato e uno disordinato: cartelle, naming, backup, accessi. È Sistemi e Reti applicato al lavoro vero.',
    bg: '#3b82f6',
    fg: '#fafaf7',
    accent: '#fafaf7',
    num: '02',
  },
  {
    eyebrow: 'GPOI',
    title: 'Il ciclo della commessa',
    body: 'Ogni pratica ha un ciclo: incarico, sopralluogo, rilievo, disegno, deposito, archiviazione. La logica di project management che studiamo, applicata.',
    bg: '#f59e0b',
    fg: '#0a0a0a',
    accent: '#0a0a0a',
    num: '03',
  },
] as const;

export default function Verticali() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const wmY = useTransform(scrollYProgress, [0, 1], ['8%', '-22%']);
  const wmScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="light"
      id="verticali"
      className="relative w-full bg-cream py-14 md:py-20 px-6 md:px-12 overflow-hidden"
    >
      <motion.span
        aria-hidden
        style={{ fontSize: 'clamp(18rem, 42vw, 46rem)', opacity: 0.022, bottom: '-10%', left: '-6%', letterSpacing: '-0.06em', y: wmY, scale: wmScale }}
        className="absolute pointer-events-none select-none font-sans font-black leading-none text-ink will-change-transform"
      >
        07
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-6 mb-10"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber">
            §04 · TRE VERTICALI
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-line" />
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">
            COLONNE TECNICHE
          </span>
        </motion.div>

        <h2
          className="font-sans font-black tracking-tightest leading-[0.92] text-ink mb-10 max-w-5xl"
          style={{ fontSize: 'clamp(2rem, 5.4vw, 5.6rem)' }}
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: ease.out }}
              className="inline-block"
            >
              Tre <em className="font-serif italic font-normal text-amber">colonne</em>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: ease.out }}
              className="inline-block"
            >
              su cui appoggiare la prova.
            </motion.span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.eyebrow}
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: ease.spring }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: ease.out } }}
              style={{ background: c.bg, color: c.fg }}
              className="relative p-7 md:p-9 flex flex-col h-full min-h-[440px] overflow-hidden"
              data-cursor="hover"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono uppercase tracking-widest-mono text-[10px]" style={{ color: c.accent, opacity: 0.85 }}>
                  {c.eyebrow}
                </span>
                <span className="font-mono uppercase tracking-widest-mono text-[10px] opacity-50">
                  {c.num} / 03
                </span>
              </div>

              <h3
                className="font-sans font-bold tracking-tightest leading-[0.95] mb-auto"
                style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)' }}
              >
                {c.title}
              </h3>

              <p className="text-[13px] md:text-[14px] leading-relaxed opacity-85 mt-10">{c.body}</p>

              <span
                className="absolute -bottom-10 -right-4 font-sans font-black leading-none select-none pointer-events-none opacity-[0.08]"
                style={{ fontSize: 'clamp(8rem, 16vw, 14rem)', color: c.fg }}
                aria-hidden
              >
                {c.num}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
