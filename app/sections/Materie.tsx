'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const ROWS = [
  {
    a: 'AutoCAD: software CAD, file DWG, automazione disegno',
    m: 'Informatica + TPSIT',
    bridge: 'Software applicativo come sistema di entità e attributi',
  },
  {
    a: 'Archiviazione digitale di pratiche e file di studio',
    m: 'Sistemi e Reti',
    bridge: 'Organizzazione, condivisione e sicurezza dei dati',
  },
  {
    a: 'Gestione commesse, scadenze, rapporto cliente',
    m: 'GPOI',
    bridge: 'Ciclo di vita della commessa: pianificazione → consegna',
  },
  {
    a: 'Rilievi e restituzione grafica',
    m: 'Matematica',
    bridge: 'Geometria, scale, proporzioni: la matematica nei rilievi',
  },
  {
    a: 'Documentazione tecnica e manuali software',
    m: 'Inglese',
    bridge: 'Lettura di documentazione tecnica in lingua',
  },
  {
    a: 'Relazioni, comunicazione con il cliente',
    m: 'Italiano',
    bridge: 'Scrittura chiara, sintetica, tecnica',
  },
];

// Three deeper reflections — the most rich connections, expanded
const DEEP_BRIDGES = [
  {
    eyebrow: 'INFORMATICA + TPSIT',
    title: 'Il software come sistema',
    body: 'AutoCAD non è uno strumento di disegno: è un applicativo con una logica precisa, fatto di entità, attributi, file, formati. Lo stesso modo di pensare che impariamo in laboratorio — definire dati, relazioni, comportamenti — applicato a un dominio diverso.',
    bg: '#0a0a0a',
    fg: '#fafaf7',
    accent: '#f59e0b',
    num: '01',
  },
  {
    eyebrow: 'SISTEMI E RETI',
    title: 'I dati di uno studio',
    body: 'In studio ho visto in concreto la differenza fra un archivio organizzato e uno disordinato: cartelle per commessa, naming consistente, backup, permessi di accesso. È Sistemi e Reti applicato al lavoro vero — dove un file perso significa una pratica che salta.',
    bg: '#3b82f6',
    fg: '#fafaf7',
    accent: '#fafaf7',
    num: '02',
  },
  {
    eyebrow: 'GPOI',
    title: 'Il ciclo della commessa',
    body: 'Ogni pratica ha un ciclo: incarico, sopralluogo, rilievo, disegno, deposito, archiviazione. La logica di project management che studiamo a scuola, applicata su scala umana — un cliente, una scadenza, una consegna.',
    bg: '#f59e0b',
    fg: '#0a0a0a',
    accent: '#0a0a0a',
    num: '03',
  },
] as const;

export default function Materie() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="dark"
      id="materie"
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
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§04</span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/60">
            <span className="hidden sm:inline">Il ponte — PCTO ↔ Materie del 5° anno</span>
            <span className="sm:hidden">Il ponte</span>
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
            Ogni cosa
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
            className="block"
          >
            si <em className="font-serif italic font-normal text-amber">aggancia</em> a qualcosa.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-cream/85 text-[16px] md:text-[17px] leading-relaxed max-w-2xl mb-10"
        >
          Nessuna attività allo studio era fuori dal programma. Cambiavano gli strumenti, non il
          pensiero. Ogni cosa torna a una materia precisa — in due livelli.
        </motion.p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/45"
              >
                <th className="text-left py-4 border-b border-cream/15 w-[44%] font-normal">
                  ATTIVITÀ DI STAGE
                </th>
                <th className="text-left py-4 border-b border-cream/15 w-[24%] font-normal">
                  MATERIA 5° ANNO
                </th>
                <th className="text-left py-4 border-b border-cream/15 font-normal">
                  AGGANCIO CONCETTUALE
                </th>
              </motion.tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <motion.tr
                  key={r.m + i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: ease.out }}
                  className="group hover:bg-cream/[0.04] transition-colors"
                >
                  <td className="py-5 md:py-6 border-b border-cream/10 pr-6 text-cream/90 text-[14px] md:text-[15px] leading-snug">
                    {r.a}
                  </td>
                  <td className="py-5 md:py-6 border-b border-cream/10 pr-6">
                    <span className="inline-block px-3 py-1.5 bg-blue/15 border-b-2 border-amber text-cream text-[12px] md:text-[13px] font-medium tracking-tightish">
                      {r.m}
                    </span>
                  </td>
                  <td className="py-5 md:py-6 border-b border-cream/10 text-cream/70 text-[13px] md:text-[14px] leading-snug">
                    <span className="inline-block w-2 h-2 bg-amber mr-3 align-middle" />
                    {r.bridge}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* the three deepest bridges — narrative cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="mt-14 pt-10 border-t border-cream/15"
        >
          <div className="mb-8">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/55">
              I tre ponti principali
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {DEEP_BRIDGES.map((c, i) => (
              <motion.div
                key={c.eyebrow}
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: ease.spring }}
                whileHover={{ y: -6, transition: { duration: 0.4, ease: ease.out } }}
                style={{ background: c.bg, color: c.fg }}
                className="relative p-6 md:p-7 flex flex-col h-full min-h-[260px] overflow-hidden"
                data-cursor="hover"
              >
                <div className="mb-6">
                  <span className="font-mono uppercase tracking-widest-mono text-[10px]" style={{ color: c.accent, opacity: 0.85 }}>
                    {c.eyebrow}
                  </span>
                </div>

                <h3
                  className="font-sans font-bold tracking-tightest leading-[0.95] mb-4"
                  style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
                >
                  {c.title}
                </h3>

                <p className="text-[13px] md:text-[14px] leading-relaxed opacity-85 mt-auto">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
