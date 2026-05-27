'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ease } from '@/lib/animations';

const ITEMS = [
  { num: '§01', title: 'Il Contesto', sub: 'Lo Studio Grassi e il settore del geometra oggi', anchor: 'studio' },
  { num: '§02', title: 'Il Percorso Imprevisto', sub: 'Cosa mi aspettavo · Cosa ho trovato', anchor: 'aspettative' },
  { num: '§03', title: 'Le Competenze Tecniche', sub: 'AutoCAD · Rilievi · Planimetrie', anchor: 'autocad' },
  { num: '§04', title: 'Il Ponte con l’Informatica', sub: 'Collegamenti con le materie del 5° anno', anchor: 'materie' },
  { num: '§05', title: 'Sintesi e Riflessione', sub: 'Skills · La lezione del capolavoro', anchor: 'skills' },
] as const;

function Row({ item, index }: { item: typeof ITEMS[number]; index: number }) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <motion.a
      ref={ref}
      href={`#${item.anchor}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: ease.out }}
      className="group relative grid grid-cols-12 items-baseline py-8 md:py-10 border-t border-line"
      data-cursor="hover"
    >
      <motion.span
        animate={{ x: hover ? 12 : 0, color: hover ? '#f59e0b' : '#71717a' }}
        transition={{ duration: 0.4, ease: ease.out }}
        className="col-span-2 md:col-span-1 font-mono text-[12px] tracking-widest-mono pt-2"
      >
        {item.num}
      </motion.span>

      <motion.span
        animate={{ x: hover ? 32 : 0 }}
        transition={{ duration: 0.5, ease: ease.out }}
        className="col-span-7 md:col-span-7 font-sans font-bold tracking-tighter text-ink"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)', lineHeight: 1 }}
      >
        {item.title}
      </motion.span>

      <motion.span
        animate={{ opacity: hover ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
        className="hidden md:block col-span-3 text-muted text-[13px] leading-snug font-sans"
      >
        {item.sub}
      </motion.span>

      <motion.span
        animate={{ x: hover ? 0 : 24, opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.45, ease: ease.out }}
        className="col-span-1 text-amber text-2xl text-right"
      >
        ↗
      </motion.span>
    </motion.a>
  );
}

export default function IndexSection() {
  return (
    <section
      data-slide
      id="indice"
      className="relative min-h-screen w-full bg-cream py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ease.out }}
          className="flex items-baseline justify-between mb-10 md:mb-16"
        >
          <span className="font-mono-eyebrow">INDICE · CINQUE CAPITOLI</span>
          <span className="font-mono-eyebrow hidden md:inline">5 / 5 SEZIONI</span>
        </motion.div>

        <h2
          className="font-sans font-black text-ink tracking-tightest leading-[0.9] mb-12 md:mb-20 max-w-5xl"
          style={{ fontSize: 'clamp(2.4rem, 6.4vw, 6.5rem)' }}
        >
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: ease.out }}
            className="block"
          >
            Una storia
          </motion.span>
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease: ease.out }}
            className="block"
          >
            in <em className="font-serif italic font-normal text-amber">cinque</em> tempi.
          </motion.span>
        </h2>

        <div className="border-b border-line">
          {ITEMS.map((it, i) => (
            <Row key={it.num} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
