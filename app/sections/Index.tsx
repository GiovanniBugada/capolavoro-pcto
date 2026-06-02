'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ease } from '@/lib/animations';

const ITEMS = [
  { num: '§01', title: 'Il Contesto', sub: 'Lo Studio Grassi e il settore del geometra oggi.', anchor: 'studio', glyph: '◰' },
  { num: '§02', title: 'Il Percorso Imprevisto', sub: 'Cosa mi aspettavo · Cosa ho trovato.', anchor: 'aspettative', glyph: '◐' },
  { num: '§03', title: 'Le Competenze Tecniche', sub: 'AutoCAD · Rilievi · Planimetrie.', anchor: 'autocad', glyph: '◑' },
  { num: '§04', title: 'Il Ponte con l’Informatica', sub: 'Collegamenti con le materie del 5° anno.', anchor: 'materie', glyph: '◧' },
  { num: '§05', title: 'Sintesi e Riflessione', sub: 'Skills · La lezione del capolavoro.', anchor: 'skills', glyph: '✦' },
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: ease.out }}
      className="group relative grid grid-cols-12 items-baseline py-7 md:py-9 border-t border-line gap-4"
      data-cursor="hover"
    >
      <motion.span
        animate={{ color: hover ? '#f59e0b' : '#71717a' }}
        transition={{ duration: 0.3 }}
        className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-widest-mono pt-2"
      >
        {item.num}
      </motion.span>

      <motion.span
        animate={{ x: hover ? 18 : 0 }}
        transition={{ duration: 0.45, ease: ease.out }}
        className="col-span-8 md:col-span-7 font-sans font-bold tracking-tightest text-ink"
        style={{ fontSize: 'clamp(1.6rem, 4vw, 3.6rem)', lineHeight: 1 }}
      >
        {item.title}
      </motion.span>

      <motion.span
        animate={{ opacity: hover ? 1 : 0.55 }}
        transition={{ duration: 0.35 }}
        className="hidden md:block col-span-3 text-muted text-[12px] leading-snug font-sans"
      >
        {item.sub}
      </motion.span>

      <motion.span
        animate={{ x: hover ? 0 : 14, opacity: hover ? 1 : 0.25 }}
        transition={{ duration: 0.4, ease: ease.out }}
        className="col-span-2 md:col-span-1 text-amber text-2xl text-right"
      >
        ↗
      </motion.span>
    </motion.a>
  );
}

export default function IndexSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="light"
      id="indice"
      className="relative w-full bg-cream py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ease.out }}
          className="flex items-baseline gap-3 mb-8"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§00</span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">Indice — cinque capitoli</span>
        </motion.div>

        <h2
          className="font-sans font-black text-ink tracking-tightest leading-[0.9] mb-10 md:mb-14 max-w-5xl"
          style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: ease.out }}
            className="block"
          >
            Una storia
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: ease.out }}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10 flex items-center gap-3 text-muted"
        >
          <span className="block h-px w-12 bg-amber" />
          <span className="font-mono uppercase tracking-widest-mono text-[10px]">
            CLICCA UNA RIGA O SCORRI PER PROCEDERE
          </span>
        </motion.div>
      </div>
    </section>
  );
}
