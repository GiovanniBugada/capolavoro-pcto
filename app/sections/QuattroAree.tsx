'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ease } from '@/lib/animations';

const AREAS = [
  {
    num: '01',
    title: 'AutoCAD',
    desc: 'Disegno digitale: layer, scale, quotature, blocchi, viewport.',
    bg: '#0a0a0a',
    fg: '#fafaf7',
    accent: '#f59e0b',
  },
  {
    num: '02',
    title: 'Rilievi',
    desc: 'Misurazioni sul campo con sonde da terra e restituzione grafica.',
    bg: '#8b5cf6',
    fg: '#fafaf7',
    accent: '#fafaf7',
  },
  {
    num: '03',
    title: 'Planimetrie',
    desc: 'Redazione di planimetrie catastali e supporto alle pratiche.',
    bg: '#f59e0b',
    fg: '#0a0a0a',
    accent: '#0a0a0a',
  },
  {
    num: '04',
    title: 'IT Studio',
    desc: 'Gestione documentale, archiviazione, flusso di lavoro digitale.',
    bg: '#3b82f6',
    fg: '#fafaf7',
    accent: '#fafaf7',
  },
] as const;

export default function QuattroAree() {
  const [hover, setHover] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const wmY = useTransform(scrollYProgress, [0, 1], ['10%', '-12%']);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="light"
      id="aree"
      className="relative w-full bg-cream py-14 md:py-20 px-6 md:px-12 overflow-hidden"
    >
      <motion.span
        aria-hidden
        style={{ fontSize: 'clamp(18rem, 42vw, 46rem)', opacity: 0.018, top: '40%', right: '-8%', letterSpacing: '-0.06em', y: wmY }}
        className="absolute pointer-events-none select-none font-sans font-black leading-none text-ink will-change-transform"
      >
        04
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
            §02 / AREE
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-line" />
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">
            QUATTRO FRONTI APERTI IN PARALLELO
          </span>
        </motion.div>

        <h2
          className="font-sans font-black tracking-tightest leading-[0.92] text-ink mb-10 max-w-5xl"
          style={{ fontSize: 'clamp(2rem, 5.2vw, 5.2rem)' }}
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: ease.out }}
              className="inline-block"
            >
              Quattro fronti
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
              <em className="font-serif italic font-normal text-amber">aperti</em> in parallelo.
            </motion.span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: ease.out }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              animate={{
                scale: hover === i ? 1.025 : hover !== null ? 0.985 : 1,
                opacity: hover !== null && hover !== i ? 0.5 : 1,
                transition: { duration: 0.4, ease: 'easeOut' },
              }}
              style={{ background: a.bg, color: a.fg }}
              className="relative aspect-[3/4] flex flex-col justify-between p-6 md:p-7 overflow-hidden cursor-default"
              data-cursor="hover"
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-mono uppercase tracking-widest-mono text-[10px]"
                  style={{ color: a.accent, opacity: 0.85 }}
                >
                  {a.num} / 04
                </span>
                <motion.span
                  animate={{ rotate: hover === i ? 0 : -45 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl"
                  style={{ color: a.accent }}
                >
                  →
                </motion.span>
              </div>

              <div>
                <h3
                  className="font-sans font-bold tracking-tightish mb-3"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', lineHeight: 1 }}
                >
                  {a.title}
                </h3>
                <motion.p
                  animate={{ opacity: hover === i ? 1 : 0.75 }}
                  transition={{ duration: 0.3 }}
                  className="text-[13px] leading-snug"
                >
                  {a.desc}
                </motion.p>
              </div>

              <span
                className="absolute -bottom-12 -right-6 font-sans font-black leading-none select-none pointer-events-none opacity-[0.08]"
                style={{ fontSize: 'clamp(10rem, 18vw, 18rem)', color: a.fg }}
                aria-hidden
              >
                {a.num}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
