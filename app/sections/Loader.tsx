'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ minMs = 1800 }: { minMs?: number }) {
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem('cp_loaded') === '1';
    if (seen) {
      setSkip(true);
      setDone(true);
      window.dispatchEvent(new CustomEvent('cp:loader-done'));
      return;
    }

    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / minMs);
      const eased = 1 - Math.pow(1 - p, 2);
      setVal(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('cp_loaded', '1');
        window.setTimeout(() => {
          setDone(true);
          window.dispatchEvent(new CustomEvent('cp:loader-done'));
        }, 380);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [minMs]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] } }}
          className="fixed inset-0 z-[120] bg-ink flex flex-col items-center justify-between py-10 md:py-16 px-6 md:px-12"
          aria-label="Caricamento del sito"
          role="status"
        >
          {/* tiny moving grid background */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(250,250,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,247,0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage:
                'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            }}
          />

          <div className="relative w-full flex items-center justify-between font-mono uppercase tracking-widest-mono text-[10px] text-cream/60">
            <span className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-amber animate-pulse" />
              CARICAMENTO_TERRITORIO
            </span>
            <span>RIL · 2025–26</span>
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber">
              CAPOLAVORO_PCTO
            </span>
            <motion.div
              animate={val >= 100 ? { scale: [1, 1.15, 0.92], opacity: [1, 1, 0] } : { scale: 1 }}
              transition={val >= 100 ? { duration: 0.7, ease: [0.83, 0, 0.17, 1], times: [0, 0.4, 1] } : {}}
              className="text-cream font-sans font-black leading-none tracking-tightest flex items-baseline"
              style={{ fontSize: 'clamp(5rem, 18vw, 14rem)', fontVariantNumeric: 'tabular-nums' }}
            >
              {String(val).padStart(3, '0')}
              <span className="text-amber" style={{ fontSize: '0.65em' }}>%</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4 }}
              className="font-serif italic text-cream/60 text-center max-w-md text-[15px] md:text-[17px]"
            >
              Dall&apos;informatica al territorio.
            </motion.p>
          </div>

          <div className="relative w-full">
            <div className="h-px bg-cream/15 overflow-hidden relative">
              <div
                className="h-full bg-amber"
                style={{ width: `${val}%`, transition: 'width 60ms linear' }}
              />
              {/* leading edge glow */}
              <div
                className="absolute top-0 h-full w-12"
                style={{
                  left: `calc(${val}% - 3rem)`,
                  background:
                    'linear-gradient(to right, transparent, rgba(245,158,11,0.45))',
                  filter: 'blur(2px)',
                  transition: 'left 60ms linear',
                  opacity: val > 0 && val < 100 ? 1 : 0,
                }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono uppercase tracking-widest-mono text-[10px] text-cream/40">
              <span>GIOVANNI BUGADA</span>
              <span>5A INF · ISISS VALLE SERIANA</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
