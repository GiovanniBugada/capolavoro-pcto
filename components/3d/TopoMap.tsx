'use client';

import { motion } from 'framer-motion';

/**
 * Topographic survey map: contour lines + 5 measurement points P.1–P.5
 * connected progressively by a triangulation laser. A compass with an
 * oscillating needle sits in the top-right corner.
 */
export default function TopoMap({ className = '' }: { className?: string }) {
  const points = [
    { id: 'P.1', x: 220, y: 180 },
    { id: 'P.2', x: 540, y: 230 },
    { id: 'P.3', x: 700, y: 420 },
    { id: 'P.4', x: 380, y: 520 },
    { id: 'P.5', x: 140, y: 380 },
  ];

  // pairs that form the triangulation chain
  const pairs: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 3],
  ];

  return (
    <svg
      viewBox="0 0 900 700"
      className={className}
      style={{ width: '100%', height: '100%' }}
      role="img"
      aria-label="Mappa topografica con punti di rilievo P.1 fino a P.5 e linee di triangolazione"
    >
      {/* background tone */}
      <rect width="900" height="700" fill="#fafaf7" />

      {/* contour lines (concentric, slightly off-circle for organic feel) */}
      <g fill="none" stroke="#0a0a0a">
        {Array.from({ length: 7 }, (_, i) => {
          const r = 90 + i * 55;
          const cx = 420;
          const cy = 330;
          // slightly elongated, with a "ridge" deformation
          const path = `
            M ${cx - r},${cy}
            C ${cx - r},${cy - r * 0.95} ${cx - r * 0.6},${cy - r * 1.05} ${cx},${cy - r * 0.9}
            C ${cx + r * 0.7},${cy - r * 0.75} ${cx + r * 1.05},${cy - r * 0.3} ${cx + r * 0.95},${cy + r * 0.1}
            C ${cx + r * 0.85},${cy + r * 0.6} ${cx + r * 0.5},${cy + r * 0.95} ${cx - r * 0.1},${cy + r * 0.9}
            C ${cx - r * 0.7},${cy + r * 0.85} ${cx - r * 1.05},${cy + r * 0.5} ${cx - r},${cy}
            Z
          `;
          return (
            <motion.path
              key={i}
              d={path}
              strokeWidth={1 + (i % 2 === 0 ? 0.2 : 0)}
              strokeOpacity={0.18 + (i / 7) * 0.18}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </g>

      {/* peak marker */}
      <g transform="translate(420, 330)">
        <motion.g
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#f59e0b" strokeWidth="2" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#f59e0b" strokeWidth="2" />
        </motion.g>
        <text x="20" y="6" fontSize="11" fontFamily="monospace" fill="#71717a" letterSpacing="0.1em">
          q. 458
        </text>
      </g>

      {/* triangulation lines, drawn AFTER contours */}
      <g stroke="#f59e0b" strokeWidth="1" fill="none">
        {pairs.map(([a, b], i) => {
          const p1 = points[a];
          const p2 = points[b];
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, delay: 1.4 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              strokeDasharray="4 4"
            />
          );
        })}
      </g>

      {/* points P.1-P.5 */}
      <g>
        {points.map((p, i) => (
          <motion.g
            key={p.id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <circle cx={p.x} cy={p.y} r="14" fill="#fafaf7" stroke="#0a0a0a" strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r="5" fill="#f59e0b" />
            <text
              x={p.x + 22}
              y={p.y + 5}
              fontSize="12"
              fontFamily="monospace"
              fill="#0a0a0a"
              fontWeight="600"
              letterSpacing="0.05em"
            >
              {p.id}
            </text>
          </motion.g>
        ))}
      </g>

      {/* compass top right */}
      <g transform="translate(770, 110)">
        <circle cx="0" cy="0" r="55" fill="#fafaf7" stroke="#0a0a0a" strokeWidth="1" />
        <circle cx="0" cy="0" r="40" fill="none" stroke="#71717a" strokeWidth="0.4" strokeDasharray="2 4" />
        {/* tick marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = Math.cos(a) * 48;
          const y1 = Math.sin(a) * 48;
          const x2 = Math.cos(a) * 55;
          const y2 = Math.sin(a) * 55;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0a0a0a" strokeWidth={i % 3 === 0 ? 1.2 : 0.6} />;
        })}
        {/* needle */}
        <motion.g
          animate={{ rotate: [-4, 4, -2, 2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polygon points="0,-44 4,0 0,44 -4,0" fill="#f59e0b" />
          <polygon points="0,-44 4,0 -4,0" fill="#f43f5e" />
          <circle cx="0" cy="0" r="3" fill="#0a0a0a" />
        </motion.g>
        <text x="0" y="-62" fontSize="11" fontFamily="monospace" fill="#0a0a0a" textAnchor="middle" fontWeight="600">
          N
        </text>
      </g>

      {/* legend bottom-left */}
      <g transform="translate(40, 640)" fontFamily="monospace" fontSize="10" fill="#71717a" letterSpacing="0.1em">
        <text x="0" y="0">SCALA 1:500 · UTM 32N</text>
        <text x="0" y="20" fill="#0a0a0a" fontWeight="600">RILIEVO TIPO</text>
      </g>
    </svg>
  );
}
