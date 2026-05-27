'use client';

import { useEffect, useState } from 'react';

interface Props {
  total: number;
}

export default function SlideCounter({ total }: Props) {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-slide]'));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = sections.indexOf(visible.target as HTMLElement);
          if (idx >= 0) setCurrent(idx + 1);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="font-mono-eyebrow text-ink" aria-live="polite">
      {pad(current)} <span className="text-muted">/ {pad(total)}</span>
    </div>
  );
}
