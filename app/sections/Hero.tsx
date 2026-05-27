'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ease } from '@/lib/animations';

const BuildingWireframe = dynamic(() => import('@/components/3d/BuildingWireframe'), { ssr: false });
const TopoBackground = dynamic(() => import('@/components/3d/TopoBackground'), { ssr: false });

const TITLE_WORDS = [
  { text: "Dall'", italic: true, color: 'ink' },
  { text: 'informatica', italic: false, color: 'ink' },
  { text: 'al', italic: true, color: 'ink' },
  { text: 'territorio.', italic: false, color: 'amber' },
];

export default function Hero() {
  return (
    <section
      data-slide
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-cream"
    >
      {/* Topo background */}
      <div className="absolute inset-0 pointer-events-none">
        <TopoBackground stroke="#0a0a0a" density={11} />
      </div>

      {/* Building on the right */}
      <div className="absolute right-0 top-0 h-full w-1/2 md:w-[55%] pointer-events-none opacity-90">
        <BuildingWireframe revealMs={3800} interactive={false} />
      </div>

      {/* eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: ease.out }}
        className="font-mono-eyebrow absolute top-10 md:top-14 left-6 md:left-12 text-ink"
      >
        CAPOLAVORO · PCTO · ESAME DI STATO 2025–2026
      </motion.p>

      {/* hero title */}
      <div className="relative z-10 px-6 md:px-12 pt-[18vh] md:pt-[20vh] max-w-[1280px]">
        <h1
          className="font-sans font-black tracking-tightest leading-[0.86] text-ink"
          style={{ fontSize: 'clamp(3.2rem, 11vw, 11rem)' }}
          aria-label="Dall'informatica al territorio."
        >
          {TITLE_WORDS.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.18em]">
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.95,
                  delay: 0.7 + i * 0.12,
                  ease: ease.out,
                }}
                className={`inline-block ${w.italic ? 'font-serif italic font-normal' : ''} ${
                  w.color === 'amber' ? 'text-amber' : ''
                }`}
              >
                {w.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: ease.out }}
          className="mt-8 md:mt-10 max-w-xl text-ink/70 text-[15px] md:text-[17px] leading-relaxed font-sans"
        >
          Un percorso interdisciplinare fra <span className="italic font-serif text-ink">codice</span>,
          disegno tecnico e rilievo del territorio. Una storia di stage non andato come previsto —
          <span className="text-ink font-medium"> andato meglio</span>.
        </motion.p>
      </div>

      {/* footer grid */}
      <motion.footer
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 1.7, staggerChildren: 0.1 } },
        }}
        className="absolute bottom-10 md:bottom-12 left-6 right-6 md:left-12 md:right-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 z-10"
      >
        {[
          ['NOME', 'Giovanni Bugada / 5A INF'],
          ['ISTITUTO', 'ISISS Valle Seriana / Gazzaniga (BG)'],
          ['STAGE PCTO', 'Studio Geom. Sergio Grassi'],
          ['ANNO', 'A.S. 2025–2026'],
        ].map(([label, value]) => (
          <motion.div
            key={label}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
            }}
            className="flex flex-col"
          >
            <span className="font-mono-eyebrow text-muted">{label}</span>
            <span className="text-ink text-[13px] md:text-[14px] mt-1 font-medium">{value}</span>
          </motion.div>
        ))}
      </motion.footer>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-10 right-12 hidden lg:flex items-center gap-3 font-mono-eyebrow text-ink"
      >
        <span>SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-amber text-base"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
