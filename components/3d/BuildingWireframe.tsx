'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

const COLOR_PRIMARY = '#fafaf7';
const COLOR_ACCENT = '#f59e0b';
const COLOR_DIM = '#8a8a92';

interface EdgeDef {
  a: [number, number, number];
  b: [number, number, number];
  color: string;
  width: number;
  delay: number;
}

function buildEdges(): EdgeDef[] {
  const W = 3;
  const D = 2.4;
  const FH = 1.1;
  const FLOORS = 3;
  const TOTAL_H = FH * FLOORS;

  const edges: EdgeDef[] = [];

  const corners: [number, number][] = [
    [-W / 2, -D / 2],
    [W / 2, -D / 2],
    [W / 2, D / 2],
    [-W / 2, D / 2],
  ];

  // floor outlines
  for (let f = 0; f <= FLOORS; f++) {
    const y = f * FH;
    for (let i = 0; i < 4; i++) {
      const A = corners[i];
      const B = corners[(i + 1) % 4];
      edges.push({
        a: [A[0], y, A[1]],
        b: [B[0], y, B[1]],
        color: f === 0 || f === FLOORS ? COLOR_PRIMARY : COLOR_DIM,
        width: 1.3,
        delay: (y / TOTAL_H) * 0.45,
      });
    }
  }

  // vertical corner posts
  corners.forEach(([x, z]) => {
    edges.push({
      a: [x, 0, z],
      b: [x, TOTAL_H, z],
      color: COLOR_PRIMARY,
      width: 1.5,
      delay: 0.08,
    });
  });

  // windows: front, back, left, right
  const WIN_W = 0.55;
  const WIN_H = 0.6;
  const WIN_Y_OFF = 0.28;
  const WIN_PER_FLOOR = 3;
  const winX = (i: number) => {
    const margin = 0.45;
    const usable = W - margin * 2;
    const step = usable / (WIN_PER_FLOOR - 1);
    return -W / 2 + margin + step * i;
  };

  for (let f = 0; f < FLOORS; f++) {
    const yBase = f * FH + WIN_Y_OFF;
    const delay = (yBase / TOTAL_H) * 0.45 + 0.05;
    for (let i = 0; i < WIN_PER_FLOOR; i++) {
      const x = winX(i);
      [-D / 2, D / 2].forEach((z) => {
        const A: [number, number, number] = [x - WIN_W / 2, yBase, z];
        const B: [number, number, number] = [x + WIN_W / 2, yBase, z];
        const C: [number, number, number] = [x + WIN_W / 2, yBase + WIN_H, z];
        const D2: [number, number, number] = [x - WIN_W / 2, yBase + WIN_H, z];
        edges.push({ a: A, b: B, color: COLOR_ACCENT, width: 1.1, delay });
        edges.push({ a: B, b: C, color: COLOR_ACCENT, width: 1.1, delay });
        edges.push({ a: C, b: D2, color: COLOR_ACCENT, width: 1.1, delay });
        edges.push({ a: D2, b: A, color: COLOR_ACCENT, width: 1.1, delay });
      });
    }
    for (let i = 0; i < 2; i++) {
      const sideZ = -D / 2 + 0.45 + i * (D - 0.9);
      [-W / 2, W / 2].forEach((x) => {
        const A: [number, number, number] = [x, yBase, sideZ - WIN_W / 2];
        const B: [number, number, number] = [x, yBase, sideZ + WIN_W / 2];
        const C: [number, number, number] = [x, yBase + WIN_H, sideZ + WIN_W / 2];
        const D2: [number, number, number] = [x, yBase + WIN_H, sideZ - WIN_W / 2];
        edges.push({ a: A, b: B, color: COLOR_ACCENT, width: 1.1, delay });
        edges.push({ a: B, b: C, color: COLOR_ACCENT, width: 1.1, delay });
        edges.push({ a: C, b: D2, color: COLOR_ACCENT, width: 1.1, delay });
        edges.push({ a: D2, b: A, color: COLOR_ACCENT, width: 1.1, delay });
      });
    }
  }

  // roof diagonals
  edges.push({
    a: [-W / 2, TOTAL_H, -D / 2],
    b: [W / 2, TOTAL_H, D / 2],
    color: COLOR_DIM,
    width: 1,
    delay: 0.62,
  });
  edges.push({
    a: [W / 2, TOTAL_H, -D / 2],
    b: [-W / 2, TOTAL_H, D / 2],
    color: COLOR_DIM,
    width: 1,
    delay: 0.64,
  });

  // ground reference cross
  const G = 4;
  edges.push({
    a: [-G, 0, 0],
    b: [G, 0, 0],
    color: COLOR_DIM,
    width: 0.7,
    delay: 0,
  });
  edges.push({
    a: [0, 0, -G],
    b: [0, 0, G],
    color: COLOR_DIM,
    width: 0.7,
    delay: 0,
  });

  return edges;
}

/**
 * One edge that animates from a→head over time, controlled by its own
 * useFrame so the parent never re-renders.
 */
function AnimatedEdge({
  a,
  b,
  color,
  width,
  delay,
  startRef,
  revealMs,
}: EdgeDef & { startRef: React.MutableRefObject<number | null>; revealMs: number }) {
  const ref = useRef<{ setPoints: (pts: THREE.Vector3[]) => void }>(null);
  const A = useMemo(() => new THREE.Vector3(...a), [a]);
  const B = useMemo(() => new THREE.Vector3(...b), [b]);
  const head = useMemo(() => new THREE.Vector3(), []);
  const lineRef = useRef<THREE.Line>(null!);

  useFrame(({ clock }) => {
    if (startRef.current === null) startRef.current = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - startRef.current;
    const t = THREE.MathUtils.clamp(elapsed / (revealMs / 1000), 0, 1);
    const SPAN = 0.5;
    const local = THREE.MathUtils.clamp((t - delay) / SPAN, 0, 1);

    if (lineRef.current) {
      head.lerpVectors(A, B, local);
      const geom = lineRef.current.geometry as THREE.BufferGeometry;
      const pos = geom.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, A.x, A.y, A.z);
      pos.setXYZ(1, head.x, head.y, head.z);
      pos.needsUpdate = true;
      geom.computeBoundingSphere();
      lineRef.current.visible = local > 0;
    }
  });

  return (
    <Line
      ref={lineRef as unknown as React.Ref<never>}
      points={[A, B]}
      color={color}
      lineWidth={width}
      transparent
      opacity={0.92}
    />
  );
}

function BuildingMesh({
  revealMs,
  mouseRef,
}: {
  revealMs: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null!);
  const startRef = useRef<number | null>(null);
  const edges = useMemo(() => buildEdges(), []);

  useFrame(({ camera }) => {
    if (group.current) group.current.rotation.y += 0.0025;
    const targetX = 3.5 + mouseRef.current.x * 1.0;
    const targetY = 2.2 + mouseRef.current.y * 0.6;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 1.4, 0);
  });

  return (
    <group ref={group} position={[0, -1.4, 0]}>
      {edges.map((e, i) => (
        <AnimatedEdge key={i} {...e} startRef={startRef} revealMs={revealMs} />
      ))}
    </group>
  );
}

interface Props {
  revealMs?: number;
  interactive?: boolean;
  className?: string;
}

export default function BuildingWireframe({ revealMs = 3000, interactive = true, className }: Props) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div onMouseMove={handleMove} className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <OrthographicCamera makeDefault position={[3.5, 2.2, 4.5]} zoom={110} />
        <ambientLight intensity={0.7} />
        <Suspense fallback={null}>
          <BuildingMesh revealMs={revealMs} mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
