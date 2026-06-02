'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const FloorPlanDraw = dynamic(() => import('@/components/3d/FloorPlanDraw'), { ssr: false });

const BULLETS = [
  'Redazione di planimetrie di unità immobiliari',
  'Vestizione del disegno: quote, simbologie, retini',
  'Predisposizione delle tavole per la stampa',
  'Archiviazione digitale ordinata per commessa',
  'Conoscenza del flusso di una pratica catastale',
];

const FLOW = [
  { n: '01', title: 'Incarico', desc: 'Il cliente chiede un aggiornamento o un nuovo accatastamento. Si raccolgono i documenti.' },
  { n: '02', title: 'Sopralluogo', desc: 'Si verifica lo stato di fatto e si confronta con la mappa catastale esistente.' },
  { n: '03', title: 'Disegno CAD', desc: 'In AutoCAD si ridisegna la pianta sulla base catastale, con scala e nord coerenti.' },
  { n: '04', title: 'Vestizione', desc: 'Quote, simboli sanitari/porte/finestre, retini, etichette dei vani: tutto secondo standard.' },
  { n: '05', title: 'Controllo', desc: 'Verifica somma superfici, coerenza fra piante e mappali, conformità grafica.' },
  { n: '06', title: 'Deposito DOCFA/PREGEO', desc: 'Invio telematico all&apos;Agenzia delle Entrate. La pratica diventa pubblica e protocollata.' },
];

export default function Planimetrie() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="light"
      id="planimetrie"
      className="relative w-full bg-cream py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-3 mb-8"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§03</span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">Planimetrie catastali</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: ease.out }}
            className="lg:col-span-7 aspect-[10/7] w-full bg-cream2 border border-line p-4 md:p-6 relative"
          >
            <FloorPlanDraw />
          </motion.div>

          <div className="lg:col-span-5">
            <h2
              className="font-sans font-black tracking-tightest leading-[0.92] text-ink mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4.2vw, 4.2rem)' }}
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
                la <em className="font-serif italic font-normal text-amber">pratica</em>.
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-ink/85 text-[16px] md:text-[17px] leading-relaxed mb-6 max-w-md"
            >
              Non un disegno qualunque: un{' '}
              <em className="font-serif italic text-amber">documento pubblico</em>. Entra
              nell&apos;Agenzia delle Entrate, cambia rendita, tasse, valore.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="border-l-2 border-amber pl-4 max-w-md text-ink text-[14px] md:text-[15px] leading-snug font-serif italic mb-6"
            >
              Ogni segno conta. Lo standard non è un dettaglio, è la sostanza.
            </motion.p>

            <ul className="space-y-3">
              {BULLETS.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: ease.out }}
                  className="flex items-start gap-4 text-ink text-[14.5px] leading-snug border-b border-line/60 pb-3"
                >
                  <span className="font-mono text-amber text-[11px] tracking-widest-mono pt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* the catastale flow — 6 steps */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="mt-14 pt-10 border-t border-line"
        >
          <div className="mb-8">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">
              Sei passi, un ciclo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FLOW.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: ease.out }}
                className="relative border border-line bg-cream2 p-5 hover:border-amber/40 transition-colors"
              >
                <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber">
                  {f.n}
                </span>
                <h4 className="font-sans font-bold text-ink tracking-tightish text-[17px] md:text-[18px] mt-1.5 mb-2">
                  {f.title}
                </h4>
                <p className="text-muted text-[13px] leading-snug">{f.desc}</p>
                {i < FLOW.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-amber/60 text-lg font-mono"
                  >
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
