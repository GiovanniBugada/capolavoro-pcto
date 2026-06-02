'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// One single phrase, split for staggered reveal.
const WORDS: Array<{ w: string; highlight?: boolean }> = [
  { w: 'Il' }, { w: 'mio' }, { w: 'PCTO' },
  { w: 'non' }, { w: 'doveva' }, { w: 'andare' }, { w: 'così.' },
  { w: 'È' }, { w: 'andato' }, { w: 'meglio.', highlight: true },
];

// Visual break-points: insert a line break after these indices (0-based).
const BREAK_AFTER = [2, 6];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  // amount:0.1 means: as soon as 10% of the title is on screen, fire.
  // This avoids the `whileInView` no-fire bug we saw with amount:0.35
  // under certain scroll-restoration timings.
  const inView = useInView(ref, { amount: 0.1, once: true });

  return (
    <section
      data-slide
      data-section-theme="dark"
      id="manifesto"
      className="relative w-full bg-ink text-cream overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, #fafaf7 0 1px, transparent 1px 12.5%)',
        }}
      />

      <div className="relative min-h-screen flex flex-col px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto w-full mb-auto">
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/55">
            Manifesto
          </span>
        </div>

        <div ref={ref} className="flex-1 flex items-center justify-center max-w-[1400px] mx-auto w-full">
          <h2
            className="font-sans font-black tracking-tightest leading-[0.98] text-center text-cream"
            aria-label="Il mio PCTO non doveva andare così. È andato meglio."
            style={{ fontSize: 'clamp(2rem, 5.8vw, 5.8rem)' }}
          >
            {WORDS.map((wd, i) => (
              <span key={i}>
                <motion.span
                  initial={{ opacity: 0, y: 36 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    wd.highlight
                      ? 'inline-block text-amber font-serif italic font-normal mr-[0.22em]'
                      : 'inline-block mr-[0.22em]'
                  }
                >
                  {wd.w}
                </motion.span>
                {BREAK_AFTER.includes(i) && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex items-baseline justify-between max-w-[1400px] mx-auto w-full mt-auto text-cream/55">
          <span className="font-mono uppercase tracking-widest-mono text-[10px]">
            Capolavoro · Giovanni Bugada
          </span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px]">
            Continua →
          </span>
        </div>
      </div>
    </section>
  );
}
