'use client';

import { motion } from 'framer-motion';
import { ease } from '@/lib/animations';

const EXPECTED = [
  'Supporto IT allo studio',
  'Gestione e backup dei file',
  'Manutenzione PC e rete locale',
  'Archiviazione digitale documenti',
];

const FOUND = [
  'Disegno tecnico con AutoCAD',
  'Rilievi sul campo con sonde da terra',
  'Redazione di planimetrie catastali',
  'Supporto informatico allo studio',
];

function Bullet({ text, dark, delay }: { text: string; dark?: boolean; delay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: dark ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: ease.out }}
      className={`flex items-start gap-4 text-[15px] md:text-[17px] leading-snug ${dark ? 'text-cream/85' : 'text-ink'}`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: ease.out }}
        className={`mt-2 inline-block h-px w-8 shrink-0 origin-left ${dark ? 'bg-amber' : 'bg-ink'}`}
      />
      <span>{text}</span>
    </motion.li>
  );
}

export default function Aspettative() {
  return (
    <section
      data-slide
      data-section-theme="light"
      id="aspettative"
      className="relative w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
    >
      {/* central glowing seam where the two halves meet */}
      <div
        aria-hidden
        className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(245,158,11,0.4) 20%, rgba(245,158,11,0.4) 80%, transparent)',
        }}
      />

      {/* LEFT half — light. Always visible at x:0 (no slide-in animation that
          could leave it off-screen if whileInView ever misfires). */}
      <div className="relative bg-cream px-6 md:px-14 py-12 md:py-16 flex flex-col justify-center overflow-hidden">
        <div className="relative">
          <div className="flex items-baseline gap-3 mb-8">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§02 · A</span>
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">Mi aspettavo</span>
          </div>

          <h3
            className="font-sans font-black tracking-tightest leading-[0.92] text-ink mb-6"
            style={{ fontSize: 'clamp(1.9rem, 4.4vw, 4.2rem)' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: ease.out }}
              className="block"
            >
              Solo
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
              className="block"
            >
              <em className="font-serif italic font-normal">informatica.</em>
            </motion.span>
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-ink/85 text-[15px] md:text-[16px] leading-relaxed max-w-md mb-6"
          >
            Mi presento il primo giorno con un&apos;idea precisa di cosa farò:{' '}
            <em className="font-serif italic">supporto IT</em>, le mie cose.
          </motion.p>

          <ul className="space-y-3.5 max-w-md">
            {EXPECTED.map((t, i) => (
              <Bullet key={t} text={t} delay={0.5 + i * 0.08} />
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="text-muted text-[13px] mt-7 max-w-md italic font-serif"
          >
            Ho aperto la porta convinto di sapere già la risposta.
          </motion.p>

          <div className="mt-8 flex items-center gap-4">
            <span className="block h-px w-20 bg-line" />
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-muted">
              Prima dello stage
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT half — dark. Always visible at x:0. */}
      <div className="relative bg-ink px-6 md:px-14 py-12 md:py-16 flex flex-col justify-center overflow-hidden">
        <div className="relative">
          <div className="flex items-baseline gap-3 mb-8">
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-amber/90">§02 · B</span>
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/60">Ho trovato</span>
          </div>

          <h3
            className="font-sans font-black tracking-tightest leading-[0.92] text-cream mb-6"
            style={{ fontSize: 'clamp(1.9rem, 4.4vw, 4.2rem)' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: ease.out }}
              className="block"
            >
              Informatica
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
              className="block"
            >
              <span className="text-cream/55">+</span>{' '}
              <em className="text-amber font-serif italic font-normal">tecnica.</em>
            </motion.span>
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-cream/85 text-[15px] md:text-[16px] leading-relaxed max-w-md mb-6"
          >
            Il Geom. Grassi mi mette davanti
            <span className="text-amber"> AutoCAD</span>, una pianta da rifare, un sopralluogo. Lo
            stage cambia direzione — e va meglio così.
          </motion.p>

          <ul className="space-y-3.5 max-w-md">
            {FOUND.map((t, i) => (
              <Bullet key={t} text={t} delay={0.7 + i * 0.08} dark />
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="text-cream/55 text-[13px] mt-7 max-w-md italic font-serif"
          >
            Ho chiuso la cartella convinto di averne imparate due.
          </motion.p>

          <div className="mt-8 flex items-center gap-4">
            <span className="block h-px w-20 bg-amber" />
            <span className="font-mono uppercase tracking-widest-mono text-[10px] text-cream/60">
              Dopo lo stage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
