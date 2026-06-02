'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    let lastY = -1;
    let attachedLenis: (typeof window)['__lenis'] | undefined;
    let attachInterval = 0;

    const update = (y: number) => {
      if (y === lastY) return;
      lastY = y;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const should = y > window.innerHeight * 1.5 && y < h - window.innerHeight * 0.8;
      setVisible((prev) => (prev !== should ? should : prev));
    };

    const onLenisScroll = ({ scroll }: { scroll: number }) => update(scroll);

    const tryAttachLenis = () => {
      const lenis = window.__lenis;
      if (lenis && lenis !== attachedLenis) {
        attachedLenis = lenis;
        lenis.on('scroll', onLenisScroll);
        return true;
      }
      return false;
    };

    const tick = () => {
      update(window.scrollY);
      raf = requestAnimationFrame(tick);
    };

    update(window.scrollY);

    if (!tryAttachLenis()) {
      raf = requestAnimationFrame(tick);
      let tries = 0;
      attachInterval = window.setInterval(() => {
        tries++;
        if (tryAttachLenis() || tries > 12) {
          window.clearInterval(attachInterval);
          attachInterval = 0;
        }
      }, 80);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (attachInterval) window.clearInterval(attachInterval);
      attachedLenis?.off('scroll', onLenisScroll);
    };
  }, []);

  const onClick = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          type="button"
          onClick={onClick}
          aria-label="Torna all'inizio"
          data-cursor="hover"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-24 right-6 md:right-8 z-[85] w-11 h-11 flex items-center justify-center border border-amber/60 bg-amber/10 backdrop-blur-sm text-amber hover:bg-amber hover:text-ink transition-colors rounded-full font-mono text-sm"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
