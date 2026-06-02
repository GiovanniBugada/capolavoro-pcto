'use client';

import dynamic from 'next/dynamic';
import { motion, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ease } from '@/lib/animations';
import { useLenisScrollProgress } from '@/lib/useLenisScrollProgress';
// (kept: Hero needs scroll progress for the topo/building parallax)

const BuildingWireframe = dynamic(() => import('@/components/3d/BuildingWireframe'), { ssr: false });
const TopoBackground = dynamic(() => import('@/components/3d/TopoBackground'), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  const scrollYProgress = useLenisScrollProgress(ref);

  const topoY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const topoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const buildingScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const skip = sessionStorage.getItem('cp_loaded') === '1';
    if (skip) {
      setReady(true);
      return;
    }
    const onDone = () => setReady(true);
    window.addEventListener('cp:loader-done', onDone, { once: true });
    const fallback = window.setTimeout(() => setReady(true), 3200);
    return () => {
      window.removeEventListener('cp:loader-done', onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  const handleArrowClick = () => {
    document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="light"
      id="hero"
      className="relative w-full bg-cream overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* topo background — parallaxed on scroll */}
      <motion.div
        className="absolute inset-0 opacity-90 pointer-events-none"
        style={{ y: topoY, scale: topoScale }}
      >
        <TopoBackground stroke="#0a0a0a" density={12} />
      </motion.div>

      {/* radial spotlight tying topo and content together */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 45%, rgba(250,250,247,0.65), transparent 70%)',
        }}
      />

      {/* page index top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hidden md:flex absolute top-6 md:top-8 left-6 md:left-12 z-20 items-baseline gap-4"
      >
        <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber">01 / 11</span>
        <span className="h-px w-12 bg-amber/40" />
        <span className="font-mono uppercase tracking-widest-mono text-[10px] text-ink/60">COVER</span>
      </motion.div>

      {/* main content grid */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 px-6 md:px-12 pt-24 md:pt-28 pb-36 gap-y-8 will-change-transform"
        // ensure section is at least viewport-tall even if grid is empty
        // (the section already sets minHeight)
      >
        {/* LEFT: copy */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.05, ease: ease.out }}
            className="font-mono uppercase tracking-widest-mono text-[11px] text-ink/55 mb-8"
          >
            <span className="hidden sm:inline">CAPOLAVORO · PCTO · ESAME DI STATO 2025–2026</span>
            <span className="sm:hidden">CAPOLAVORO PCTO · 2025–2026</span>
          </motion.p>

          <h1
            className="font-sans font-black tracking-tightest leading-[0.88] text-ink mb-10"
            aria-label="Dall'informatica al territorio."
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 0.95, delay: 0.25, ease: ease.out }}
                className="inline-block"
                style={{ fontSize: 'clamp(2.2rem, 6.4vw, 6.8rem)' }}
              >
                <em className="font-serif italic font-normal">Dall&apos;</em>informatica
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 0.95, delay: 0.4, ease: ease.out }}
                className="inline-block"
                style={{ fontSize: 'clamp(2.2rem, 6.4vw, 6.8rem)' }}
              >
                <em className="font-serif italic font-normal">al</em>{' '}
                <span className="text-amber">territorio.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.85, ease: ease.out }}
            className="max-w-[480px] text-ink/75 text-[15px] md:text-[16px] leading-relaxed"
          >
            Un percorso interdisciplinare fra <em className="font-serif italic text-ink">codice</em>, disegno
            tecnico e rilievo del territorio. Una storia di stage non andato come previsto —{' '}
            <span className="text-ink font-medium">andato meglio</span>.
          </motion.p>

          <motion.button
            type="button"
            onClick={handleArrowClick}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex items-center gap-4 text-ink/60 hover:text-amber transition-colors group cursor-pointer"
            data-cursor="hover"
            aria-label="Scorri al manifesto"
          >
            <span className="font-mono uppercase tracking-widest-mono text-[10px] group-hover:tracking-[0.22em] transition-all">
              SCROLL PER LEGGERE
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-amber group-hover:scale-125 transition-transform"
            >
              ↓
            </motion.span>
          </motion.button>
        </div>

        {/* RIGHT: building */}
        <div className="lg:col-span-5 relative min-h-[44vh] lg:min-h-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.4 }}
            style={{ scale: buildingScale }}
            className="absolute inset-0 lg:-right-12 will-change-transform"
          >
            <BuildingWireframe revealMs={4000} interactive={false} theme="light" />
          </motion.div>

        </div>
      </motion.div>

      {/* footer grid pinned at bottom */}
      <motion.footer
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 1.1, staggerChildren: 0.08 } },
        }}
        className="absolute bottom-14 md:bottom-16 left-6 right-6 md:left-12 md:right-12 z-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 border-t border-ink/15 pt-6"
      >
        {[
          ['NOME', 'Giovanni Bugada', '5A INF'],
          ['ISTITUTO', 'ISISS Valle Seriana', 'Gazzaniga (BG)'],
          ['STAGE PCTO', 'Studio Geom.', 'Sergio Grassi'],
          ['ANNO', 'A.S. 2025–2026', 'Esame di Stato'],
        ].map(([label, l1, l2]) => (
          <motion.div
            key={label}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
            }}
            className="flex flex-col"
          >
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-ink/40 mb-1.5">
              {label}
            </span>
            <span className="text-ink text-[13px] font-semibold tracking-tightish leading-tight">{l1}</span>
            <span className="text-ink/60 text-[12px] leading-tight">{l2}</span>
          </motion.div>
        ))}
      </motion.footer>
    </section>
  );
}
