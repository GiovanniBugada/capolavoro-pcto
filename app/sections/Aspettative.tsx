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
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: ease.out }}
      className={`flex items-start gap-4 text-[16px] md:text-[18px] leading-snug ${dark ? 'text-cream/85' : 'text-ink'}`}
    >
      <span className={`mt-2 inline-block h-px w-8 shrink-0 ${dark ? 'bg-amber' : 'bg-ink'}`} />
      <span>{text}</span>
    </motion.li>
  );
}

export default function Aspettative() {
  return (
    <section
      data-slide
      id="aspettative"
      className="relative min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
    >
      {/* LEFT — aspettavo */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: ease.inOut }}
        className="bg-cream px-6 md:px-16 py-24 md:py-32 flex flex-col justify-center"
      >
        <p className="font-mono-eyebrow text-muted mb-6">§02 · MI ASPETTAVO</p>
        <h3
          className="font-sans font-black tracking-tightest leading-[0.95] text-ink mb-12"
          style={{ fontSize: 'clamp(2rem, 4.8vw, 4.6rem)' }}
        >
          Solo<br />
          <em className="font-serif italic font-normal">informatica.</em>
        </h3>
        <ul className="space-y-5 max-w-md">
          {EXPECTED.map((t, i) => (
            <Bullet key={t} text={t} delay={0.5 + i * 0.1} />
          ))}
        </ul>
        <div className="mt-12 h-px w-20 bg-line" />
        <p className="mt-6 text-muted text-[13px] font-mono">PRIMA DELLO STAGE</p>
      </motion.div>

      {/* RIGHT — ho trovato */}
      <motion.div
        initial={{ x: '100%' }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: ease.inOut }}
        className="relative bg-ink px-6 md:px-16 py-24 md:py-32 flex flex-col justify-center"
      >
        <p className="font-mono-eyebrow text-amber mb-6">§02 · HO TROVATO</p>
        <h3
          className="font-sans font-black tracking-tightest leading-[0.95] text-cream mb-12"
          style={{ fontSize: 'clamp(2rem, 4.8vw, 4.6rem)' }}
        >
          Informatica
          <br />
          <span className="text-cream/60">+</span>{' '}
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.8, ease: ease.spring }}
            className="inline-block text-amber font-serif italic font-normal"
          >
            tecnica.
          </motion.span>
        </h3>
        <ul className="space-y-5 max-w-md">
          {FOUND.map((t, i) => (
            <Bullet key={t} text={t} delay={0.7 + i * 0.1} dark />
          ))}
        </ul>
        <div className="mt-12 h-px w-20 bg-amber" />
        <p className="mt-6 text-cream/60 text-[13px] font-mono">DOPO LO STAGE</p>

        {/* big serif marker */}
        <span
          className="absolute top-12 right-10 font-serif italic text-amber/30 leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(8rem, 16vw, 16rem)' }}
          aria-hidden
        >
          &amp;
        </span>
      </motion.div>
    </section>
  );
}
