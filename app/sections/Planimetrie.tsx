'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ease } from '@/lib/animations';

const FloorPlanDraw = dynamic(() => import('@/components/3d/FloorPlanDraw'), { ssr: false });

const BULLETS = [
  'Redazione di planimetrie di unità immobiliari',
  'Vestizione del disegno: quote, simbologie, retini',
  'Predisposizione delle tavole per la stampa',
  'Archiviazione digitale ordinata per commessa',
  'Conoscenza del flusso di una pratica catastale',
];

export default function Planimetrie() {
  return (
    <section
      data-slide
      id="planimetrie"
      className="relative min-h-screen w-full bg-cream py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: ease.out }}
          className="lg:col-span-7 aspect-[10/7] w-full bg-cream2 border border-line p-4 md:p-8"
        >
          <FloorPlanDraw />
        </motion.div>

        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-eyebrow text-amber mb-6"
          >
            §03 · COMPETENZE TECNICHE / PLANIMETRIE
          </motion.p>

          <h2
            className="font-sans font-black tracking-tightest leading-[0.92] text-ink mb-10"
            style={{ fontSize: 'clamp(2rem, 5vw, 5.2rem)' }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: ease.out }}
                className="inline-block"
              >
                Disegnare
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
                la <em className="font-serif italic font-normal text-amber">pratica</em>.
              </motion.span>
            </span>
          </h2>

          <ul className="space-y-4">
            {BULLETS.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: ease.out }}
                className="flex items-start gap-4 text-ink text-[15px] md:text-[16px] leading-snug"
              >
                <span className="font-mono text-amber text-[12px] tracking-widest-mono pt-1.5 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
