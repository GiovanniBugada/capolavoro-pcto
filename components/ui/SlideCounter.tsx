'use client';

import { useEffect, useState } from 'react';

interface Props {
  total: number;
}

export default function SlideCounter({ total }: Props) {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    let sections: HTMLElement[] = [];
    let raf = 0;
    let lastY = -1;
    let attachedLenis: (typeof window)['__lenis'] | undefined;
    let attachInterval = 0;

    const refresh = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-slide]'));
    };

    const pickSection = (scrollY: number) => {
      if (sections.length === 0) return;
      const vh = window.innerHeight;
      const viewportCenter = scrollY + vh / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        const top = s.offsetTop;
        const center = top + s.offsetHeight / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setCurrent(bestIdx + 1);
    };

    const handleScroll = (y: number) => {
      if (y !== lastY) {
        lastY = y;
        pickSection(y);
      }
    };

    const onLenisScroll = ({ scroll }: { scroll: number }) => handleScroll(scroll);

    const tryAttachLenis = () => {
      const lenis = window.__lenis;
      if (lenis && lenis !== attachedLenis) {
        attachedLenis = lenis;
        lenis.on('scroll', onLenisScroll);
        return true;
      }
      return false;
    };

    // rAF polling fallback (works without Lenis, throttled when tab is hidden)
    const tick = () => {
      handleScroll(window.scrollY);
      raf = requestAnimationFrame(tick);
    };

    refresh();
    pickSection(window.scrollY);

    if (!tryAttachLenis()) {
      // start fallback polling immediately so the counter still updates
      // before Lenis registers; retry attaching every 80ms for up to ~1s
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

    window.addEventListener('resize', refresh, { passive: true });
    // dynamic-imported sections may register late
    const t = window.setTimeout(() => { refresh(); pickSection(window.scrollY); }, 400);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (attachInterval) window.clearInterval(attachInterval);
      attachedLenis?.off('scroll', onLenisScroll);
      window.removeEventListener('resize', refresh);
      window.clearTimeout(t);
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="font-mono uppercase tracking-widest-mono text-[10px]" aria-live="polite">
      <span className="block text-right">
        <span style={{ opacity: 1 }}>{pad(current)}</span>{' '}
        <span style={{ opacity: 0.55 }}>/ {pad(total)}</span>
      </span>
      <span className="block text-right mt-1" style={{ opacity: 0.55 }}>SEZIONE</span>
    </div>
  );
}
