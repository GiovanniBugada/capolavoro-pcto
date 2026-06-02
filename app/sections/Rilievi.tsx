'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const TopoMap = dynamic(() => import('@/components/3d/TopoMap'), { ssr: false });

const STEPS = [
  { n: '01', title: 'Sopralluogo', desc: 'Individuazione dei punti significativi: spigoli, soglie, dislivelli, riferimenti fissi.' },
  { n: '02', title: 'Misurazione', desc: 'Rilevamento con sonde da terra, cordella metrica e livella. Ogni distanza viene presa due volte.' },
  { n: '03', title: 'Presa dati', desc: 'Registrazione ordinata in campagna: schizzo a mano, numerazione punti, note sulle anomalie.' },
  { n: '04', title: 'Restituzione', desc: 'Trasferimento delle misure in CAD. Quello che era un foglio sporco diventa un disegno scalato.' },
];

const TOOLS = [
  { k: 'Sonde da terra', v: 'Aste graduate per misurare distanze e quote rispetto a un punto fisso.' },
  { k: 'Cordella metrica', v: 'Metro lungo per le distanze sopra i 5 m; più affidabile del metro a stecca per esterni.' },
  { k: 'Picchetti', v: 'Riferimenti temporanei sul terreno. Definiscono la rete dei punti di rilievo.' },
  { k: 'Livella', v: 'Per verificare quote e ortogonalità. Niente disegno tecnico senza orizzontale e verticale veri.' },
  { k: 'Schizzo + numerazione', v: 'Sul campo si disegna a mano. È la mappa che lega le misure ai punti reali.' },
];

export default function Rilievi() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="light"
      id="rilievi"
      className="relative w-full bg-cream2 py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-3 mb-8"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-violet">§03</span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">Rilievi sul campo</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
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
                Misurare
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
                className="block"
              >
                il <em className="font-serif italic font-normal text-violet">territorio</em>.
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-ink/85 text-[16px] md:text-[17px] leading-relaxed mb-6 max-w-md"
            >
              Il rilievo è dove il disegno smette di essere un&apos;astrazione. Un edificio vero, un
              terreno vero — da tradurre in numeri prima del CAD.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="border-l-2 border-violet pl-4 max-w-md text-ink text-[15px] md:text-[16px] leading-snug font-serif italic mb-8"
            >
              È qui che la matematica del biennio è tornata utile in modi che non avevo previsto.
            </motion.p>

            <div className="border-t border-line">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: ease.out }}
                  className="flex items-baseline gap-6 py-5 border-b border-line"
                >
                  <span className="font-mono text-violet text-[11px] tracking-widest-mono shrink-0">
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-sans font-bold text-ink text-[18px] md:text-[20px] tracking-tightish">
                      {s.title}
                    </h4>
                    <p className="text-muted text-[13px] mt-1 leading-snug">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: ease.out }}
            className="lg:col-span-7 aspect-[7/6] w-full bg-cream relative border border-line"
          >
            <TopoMap />
          </motion.div>
        </div>

        {/* tools used in the field */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: ease.out }}
          className="mt-14 pt-10 border-t border-line"
        >
          <div className="mb-8">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">
              La cassetta
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {TOOLS.map((t, i) => (
              <motion.div
                key={t.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: ease.out }}
                className="border-t border-ink/20 pt-4"
              >
                <h4 className="font-sans font-bold text-ink tracking-tightish text-[16px] mb-1.5">
                  {t.k}
                </h4>
                <p className="text-muted text-[12.5px] leading-snug">{t.v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
