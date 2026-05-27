'use client';

import { motion } from 'framer-motion';
import { ease } from '@/lib/animations';

/**
 * Isometric SVG of a geometra's desk: planimetria, square, ruler, pencil,
 * compass, mug. Each piece slides into place from outside the frame.
 */
export default function DeskScene({ className = '' }: { className?: string }) {
  const Item = ({
    delay,
    from,
    children,
  }: {
    delay: number;
    from: { x: number; y: number; rot?: number };
    children: React.ReactNode;
  }) => (
    <motion.g
      initial={{ x: from.x, y: from.y, rotate: from.rot ?? 0, opacity: 0 }}
      whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.0, delay, ease: ease.out }}
    >
      {children}
    </motion.g>
  );

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      {/* DESK TOP */}
      <Item delay={0.0} from={{ x: 0, y: 80 }}>
        <polygon points="100,260 700,260 760,500 40,500" fill="#1c1c1f" />
        <polygon points="100,260 700,260 760,500 40,500" fill="none" stroke="#3a3a40" strokeWidth="1" />
        {/* wood grain hint */}
        <line x1="120" y1="320" x2="680" y2="320" stroke="#2a2a2e" strokeWidth="1" />
        <line x1="120" y1="380" x2="680" y2="380" stroke="#2a2a2e" strokeWidth="1" />
        <line x1="120" y1="440" x2="680" y2="440" stroke="#2a2a2e" strokeWidth="1" />
      </Item>

      {/* PLAN PAPER — drops from above */}
      <Item delay={0.15} from={{ x: 0, y: -300, rot: -3 }}>
        <g transform="translate(200, 280) rotate(-4)">
          <rect width="400" height="200" fill="#fafaf7" />
          <rect width="400" height="200" fill="none" stroke="#9a9a9e" strokeWidth="1.5" />
          {/* plan grid */}
          <g stroke="#d4d4d8" strokeWidth="0.6">
            {Array.from({ length: 16 }, (_, i) => (
              <line key={`v${i}`} x1={i * 25} y1={0} x2={i * 25} y2={200} />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <line key={`h${i}`} x1={0} y1={i * 25} x2={400} y2={i * 25} />
            ))}
          </g>
          {/* plan walls */}
          <g fill="none" stroke="#0a0a0a" strokeWidth="2.5">
            <rect x="40" y="40" width="320" height="120" />
            <line x1="200" y1="40" x2="200" y2="100" />
            <line x1="200" y1="120" x2="200" y2="160" />
            <line x1="40" y1="100" x2="200" y2="100" />
          </g>
          {/* dim line */}
          <g stroke="#f59e0b" strokeWidth="1">
            <line x1="40" y1="25" x2="360" y2="25" />
            <line x1="40" y1="20" x2="40" y2="30" />
            <line x1="360" y1="20" x2="360" y2="30" />
          </g>
          <text x="200" y="18" fontSize="9" fontFamily="monospace" fill="#f59e0b" textAnchor="middle">
            8.40
          </text>
          {/* room labels */}
          <text x="120" y="80" fontSize="7" fontFamily="monospace" fill="#71717a" textAnchor="middle" letterSpacing="1">
            SOGG.
          </text>
          <text x="280" y="80" fontSize="7" fontFamily="monospace" fill="#71717a" textAnchor="middle" letterSpacing="1">
            CUCINA
          </text>
          <text x="120" y="140" fontSize="7" fontFamily="monospace" fill="#71717a" textAnchor="middle" letterSpacing="1">
            BAGNO
          </text>
          <text x="280" y="140" fontSize="7" fontFamily="monospace" fill="#71717a" textAnchor="middle" letterSpacing="1">
            CAMERA
          </text>
        </g>
      </Item>

      {/* SQUADRA — slides from left */}
      <Item delay={0.35} from={{ x: -400, y: 0, rot: -25 }}>
        <g transform="translate(120, 410) rotate(-14)">
          <polygon points="0,0 180,0 180,80" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <polygon points="0,0 180,0 180,80" fill="#f59e0b" fillOpacity="0.06" />
          <line x1="20" y1="6" x2="160" y2="6" stroke="#f59e0b" strokeWidth="0.5" />
          <line x1="160" y1="14" x2="170" y2="68" stroke="#f59e0b" strokeWidth="0.5" />
          {/* tick marks */}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={20 + i * 18} y1="0" x2={20 + i * 18} y2="-3" stroke="#f59e0b" strokeWidth="0.8" />
          ))}
        </g>
      </Item>

      {/* RULER — slides from right */}
      <Item delay={0.45} from={{ x: 400, y: 0, rot: 10 }}>
        <g transform="translate(440, 490) rotate(8)">
          <rect width="280" height="22" fill="#fafaf7" stroke="#0a0a0a" strokeWidth="1" />
          {Array.from({ length: 21 }, (_, i) => (
            <line key={i} x1={i * 14} y1={i % 5 === 0 ? 0 : 8} x2={i * 14} y2="22" stroke="#0a0a0a" strokeWidth="0.7" />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <text key={i} x={i * 70 + 2} y="6" fontSize="6" fontFamily="monospace" fill="#0a0a0a">
              {i * 10}
            </text>
          ))}
        </g>
      </Item>

      {/* PENCIL — rotates into place */}
      <Item delay={0.55} from={{ x: 0, y: -200, rot: 180 }}>
        <g transform="translate(550, 320) rotate(28)">
          <rect width="160" height="10" fill="#f59e0b" />
          <polygon points="160,0 180,5 160,10" fill="#0a0a0a" />
          <rect x="-15" y="0" width="15" height="10" fill="#f43f5e" />
          <line x1="20" y1="3" x2="150" y2="3" stroke="#c97a07" strokeWidth="0.6" />
          <line x1="20" y1="7" x2="150" y2="7" stroke="#c97a07" strokeWidth="0.6" />
        </g>
      </Item>

      {/* COMPASS */}
      <Item delay={0.65} from={{ x: -300, y: 200 }}>
        <g transform="translate(220, 470)">
          <line x1="0" y1="0" x2="-22" y2="60" stroke="#fafaf7" strokeWidth="2.5" />
          <line x1="0" y1="0" x2="22" y2="60" stroke="#fafaf7" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="4" fill="#f59e0b" />
          <line x1="-22" y1="60" x2="-26" y2="68" stroke="#0a0a0a" strokeWidth="1.5" />
          <line x1="22" y1="60" x2="26" y2="68" stroke="#0a0a0a" strokeWidth="1.5" />
        </g>
      </Item>

      {/* MUG */}
      <Item delay={0.75} from={{ x: 250, y: -150 }}>
        <g transform="translate(660, 380)">
          <ellipse cx="0" cy="0" rx="32" ry="10" fill="#0a0a0a" />
          <path d="M -32,0 L -32,60 Q -32,72 0,72 Q 32,72 32,60 L 32,0" fill="#1c1c1f" stroke="#3a3a40" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="32" ry="10" fill="none" stroke="#3a3a40" strokeWidth="1" />
          <ellipse cx="0" cy="-2" rx="22" ry="6" fill="#3a1f0a" />
          {/* handle */}
          <path d="M 32,15 Q 50,15 50,35 Q 50,55 32,55" fill="none" stroke="#3a3a40" strokeWidth="2" />
          {/* steam */}
          <motion.g
            animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M -8,-12 Q -4,-22 -8,-32 Q -4,-42 -8,-52" stroke="#fafaf7" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M 4,-12 Q 8,-22 4,-32 Q 8,-42 4,-52" stroke="#fafaf7" strokeWidth="1.5" fill="none" opacity="0.5" />
          </motion.g>
        </g>
      </Item>

      {/* desk lamp light pool — adds depth */}
      <radialGradient id="lampPool" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <ellipse cx="400" cy="380" rx="280" ry="160" fill="url(#lampPool)" />
    </svg>
  );
}
