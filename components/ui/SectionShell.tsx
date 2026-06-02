'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ease } from '@/lib/animations';

interface Props {
  id: string;
  num: string;
  eyebrow: string;
  theme?: 'cream' | 'cream2' | 'ink' | 'amber';
  watermark?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  fullBleed?: boolean;
}

const themeClass = {
  cream: 'bg-cream text-ink',
  cream2: 'bg-cream2 text-ink',
  ink: 'bg-ink text-cream',
  amber: 'bg-amber text-ink',
};

const watermarkColor = {
  cream: '#0a0a0a',
  cream2: '#0a0a0a',
  ink: '#fafaf7',
  amber: '#0a0a0a',
};

export default function SectionShell({
  id,
  num,
  eyebrow,
  theme = 'cream',
  watermark,
  children,
  className = '',
  noPadding = false,
  fullBleed = false,
}: Props) {
  return (
    <section
      data-slide
      data-section-theme={theme === 'ink' ? 'dark' : 'light'}
      id={id}
      className={`relative w-full overflow-hidden ${themeClass[theme]} ${noPadding ? '' : 'py-20 md:py-28 px-6 md:px-12'} ${className}`}
      style={{ minHeight: '100vh' }}
    >
      {/* big background watermark number */}
      {watermark && (
        <span
          aria-hidden
          className="absolute pointer-events-none select-none font-sans font-black leading-none"
          style={{
            fontSize: 'clamp(20rem, 50vw, 56rem)',
            color: watermarkColor[theme],
            opacity: 0.035,
            bottom: '-10%',
            right: '-4%',
            letterSpacing: '-0.06em',
          }}
        >
          {watermark}
        </span>
      )}

      {/* eyebrow + section number */}
      {!fullBleed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: ease.out }}
          className="relative max-w-[1400px] mx-auto flex items-baseline gap-6 mb-10 md:mb-14"
        >
          <span
            className={`font-mono text-[11px] tracking-widest-mono uppercase ${
              theme === 'ink' ? 'text-amber' : 'text-amber'
            }`}
          >
            {num}
          </span>
          <span className={`h-px flex-1 max-w-[120px] ${theme === 'ink' ? 'bg-cream/20' : 'bg-line'}`} />
          <span
            className={`font-mono text-[11px] tracking-widest-mono uppercase ${
              theme === 'ink' ? 'text-cream/70' : 'text-muted'
            }`}
          >
            {eyebrow}
          </span>
        </motion.div>
      )}

      <div className={fullBleed ? '' : 'relative max-w-[1400px] mx-auto'}>{children}</div>
    </section>
  );
}
