'use client';

import { ReactNode, useEffect, useRef } from 'react';

/**
 * Wraps a section and exposes its theme (`light` | `dark`) to a global
 * IntersectionObserver. The top-most overlay UI (brand badge, slide
 * counter) reads `data-theme` on <html> and recolors itself.
 */
export default function SectionTheme({
  theme,
  children,
  ...rest
}: {
  theme: 'light' | 'dark';
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            document.documentElement.setAttribute('data-theme', theme);
          }
        });
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [theme]);

  return (
    <div ref={ref} data-section-theme={theme} {...rest}>
      {children}
    </div>
  );
}
