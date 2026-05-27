'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ease } from '@/lib/animations';

const BuildingWireframe = dynamic(() => import('@/components/3d/BuildingWireframe'), { ssr: false });

const CHIPS = ['Layer', 'Scale', 'Quotature', 'Blocchi', 'Viewport', 'Export DWG/PDF'];

export default function AutoCAD() {
  return (
    <section
      data-slide
      id="autocad"
      className="relative min-h-screen w-full bg-ink text-cream py-24 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* radial backdrop */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 75% 50%, rgba(245,158,11,0.10), transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(59,130,246,0.08), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center min-h-[80vh]">
        {/* LEFT: text + chips */}
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono-eyebrow text-amber mb-6"
          >
            §03 · COMPETENZE TECNICHE / AUTOCAD
          </motion.p>

          <h2
            className="font-sans font-black tracking-tightest leading-[0.9] mb-10"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)' }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: ease.out }}
                className="inline-block"
              >
                Disegnare
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
                un <em className="font-serif italic font-normal text-amber">edificio</em>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: ease.out }}
                className="inline-block"
              >
                è un <span className="text-amber">sistema</span>.
              </motion.span>
            </span>
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } } }}
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {CHIPS.map((c) => (
              <motion.span
                key={c}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
                }}
                className="px-4 py-2 border border-cream/20 rounded-full font-mono text-[11px] tracking-widest-mono uppercase text-cream/90 hover:border-amber hover:text-amber transition-colors"
                data-cursor="hover"
              >
                {c}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-cream/75 text-[15px] md:text-[16px] leading-relaxed max-w-md"
          >
            In AutoCAD il disegno non è un&apos;immagine: è un{' '}
            <em className="font-serif italic text-amber">sistema di entità geometriche</em> con coordinate, attributi
            e logica.
          </motion.p>
        </div>

        {/* RIGHT: 3D building */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: ease.out }}
          className="lg:col-span-7 relative aspect-square w-full"
        >
          <BuildingWireframe revealMs={4200} interactive />
          {/* coordinate axes corner label */}
          <div className="absolute bottom-4 left-4 font-mono-eyebrow text-cream/40">
            X · Y · Z / SCALA 1:100
          </div>
          <div className="absolute top-4 right-4 font-mono-eyebrow text-amber/80">
            EDIFICIO 3 PIANI · ESEMPIO
          </div>
        </motion.div>
      </div>

      {/* bottom tagline banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative max-w-7xl mx-auto mt-12 pt-8 border-t border-cream/15 flex flex-wrap items-baseline gap-x-8 gap-y-2"
      >
        <span className="font-mono-eyebrow text-cream/60">→</span>
        <span className="font-serif italic text-cream/95 text-[18px] md:text-[22px] max-w-4xl leading-snug">
          Lo stesso modo di pensare che impariamo in laboratorio di Informatica: definire entità,
          attributi, relazioni — non &quot;disegnare&quot;.
        </span>
      </motion.div>
    </section>
  );
}
