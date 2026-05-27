'use client';

import { motion } from 'framer-motion';
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

export default function Materie() {
  return (
    <section
      data-slide
      id="materie"
      className="relative min-h-screen w-full bg-ink text-cream py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono-eyebrow text-amber mb-6"
        >
          §04 · IL PONTE / TABELLA AGGANCI
        </motion.p>

        <h2
          className="font-sans font-black tracking-tightest leading-[0.92] mb-16 max-w-5xl"
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
              Ogni cosa
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
              si <em className="font-serif italic font-normal text-amber">aggancia</em> a qualcosa.
            </motion.span>
          </span>
        </h2>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-mono-eyebrow text-cream/50"
              >
                <th className="text-left py-4 border-b border-cream/15 w-[44%]">ATTIVITÀ DI STAGE</th>
                <th className="text-left py-4 border-b border-cream/15 w-[24%]">MATERIA 5° ANNO</th>
                <th className="text-left py-4 border-b border-cream/15">AGGANCIO</th>
              </motion.tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <motion.tr
                  key={r.m + i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: ease.out }}
                  className="group hover:bg-cream/[0.04] transition-colors"
                >
                  <td className="py-5 md:py-6 border-b border-cream/10 pr-6 text-cream/90 text-[14px] md:text-[15px] leading-snug">
                    {r.a}
                  </td>
                  <td className="py-5 md:py-6 border-b border-cream/10 pr-6">
                    <span className="inline-block px-3 py-1.5 bg-blue/15 border-b-2 border-amber text-cream text-[13px] font-medium tracking-tightish">
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
      </div>
    </section>
  );
}
