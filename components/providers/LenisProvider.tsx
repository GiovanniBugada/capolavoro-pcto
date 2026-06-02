'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1,
    });

    window.__lenis = lenis;

    // Framer Motion's useScroll listens to native 'scroll' events on the
    // window. Lenis hijacks the wheel and updates scroll via its own RAF,
    // so the native 'scroll' event sometimes fails to fire (or fires only
    // sporadically). We forward Lenis scroll updates as synthetic scroll
    // events so framer-motion scroll-driven transforms (bgColor,
    // parallax, etc.) stay in sync.
    const forwardScroll = () => window.dispatchEvent(new Event('scroll'));
    lenis.on('scroll', forwardScroll);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.off('scroll', forwardScroll);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
