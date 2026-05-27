'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const TILES = [
  {
    num: '01',
    title: 'Catasto',
    desc: 'Aggiornamenti catastali, accatastamenti, variazioni, frazionamenti.',
    accent: '#3b82f6',
    glyph: (
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <rect x="20" y="20" width="60" height="40" />
        <rect x="40" y="35" width="40" height="25" />
        <line x1="20" y1="40" x2="80" y2="40" />
      </g>
    ),
  },
  {
    num: '02',
    title: 'Edilizia',
    desc: 'Pratiche edilizie, CILA, SCIA, supporto alla progettazione.',
    accent: '#f59e0b',
    glyph: (
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <polygon points="50,15 85,40 85,75 15,75 15,40" />
        <rect x="42" y="50" width="16" height="25" />
        <rect x="25" y="50" width="10" height="10" />
        <rect x="65" y="50" width="10" height="10" />
      </g>
    ),
  },
  {
    num: '03',
    title: 'Rilievi',
    desc: 'Misurazione del territorio e degli edifici sul campo.',
    accent: '#8b5cf6',
    glyph: (
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="22" />
        <circle cx="50" cy="50" r="10" />
        <line x1="50" y1="10" x2="50" y2="90" />
        <line x1="10" y1="50" x2="90" y2="50" />
      </g>
    ),
  },
  {
    num: '04',
    title: 'Disegno tecnico',
    desc: 'Restituzione digitale di planimetrie e mappe in CAD.',
    accent: '#10b981',
    glyph: (
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <rect x="15" y="20" width="70" height="55" />
        <line x1="15" y1="35" x2="85" y2="35" />
        <line x1="35" y1="35" x2="35" y2="75" />
        <line x1="60" y1="35" x2="60" y2="55" />
        <line x1="60" y1="55" x2="85" y2="55" />
      </g>
    ),
  },
] as const;

function Tile({ tile, idx }: { tile: typeof TILES[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: ease.out }}
      className="relative"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative bg-cream2 border border-line p-8 md:p-10 h-full transition-transform duration-300 ease-out-expo overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
        data-cursor="hover"
      >
        <span
          className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out-expo"
          style={{ background: tile.accent }}
        />
        <div className="flex items-start justify-between mb-12">
          <span className="font-mono-eyebrow text-muted">{tile.num} / 04</span>
          <div className="w-24 h-24" style={{ color: tile.accent }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {tile.glyph}
            </svg>
          </div>
        </div>

        <h3
          className="font-sans font-bold tracking-tightish text-ink mb-3"
          style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}
        >
          {tile.title}
        </h3>

        <p className="text-muted text-[14px] md:text-[15px] leading-relaxed">{tile.desc}</p>

        {/* noise */}
        <div className="absolute inset-0 grain pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function SettoriGeometra() {
  return (
    <section
      data-slide
      id="settori"
      className="relative min-h-screen w-full bg-cream py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono-eyebrow mb-4">§01 · SETTORI DEL GEOMETRA</p>
          <h2
            className="font-sans font-black tracking-tightest leading-[0.92] text-ink max-w-5xl"
            style={{ fontSize: 'clamp(2.2rem, 5.4vw, 5.4rem)' }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: ease.out }}
                className="inline-block"
              >
                Quattro mondi
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: ease.out }}
                className="inline-block"
              >
                in <em className="font-serif italic font-normal text-amber">uno solo</em>.
              </motion.span>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TILES.map((t, i) => (
            <Tile key={t.num} tile={t} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
