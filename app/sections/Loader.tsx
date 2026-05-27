'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ minMs = 2200 }: { minMs?: number }) {
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / minMs);
      const eased = 1 - Math.pow(1 - p, 2);
      setVal(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 380);
      }
    };
    requestAnimationFrame(tick);
  }, [minMs]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] } }}
          className="fixed inset-0 z-[120] bg-ink flex flex-col items-center justify-center"
          aria-label="Caricamento del sito"
          role="status"
        >
          <div className="absolute top-6 left-6 right-6 flex justify-between font-mono-eyebrow text-cream/60">
            <span>CARICAMENTO_TERRITORIO</span>
            <span>RIL · 2025–26</span>
          </div>

          <motion.div
            animate={val >= 100 ? { scale: [1, 1.2, 18], opacity: [1, 1, 0] } : { scale: 1 }}
            transition={val >= 100 ? { duration: 0.7, ease: [0.83, 0, 0.17, 1], times: [0, 0.3, 1] } : {}}
            className="text-cream font-sans font-black leading-none tracking-tightest"
            style={{ fontSize: 'clamp(8rem, 28vw, 22rem)', fontVariantNumeric: 'tabular-nums' }}
          >
            {String(val).padStart(3, '0')}
            <span className="text-amber">%</span>
          </motion.div>

          <div className="absolute bottom-8 left-0 right-0 px-8">
            <div className="h-px bg-cream/15 w-full overflow-hidden">
              <motion.div
                className="h-full bg-amber origin-left"
                style={{ width: `${val}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono-eyebrow text-cream/40">
              <span>GIOVANNI BUGADA</span>
              <span>5A INF · ISISS VALLE SERIANA</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
