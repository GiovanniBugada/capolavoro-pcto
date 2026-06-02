'use client';

import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const StarsField = dynamic(() => import('@/components/3d/StarsField'), { ssr: false });

const LINE_1 = [
  // "L'" stays glued to "informatica" — render as L' + informatica with no gap
  { w: 'L’', glue: true },
  { w: 'informatica', highlight: true },
  { w: 'mi' },
  { w: 'ha' },
  { w: 'dato' },
  { w: 'un' },
  { w: 'linguaggio.' },
];

const LINE_2 = [
  { w: 'Il' },
  { w: 'territorio', highlight: true },
  { w: 'mi' },
  { w: 'ha' },
  { w: 'dato' },
  { w: 'qualcosa' },
  { w: 'da' },
  { w: 'dire.' },
];

function Word({
  w,
  highlight,
  glue,
  delay,
  inView,
}: {
  w: string;
  highlight?: boolean;
  glue?: boolean;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.span
      initial={{ y: 28, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: ease.out }}
      className={
        (highlight
          ? 'inline-block text-amber font-serif italic font-normal '
          : 'inline-block text-cream ') + (glue ? '' : 'mr-[0.22em]')
      }
    >
      {w}
    </motion.span>
  );
}

export default function Chiusura() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { amount: 0.15, once: true });

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="dark"
      id="chiusura"
      className="relative w-full bg-ink overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="absolute inset-0">
        <StarsField />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-ink/40 via-transparent to-ink/60" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="px-6 md:px-12 pt-20 md:pt-24">
          <div className="max-w-[1400px] mx-auto">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/55">
              Fin — una frase per finire
            </span>
          </div>
        </div>

        <div ref={textRef} className="flex-1 flex items-center justify-center px-6 md:px-12 py-12">
          <h2
            className="font-sans font-black tracking-tightest leading-[1.02] text-center max-w-6xl"
            style={{ fontSize: 'clamp(1.9rem, 4.8vw, 5rem)' }}
            aria-label="L'informatica mi ha dato un linguaggio. Il territorio mi ha dato qualcosa da dire."
          >
            <span className="block mb-3">
              {LINE_1.map((wd, i) => (
                <Word
                  key={i}
                  w={wd.w}
                  highlight={wd.highlight}
                  glue={wd.glue}
                  delay={0.2 + i * 0.08}
                  inView={inView}
                />
              ))}
            </span>
            <span className="block">
              {LINE_2.map((wd, i) => (
                <Word
                  key={i}
                  w={wd.w}
                  highlight={wd.highlight}
                  delay={1.0 + i * 0.08}
                  inView={inView}
                />
              ))}
            </span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="px-6 md:px-12 pb-12 md:pb-16 max-w-[1400px] mx-auto w-full"
        >
          <div className="h-px bg-cream/15 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/50 mb-3">
                Ringraziamenti
              </p>
              <p className="text-cream/85 text-[15px] md:text-[17px] leading-relaxed max-w-2xl">
                Grazie al <span className="text-amber">Geom. Sergio Grassi</span> e a tutto lo Studio
                per avermi accolto e per avermi insegnato un mestiere che non era il mio. Grazie ai
                miei <span className="text-amber">professori</span> del 5A INF, che hanno reso
                possibile vedere un&apos;altra faccia dell&apos;informatica.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <p className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/50 mb-3">
                Crediti
              </p>
              <p className="text-cream/70 text-[13px] leading-relaxed">
                Giovanni Bugada · 5A INF
                <br />
                ISISS Valle Seriana · Gazzaniga (BG)
                <br />
                A.S. 2025–2026
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-mono uppercase tracking-widest-mono text-[10px] text-cream/40">
            <span>End · Capolavoro PCTO</span>
            <a
              href="#hero"
              className="hover:text-amber transition-colors underline-anim"
              data-cursor="hover"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined' && window.__lenis) {
                  window.__lenis.scrollTo(0, { duration: 1.6 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              ↑ Torna su
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
