'use client';

import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';
import { charReveal, ease } from '@/lib/animations';

interface Props {
  text: string;
  className?: string;
  splitBy?: 'char' | 'word';
  stagger?: number;
  delay?: number;
  triggerOnce?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export default function SplitText({
  text,
  className = '',
  splitBy = 'word',
  stagger = 0.05,
  delay = 0,
  triggerOnce = true,
  as = 'span',
}: Props) {
  const Tag = motion[as];
  const tokens = useMemo(() => {
    if (splitBy === 'char') return Array.from(text);
    return text.split(/(\s+)/);
  }, [text, splitBy]);

  const parent: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  const child: Variants =
    splitBy === 'char'
      ? charReveal
      : {
          hidden: { y: '60%', opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: ease.out },
          },
        };

  return (
    <Tag
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, amount: 0.4 }}
      className={className}
      aria-label={text}
    >
      {tokens.map((tok, i) => {
        const isSpace = /^\s+$/.test(tok);
        if (isSpace) return <span key={i}>{tok}</span>;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ lineHeight: 'inherit' }}
            aria-hidden
          >
            <motion.span variants={child} className="inline-block">
              {tok}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
