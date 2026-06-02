'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ease } from '@/lib/animations';

const DeskScene = dynamic(() => import('@/components/3d/DeskScene'), { ssr: false });

const SECTORS = [
  { k: 'Catasto', v: 'Accatastamenti, variazioni, volture, DOCFA, PREGEO.' },
  { k: 'Edilizia', v: 'CILA, SCIA, permessi di costruire, supporto al progetto.' },
  { k: 'Rilievi', v: 'Misurazioni sul campo, fotogrammetria, restituzione CAD.' },
  { k: 'Disegno tecnico', v: 'Planimetrie, mappali, sezioni, particolari, tavole esecutive.' },
];

export default function StudioGrassi() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      data-slide
      data-section-theme="dark"
      id="studio"
      className="relative w-full bg-ink text-cream py-12 md:py-16 px-6 md:px-12 overflow-hidden"
    >

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ease.out }}
          className="flex items-baseline gap-3 mb-8"
        >
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§01</span>
          <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/60">Il contesto</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="lg:col-span-6">
            <h2
              className="font-sans font-black tracking-tightest leading-[0.92] mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4.2vw, 4.2rem)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: ease.out }}
                className="block"
              >
                Lo Studio
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
                className="block"
              >
                <em className="font-serif italic font-normal text-amber">Grassi</em>.
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.3, ease: ease.out }}
              className="text-cream/85 text-[16px] md:text-[17px] leading-relaxed max-w-xl mb-7"
            >
              Studio tecnico-edilizio guidato dal{' '}
              <span className="text-cream font-medium">Geom. Sergio Grassi</span> a Gazzaniga, in
              Valle Seriana. Lavora su rilievi, pratiche catastali ed edilizie per privati e imprese
              del territorio.
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } } }}
              className="space-y-2.5 max-w-xl mb-6"
            >
              {[
                ['Tecnico', 'progetta, misura, disegna'],
                ['Consulente', 'guida il cliente nelle pratiche'],
                ['Traduttore digitale', 'parla con comune e Agenzia delle Entrate'],
              ].map(([k, v]) => (
                <motion.li
                  key={k}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease.out } },
                  }}
                  className="flex items-baseline gap-4 text-cream/80 text-[14px] md:text-[15px]"
                >
                  <span className="text-amber font-mono text-[12px] shrink-0">→</span>
                  <span>
                    <span className="text-cream font-medium">{k}</span>{' '}
                    <span className="text-cream/55">— {v}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.9, ease: ease.out }}
              className="border-l-2 border-amber pl-4 max-w-xl text-cream text-[15px] md:text-[16px] leading-snug font-serif italic"
            >
              Il luogo ideale per innestare un percorso informatico su un terreno tecnico più ampio.
            </motion.p>

            <motion.dl
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.8 } } }}
              className="grid grid-cols-3 gap-6 mt-10 max-w-xl border-t border-cream/15 pt-6"
            >
              {[
                ['LUOGO', 'Gazzaniga (BG)'],
                ['SETTORE', 'Tecnico-edilizio'],
                ['DURATA', '60 ore PCTO'],
              ].map(([k, v]) => (
                <motion.div
                  key={k}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
                  }}
                >
                  <dt className="font-mono uppercase tracking-widest-mono text-[10px] text-amber mb-1.5">
                    {k}
                  </dt>
                  <dd className="text-cream text-[14px] font-medium">{v}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: ease.out }}
            className="lg:col-span-6 relative aspect-[4/3] w-full"
          >
            <DeskScene />
          </motion.div>
        </div>

        {/* 4 SECTORS — what a studio like Grassi actually does day-to-day */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: ease.out }}
          className="mt-14 md:mt-20 pt-10 border-t border-cream/15"
        >
          <div className="mb-8">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/55">
              I quattro settori
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: ease.out }}
                className="group border-t border-cream/20 pt-4"
              >
                <h4 className="font-sans font-bold text-cream tracking-tightish text-[17px] md:text-[18px] mb-2 group-hover:text-amber transition-colors">
                  {s.k}
                </h4>
                <p className="text-cream/65 text-[13px] leading-snug">{s.v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
