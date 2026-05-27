'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 220, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 220, mass: 0.4 });

  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const enter = () => setHover(true);
    const leave = () => setHover(false);

    window.addEventListener('mousemove', move, { passive: true });

    const interactive = 'a, button, [data-cursor="hover"], input, textarea, [role="button"]';
    const els = document.querySelectorAll(interactive);
    els.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    const obs = new MutationObserver(() => {
      const fresh = document.querySelectorAll(interactive);
      fresh.forEach((el) => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      obs.disconnect();
    };
  }, [x, y, visible]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#fafaf7',
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          borderColor: '#fafaf7',
          borderWidth: 1,
          borderRadius: '50%',
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
