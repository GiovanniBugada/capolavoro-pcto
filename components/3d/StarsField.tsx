'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarsProps {
  count?: number;
  spread?: number;
}

function Stars({ count = 320, spread = 14 }: StarsProps) {
  const points = useRef<THREE.Points>(null!);

  const { positions, baseSize, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz: number[] = [];
    const ph: number[] = [];
    for (let i = 0; i < count; i++) {
      const r = spread * (0.4 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5 + 1;
      pos[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 4;
      sz.push(0.04 + Math.random() * 0.08);
      ph.push(Math.random() * Math.PI * 2);
    }
    return { positions: pos, baseSize: sz, phases: ph };
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    points.current.rotation.y = t * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#fff7e6"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Mountains({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const layer1 = useRef<THREE.Group>(null!);
  const layer2 = useRef<THREE.Group>(null!);
  const layer3 = useRef<THREE.Group>(null!);

  useFrame(() => {
    const mx = mouseRef.current.x;
    if (layer1.current) layer1.current.position.x = mx * 0.15;
    if (layer2.current) layer2.current.position.x = mx * 0.3;
    if (layer3.current) layer3.current.position.x = mx * 0.5;
  });

  const tri = (w: number, h: number, x: number) => {
    const g = new THREE.BufferGeometry();
    const verts = new Float32Array([
      x - w / 2, -2.5, 0,
      x + w / 2, -2.5, 0,
      x, -2.5 + h, 0,
    ]);
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    return g;
  };

  return (
    <>
      <group ref={layer1} position={[0, 0, -5]}>
        {[-9, -5, -1, 3, 7, 11].map((x, i) => (
          <mesh key={i} geometry={tri(4 + (i % 3) * 0.5, 1.6 + ((i * 0.3) % 1.2), x)}>
            <meshBasicMaterial color="#1a1a1d" />
          </mesh>
        ))}
      </group>
      <group ref={layer2} position={[0, -0.1, -3.5]}>
        {[-7, -3, 1, 5, 9].map((x, i) => (
          <mesh key={i} geometry={tri(5 + (i % 2) * 0.5, 2 + (i % 2) * 0.4, x)}>
            <meshBasicMaterial color="#0e0e10" />
          </mesh>
        ))}
      </group>
      <group ref={layer3} position={[0, -0.3, -2]}>
        {[-6, -1, 4].map((x, i) => (
          <mesh key={i} geometry={tri(7, 2.8, x)}>
            <meshBasicMaterial color="#000000" />
          </mesh>
        ))}
      </group>
    </>
  );
}

interface Props {
  className?: string;
  showMountains?: boolean;
}

export default function StarsField({ className = '', showMountains = true }: Props) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  return (
    <div onMouseMove={handleMove} className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 0], fov: 70 }}
        style={{ background: '#0a0a0a' }}
      >
        <Suspense fallback={null}>
          <Stars />
          {showMountains && <Mountains mouseRef={mouseRef} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
