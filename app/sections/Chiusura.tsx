'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ease } from '@/lib/animations';

const StarsField = dynamic(() => import('@/components/3d/StarsField'), { ssr: false });

const LINE_1 = ["L'", 'informatica', 'mi', 'ha', 'dato', 'un', 'linguaggio.'];
const LINE_2 = ['Il', 'territorio', 'mi', 'ha', 'dato', 'qualcosa', 'da', 'dire.'];

function AnimatedWord({
  word,
  highlight,
  delay,
}: {
  word: string;
  highlight?: boolean;
  delay: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
      <motion.span
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay, ease: ease.out }}
        className={`inline-block ${highlight ? 'text-amber font-serif italic font-normal' : 'text-cream'}`}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function Chiusura() {
  return (
    <section
      data-slide
      id="chiusura"
      className="relative min-h-screen w-full bg-ink overflow-hidden"
    >
      <div className="absolute inset-0">
        <StarsField />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-ink/40 via-transparent to-ink" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="px-6 md:px-12 pt-24 md:pt-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-eyebrow text-amber"
          >
            CHIUSURA · UNA FRASE PER FINIRE
          </motion.p>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 md:px-12">
          <h2
            className="font-sans font-black tracking-tightest leading-[0.95] text-center max-w-6xl"
            style={{ fontSize: 'clamp(2rem, 5.6vw, 6rem)' }}
            aria-label="L'informatica mi ha dato un linguaggio. Il territorio mi ha dato qualcosa da dire."
          >
            <span className="block mb-6">
              {LINE_1.map((w, i) => (
                <AnimatedWord
                  key={i}
                  word={w}
                  highlight={w === 'informatica'}
                  delay={0.2 + i * 0.08}
                />
              ))}
            </span>
            <span className="block">
              {LINE_2.map((w, i) => (
                <AnimatedWord
                  key={i}
                  word={w}
                  highlight={w === 'territorio'}
                  delay={1.1 + i * 0.08}
                />
              ))}
            </span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="px-6 md:px-12 pb-12 md:pb-16 max-w-7xl mx-auto w-full"
        >
          <div className="h-px bg-cream/15 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="font-mono-eyebrow text-cream/50 mb-3">RINGRAZIAMENTI</p>
              <p className="text-cream/85 text-[15px] md:text-[17px] leading-relaxed max-w-2xl">
                Grazie al <span className="text-amber">Geom. Sergio Grassi</span> e a tutto lo Studio per
                avermi accolto e per avermi insegnato un mestiere che non era il mio.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <p className="font-mono-eyebrow text-cream/50 mb-3">CREDITI</p>
              <p className="text-cream/70 text-[13px] leading-relaxed">
                Giovanni Bugada · 5A INF
                <br />
                ISISS Valle Seriana · Gazzaniga (BG)
                <br />
                A.S. 2025–2026
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-mono-eyebrow text-cream/40">
            <span>END · 15 / 15</span>
            <span>↑ TORNA SU</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
