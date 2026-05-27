'use client';

import { motion } from 'framer-motion';
import { ease } from '@/lib/animations';

const CARDS = [
  {
    eyebrow: 'INFORMATICA + TPSIT',
    title: 'Il software come sistema',
    body: 'AutoCAD non è uno strumento di disegno: è un applicativo con una logica precisa, fatto di entità, attributi, file, formati. Lo stesso modo di pensare che impariamo in laboratorio.',
    bg: '#0a0a0a',
    fg: '#fafaf7',
    accent: '#f59e0b',
  },
  {
    eyebrow: 'SISTEMI E RETI',
    title: 'I dati di uno studio',
    body: 'In studio ho visto in concreto la differenza fra un archivio organizzato e uno disordinato: cartelle, naming, backup, accessi. È Sistemi e Reti applicato al lavoro vero.',
    bg: '#3b82f6',
    fg: '#fafaf7',
    accent: '#fafaf7',
  },
  {
    eyebrow: 'GPOI',
    title: 'Il ciclo della commessa',
    body: 'Ogni pratica ha un ciclo: incarico, sopralluogo, rilievo, disegno, deposito, archiviazione. La logica di project management che studiamo, applicata.',
    bg: '#f59e0b',
    fg: '#0a0a0a',
    accent: '#0a0a0a',
  },
] as const;

export default function Verticali() {
  return (
    <section
      data-slide
      id="verticali"
      className="relative min-h-screen w-full bg-cream py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono-eyebrow mb-6"
        >
          §04 · TRE VERTICALI TECNICHE
        </motion.p>

        <h2
          className="font-sans font-black tracking-tightest leading-[0.92] text-ink mb-16 max-w-5xl"
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
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: ease.spring }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: ease.out } }}
              style={{ background: c.bg, color: c.fg }}
              className="p-8 md:p-10 flex flex-col h-full min-h-[420px] md:min-h-[480px]"
              data-cursor="hover"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono-eyebrow" style={{ color: c.accent, opacity: 0.85 }}>
                  {c.eyebrow}
                </span>
                <span className="font-mono text-[11px] tracking-widest-mono opacity-50">
                  {String(i + 1).padStart(2, '0')} / 03
                </span>
              </div>

              <h3
                className="font-sans font-bold tracking-tighter leading-[0.95] mb-auto"
                style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}
              >
                {c.title}
              </h3>

              <p className="text-[14px] md:text-[15px] leading-relaxed opacity-85 mt-12">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
