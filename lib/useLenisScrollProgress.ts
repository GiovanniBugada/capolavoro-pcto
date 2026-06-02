'use client';

import { useMotionValue } from 'framer-motion';
import { RefObject, useEffect, useState } from 'react';

/**
 * Returns a motion value for the scroll progress of `targetRef` in the
 * range [0, 1], where 0 = target's top reaches viewport bottom (entering)
 * and 1 = target's bottom reaches viewport top (leaving).
 *
 * Equivalent to framer-motion's `useScroll({ target, offset: ['start end',
 * 'end start'] })` but driven by Lenis's scroll callback so it stays in
 * sync even when Lenis is intercepting wheel events.
 *
 * Falls back to listening to the native 'scroll' event if Lenis isn't
 * available (e.g. prefers-reduced-motion).
 */
export function useLenisScrollProgress(targetRef: RefObject<HTMLElement>) {
  const progress = useMotionValue(0);
  // ensure the hook re-runs when Lenis becomes available after mount
  const [, setReady] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const elTopPage = rect.top + window.scrollY;
      const elBottomPage = elTopPage + rect.height;
      // 'start end' → target top reaches viewport bottom: scrollY = elTopPage - vh
      // 'end start' → target bottom reaches viewport top: scrollY = elBottomPage
      const start = elTopPage - vh;
      const end = elBottomPage;
      const range = end - start;
      if (range <= 0) return;
      const p = Math.max(0, Math.min(1, (window.scrollY - start) / range));
      progress.set(p);
    };

    let attached = false;
    let lenisRef: typeof window.__lenis | undefined;

    const tryAttach = () => {
      const lenis = window.__lenis;
      if (lenis && !attached) {
        lenis.on('scroll', update);
        lenisRef = lenis;
        attached = true;
        update();
        setReady((n) => n + 1);
        return true;
      }
      return false;
    };

    // first run + initial value
    update();

    if (!tryAttach()) {
      // poll briefly until Lenis registers (LenisProvider mounts after children)
      let tries = 0;
      const iv = window.setInterval(() => {
        tries++;
        if (tryAttach() || tries > 20) {
          window.clearInterval(iv);
        }
      }, 80);
      // also subscribe to native scroll as a fallback in case Lenis never appears
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      return () => {
        window.clearInterval(iv);
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
        if (lenisRef) lenisRef.off('scroll', update);
      };
    }

    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      if (lenisRef) lenisRef.off('scroll', update);
    };
  }, [targetRef, progress]);

  return progress;
}
