'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ease } from '@/lib/animations';

const DeskScene = dynamic(() => import('@/components/3d/DeskScene'), { ssr: false });

export default function StudioGrassi() {
  return (
    <section
      data-slide
      id="studio"
      className="relative min-h-screen w-full bg-ink text-cream py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ease.out }}
            className="font-mono-eyebrow text-amber mb-6"
          >
            §01 · IL CONTESTO
          </motion.p>

          <h2
            className="font-sans font-black tracking-tightest leading-[0.92] mb-10"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)' }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: ease.out }}
                className="inline-block"
              >
                Lo Studio
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
                <em className="font-serif italic font-normal text-amber">Grassi</em>.
              </motion.span>
            </span>
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
            className="space-y-6 text-cream/80 text-[15px] md:text-[17px] leading-relaxed max-w-xl"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
              }}
            >
              Lo studio è guidato dal <span className="text-cream font-medium">Geom. Sergio Grassi</span> e opera nel
              settore tecnico-edilizio: rilievi sul campo, redazione di pratiche catastali, planimetrie,
              progettazione edilizia, accatastamenti e pratiche di aggiornamento per privati e imprese.
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
              }}
            >
              È un contesto in cui convivono competenze tradizionali del geometra e strumenti digitali —
              CAD, archivi telematici, software dedicati. <em className="font-serif italic text-amber/90">Il luogo ideale per
              innestare un percorso informatico su un terreno tecnico più ampio.</em>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 flex items-center gap-4"
          >
            <span className="block h-px w-12 bg-amber" />
            <span className="font-mono-eyebrow text-cream/60">GAZZANIGA · BERGAMO · ITALIA</span>
          </motion.div>
        </div>

        <div className="relative aspect-[4/3] w-full">
          <DeskScene className="" />
        </div>
      </div>
    </section>
  );
}
