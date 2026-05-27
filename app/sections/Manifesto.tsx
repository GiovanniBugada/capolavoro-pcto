'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const WORDS = [
  'Il', 'mio', 'PCTO', 'non', 'doveva', 'andare', 'così.', 'È', 'andato',
];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['#fafaf7', '#fafaf7', '#0a0a0a', '#0a0a0a']
  );
  const fgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['#0a0a0a', '#0a0a0a', '#fafaf7', '#fafaf7']
  );

  return (
    <motion.section
      data-slide
      id="manifesto"
      ref={ref}
      style={{ backgroundColor: bgColor }}
      className="relative min-h-[150vh] w-full"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-12">
        <motion.p
          style={{ color: fgColor }}
          className="font-mono-eyebrow mb-12 self-start max-w-7xl mx-auto w-full"
        >
          MANIFESTO · UNA FRASE
        </motion.p>

        <motion.h2
          style={{ color: fgColor }}
          className="font-sans font-bold tracking-tighter leading-[0.95] text-center max-w-6xl mx-auto"
          aria-label="Il mio PCTO non doveva andare così. È andato meglio."
        >
          <span style={{ fontSize: 'clamp(2.6rem, 7.2vw, 7.5rem)' }} className="block">
            {WORDS.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: WORDS.length * 0.06 + 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-block text-amber font-serif italic font-normal"
              >
                meglio.
              </motion.span>
            </span>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 flex items-center gap-3"
        >
          <span className="block h-px w-12 bg-amber" />
          <motion.span style={{ color: fgColor }} className="font-mono-eyebrow">
            CAPOLAVORO · GIOVANNI BUGADA
          </motion.span>
        </motion.div>
      </div>
    </motion.section>
  );
}
