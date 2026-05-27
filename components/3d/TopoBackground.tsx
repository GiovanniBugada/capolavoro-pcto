'use client';

import { useMemo, useRef } from 'react';

interface Props {
  className?: string;
  stroke?: string;
  density?: number;
}

let counter = 0;
function nextId() {
  counter += 1;
  return `topo${counter}`;
}

/**
 * Topographic contour-line background. SVG paths that morph between 3 states
 * over 25s — anchored to terrain feel (curve di livello), not generic blobs.
 */
export default function TopoBackground({
  className = '',
  stroke = '#0a0a0a',
  density = 9,
}: Props) {
  const idRef = useRef<string | null>(null);
  if (idRef.current === null) idRef.current = nextId();
  const id = idRef.current;

  // Generate `density` nested contour paths. Each is a closed cubic-bezier
  // ellipsoid path that morphs slightly between 3 keyframes.
  const paths = useMemo(() => {
    const W = 1600;
    const H = 1000;
    const cx = W * 0.62;
    const cy = H * 0.42;

    const buildPath = (i: number, variant: number) => {
      const t = i / density;
      const baseRx = 80 + t * 720;
      const baseRy = 60 + t * 520;
      // jitter per variant: gives each keyframe a different organic shape
      const seed = (n: number) =>
        Math.sin(n * 13.37 + variant * 2.71 + i * 0.91) * 0.5 + 0.5;

      const jitterRx = baseRx * (1 + (seed(1) - 0.5) * 0.18);
      const jitterRy = baseRy * (1 + (seed(2) - 0.5) * 0.22);

      // 8 control points around the ellipse, jittered for realism
      const N = 8;
      const pts: { x: number; y: number }[] = [];
      for (let k = 0; k < N; k++) {
        const a = (k / N) * Math.PI * 2;
        const noise = (seed(3 + k) - 0.5) * 0.15;
        const rx = jitterRx * (1 + noise);
        const ry = jitterRy * (1 + noise);
        pts.push({
          x: cx + Math.cos(a) * rx,
          y: cy + Math.sin(a) * ry,
        });
      }
      // smooth closed cubic spline
      let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} `;
      for (let k = 0; k < N; k++) {
        const p0 = pts[(k - 1 + N) % N];
        const p1 = pts[k];
        const p2 = pts[(k + 1) % N];
        const p3 = pts[(k + 2) % N];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
      }
      d += 'Z';
      return d;
    };

    return Array.from({ length: density }, (_, i) => ({
      i,
      variants: [buildPath(i, 0), buildPath(i, 1), buildPath(i, 2)],
      opacity: 0.18 + (i / density) * 0.32,
      strokeWidth: 1.1 + (i / density) * 0.5,
    }));
  }, [density]);

  return (
    <svg
      className={className}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <radialGradient id={`fade-${id}`} cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.45" />
        </radialGradient>
        <mask id={`m-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1000">
          <rect width="1600" height="1000" fill={`url(#fade-${id})`} />
        </mask>
      </defs>
      <g mask={`url(#m-${id})`}>
        {paths.map((p) => (
          <path
            key={p.i}
            fill="none"
            stroke={stroke}
            strokeWidth={p.strokeWidth}
            strokeOpacity={p.opacity}
            d={p.variants[0]}
          >
            <animate
              attributeName="d"
              dur="25s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
              keyTimes="0; 0.33; 0.66; 1"
              values={`${p.variants[0]};${p.variants[1]};${p.variants[2]};${p.variants[0]}`}
            />
          </path>
        ))}
        {/* a few highlight peaks: small "x" markers like trig points */}
        <g stroke={stroke} strokeOpacity="0.35" strokeWidth="1">
          <line x1="980" y1="410" x2="996" y2="426" />
          <line x1="996" y1="410" x2="980" y2="426" />
          <line x1="700" y1="520" x2="716" y2="536" />
          <line x1="716" y1="520" x2="700" y2="536" />
          <line x1="1200" y1="320" x2="1216" y2="336" />
          <line x1="1216" y1="320" x2="1200" y2="336" />
        </g>
      </g>
    </svg>
  );
}
