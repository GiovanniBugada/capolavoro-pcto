'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ease } from '@/lib/animations';

const TopoMap = dynamic(() => import('@/components/3d/TopoMap'), { ssr: false });

const STEPS = [
  { n: '01', title: 'Sopralluogo', desc: 'Individuazione punti significativi.' },
  { n: '02', title: 'Misurazione', desc: 'Rilevamento con sonde da terra.' },
  { n: '03', title: 'Presa dati', desc: 'Registrazione ordinata in campagna.' },
  { n: '04', title: 'Restituzione', desc: 'Trasferimento dei dati in CAD.' },
];

export default function Rilievi() {
  return (
    <section
      data-slide
      id="rilievi"
      className="relative min-h-screen w-full bg-cream2 py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-eyebrow text-violet mb-6"
          >
            §03 · COMPETENZE TECNICHE / RILIEVI
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
                Misurare
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
                il <em className="font-serif italic font-normal text-violet">territorio</em>.
              </motion.span>
            </span>
          </h2>

          <div className="border-t border-line">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: ease.out }}
                className="flex items-baseline gap-6 py-5 border-b border-line"
              >
                <span className="font-mono text-violet text-[11px] tracking-widest-mono shrink-0">{s.n}</span>
                <div className="flex-1">
                  <h4 className="font-sans font-bold text-ink text-[18px] md:text-[20px] tracking-tightish">
                    {s.title}
                  </h4>
                  <p className="text-muted text-[13px] md:text-[14px] mt-1 leading-snug">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: ease.out }}
          className="lg:col-span-7 aspect-[7/6] w-full"
        >
          <TopoMap className="" />
        </motion.div>
      </div>
    </section>
  );
}
