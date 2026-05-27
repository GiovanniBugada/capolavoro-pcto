'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  className?: string;
  drawMs?: number;
  showDimensions?: boolean;
  showLabels?: boolean;
}

/**
 * Architectural floor plan that auto-draws itself stroke-by-stroke.
 * Walls first (stroke-dasharray + stroke-dashoffset animation), then amber
 * dimensions, then room labels. Theme = geometra/AutoCAD.
 */
export default function FloorPlanDraw({
  className = '',
  drawMs = 2500,
  showDimensions = true,
  showLabels = true,
}: Props) {
  // Coordinates of the apartment outline. Coordinate frame: 0..1000 x 0..700.
  const walls = useMemo(
    () => [
      // outer perimeter
      { d: 'M 80 80 L 920 80', len: 840 },
      { d: 'M 920 80 L 920 620', len: 540 },
      { d: 'M 920 620 L 80 620', len: 840 },
      { d: 'M 80 620 L 80 80', len: 540 },
      // internal walls: 4 rooms
      // vertical divider 1 (between soggiorno + cucina | camera + bagno)
      { d: 'M 540 80 L 540 380', len: 300 },
      { d: 'M 540 440 L 540 620', len: 180 },
      // horizontal divider top section (cucina/soggiorno split)
      { d: 'M 80 320 L 320 320', len: 240 },
      { d: 'M 380 320 L 540 320', len: 160 },
      // horizontal divider right (camera/bagno split)
      { d: 'M 540 400 L 760 400', len: 220 },
      { d: 'M 820 400 L 920 400', len: 100 },
      // door swings (arcs) — light
      { d: 'M 320 320 A 60 60 0 0 1 380 320', len: 95 },
      { d: 'M 760 400 A 60 60 0 0 1 820 400', len: 95 },
    ],
    []
  );

  const dimensions = useMemo(
    () => [
      // outer width tick
      { x1: 80, y1: 50, x2: 920, y2: 50, label: '8.40', lx: 500, ly: 40 },
      // outer height
      { x1: 50, y1: 80, x2: 50, y2: 620, label: '5.40', lx: 35, ly: 350, vert: true },
      // soggiorno width
      { x1: 80, y1: 650, x2: 540, y2: 650, label: '4.60', lx: 310, ly: 670 },
      // camera width
      { x1: 540, y1: 650, x2: 920, y2: 650, label: '3.80', lx: 730, ly: 670 },
    ],
    []
  );

  const labels = useMemo(
    () => [
      { text: 'SOGGIORNO', x: 310, y: 470 },
      { text: 'CUCINA', x: 310, y: 200 },
      { text: 'CAMERA', x: 730, y: 240 },
      { text: 'BAGNO', x: 730, y: 510 },
    ],
    []
  );

  const drawSec = drawMs / 1000;
  const perWall = drawSec / walls.length;

  return (
    <svg
      className={className}
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%' }}
    >
      {/* grid background (very subtle, AutoCAD vibe) */}
      <g stroke="#d4d4d8" strokeWidth="0.4" opacity="0.5">
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={700} />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 50} x2={1000} y2={i * 50} />
        ))}
      </g>

      {/* walls — animated stroke draw */}
      <g fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="square">
        {walls.map((w, i) => (
          <motion.path
            key={i}
            d={w.d}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: perWall * 1.4,
              delay: i * perWall * 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </g>

      {/* dimensions in amber — appear after walls */}
      {showDimensions && (
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: drawSec, duration: 0.6 }}
          stroke="#f59e0b"
          strokeWidth="1"
          fill="#f59e0b"
          fontFamily="var(--font-mono, monospace)"
          fontSize="12"
        >
          {dimensions.map((d, i) => (
            <g key={i}>
              <line x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} />
              {/* end ticks */}
              {d.vert ? (
                <>
                  <line x1={d.x1 - 6} y1={d.y1} x2={d.x1 + 6} y2={d.y1} />
                  <line x1={d.x2 - 6} y1={d.y2} x2={d.x2 + 6} y2={d.y2} />
                </>
              ) : (
                <>
                  <line x1={d.x1} y1={d.y1 - 6} x2={d.x1} y2={d.y1 + 6} />
                  <line x1={d.x2} y1={d.y2 - 6} x2={d.x2} y2={d.y2 + 6} />
                </>
              )}
              <text
                x={d.lx}
                y={d.ly}
                textAnchor="middle"
                stroke="none"
                transform={d.vert ? `rotate(-90 ${d.lx} ${d.ly})` : undefined}
              >
                {d.label}
              </text>
            </g>
          ))}
        </motion.g>
      )}

      {/* room labels — appear last */}
      {showLabels && (
        <g
          fontFamily="var(--font-mono, monospace)"
          fontSize="13"
          fill="#71717a"
          letterSpacing="0.2em"
        >
          {labels.map((l, i) => (
            <motion.text
              key={i}
              x={l.x}
              y={l.y}
              textAnchor="middle"
              initial={{ opacity: 0, y: l.y + 6 }}
              whileInView={{ opacity: 1, y: l.y }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: drawSec + 0.4 + i * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {l.text}
            </motion.text>
          ))}
        </g>
      )}

      {/* corner crosshair (CAD origin) */}
      <g stroke="#f59e0b" strokeWidth="1" opacity="0.7">
        <line x1={70} y1={80} x2={90} y2={80} />
        <line x1={80} y1={70} x2={80} y2={90} />
      </g>
    </svg>
  );
}
