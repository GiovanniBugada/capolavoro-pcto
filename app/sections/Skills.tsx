'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ease } from '@/lib/animations';
import { Sparkles, Users, MessageSquare, Clock, Puzzle } from 'lucide-react';
import Counter from '@/components/ui/Counter';

const HARD = [
  { label: 'AutoCAD', value: 75 },
  { label: 'Lettura mappe catastali', value: 65 },
  { label: 'Rilievi sul campo', value: 55 },
  { label: 'Gestione documentale', value: 80 },
  { label: 'Pratiche edilizie (cenni)', value: 45 },
];

const SOFT = [
  { icon: Sparkles, title: 'Adattabilità', desc: 'Lavorare su attività non previste' },
  { icon: Users, title: 'Team eterogeneo', desc: 'Collaborare con figure non informatiche' },
  { icon: MessageSquare, title: 'Rapporto cliente', desc: 'Capire chi non parla la mia lingua' },
  { icon: Clock, title: 'Gestione tempo', desc: 'Rispettare scadenze reali' },
  { icon: Puzzle, title: 'Problem solving', desc: 'Trovare soluzioni dove il manuale non basta' },
];

function Bar({ label, value, idx }: { label: string; value: number; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <div ref={ref} className="border-t border-cream/15 pt-5 pb-2">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-cream text-[14px] md:text-[15px] font-medium">{label}</span>
        <span className="font-mono text-amber text-[13px] tabular-nums">
          <Counter to={value} duration={1.4} suffix="%" />
        </span>
      </div>
      <div className="h-[2px] bg-cream/10 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: idx * 0.08, ease: ease.out }}
          style={{ width: `${value}%`, transformOrigin: 'left' }}
          className="h-full bg-amber"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      data-slide
      id="skills"
      className="relative min-h-screen w-full bg-ink text-cream py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono-eyebrow text-amber mb-6"
        >
          §05 · SINTESI E RIFLESSIONE
        </motion.p>

        <h2
          className="font-sans font-black tracking-tightest leading-[0.92] mb-20 max-w-5xl"
          style={{ fontSize: 'clamp(2rem, 5.4vw, 5.6rem)' }}
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: ease.out }}
              className="inline-block"
            >
              Cosa <em className="font-serif italic font-normal text-amber">porto via</em>.
            </motion.span>
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          {/* Hard skills */}
          <div className="lg:col-span-6">
            <p className="font-mono-eyebrow mb-8 text-cream/70">HARD SKILLS · LIVELLO ATTUALE</p>
            <div>
              {HARD.map((h, i) => (
                <Bar key={h.label} label={h.label} value={h.value} idx={i} />
              ))}
            </div>
          </div>

          {/* Soft skills */}
          <div className="lg:col-span-6">
            <p className="font-mono-eyebrow mb-8 text-cream/70">SOFT SKILLS · CINQUE LEZIONI</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {SOFT.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: ease.out }}
                    className="bg-cream/[0.04] border border-cream/10 hover:border-amber/40 p-5 md:p-6 transition-colors"
                    data-cursor="hover"
                  >
                    <Icon className="w-6 h-6 text-amber mb-4" strokeWidth={1.5} />
                    <h4 className="text-cream text-[16px] font-bold tracking-tightish mb-1">{s.title}</h4>
                    <p className="text-cream/60 text-[13px] leading-snug">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
