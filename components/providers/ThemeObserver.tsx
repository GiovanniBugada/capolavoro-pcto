'use client';

import { useEffect } from 'react';

/**
 * Watches all elements with [data-section-theme] and updates
 * <html data-theme="light|dark"> to match the most-visible section.
 * This drives the color of the brand badge, slide counter, hints, etc.,
 * without ugly mix-blend-difference fallbacks.
 */
export default function ThemeObserver() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section-theme]')
    );
    if (sections.length === 0) return;

    let current: HTMLElement | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.target !== current) {
          current = visible.target as HTMLElement;
          const theme = current.dataset.sectionTheme === 'dark' ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', theme);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
