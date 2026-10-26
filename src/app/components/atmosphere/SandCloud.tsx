'use client';

import { useEffect, useRef } from 'react';

/**
 * The sand haze raised by cavalry: a sand-tinted turbulence band (styled in
 * globals.css) plus a canvas of dust motes.
 *
 * Performance contract:
 *  - the canvas runs at a hard 30fps cap;
 *  - it stops entirely when the section is off-screen (IntersectionObserver)
 *    or the tab is hidden (visibilitychange);
 *  - under `prefers-reduced-motion` the canvas never starts (the CSS band is
 *    also frozen by the reduced-motion block in globals.css).
 */
export default function SandCloud({ motes = 90, className = '' }: { motes?: number; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const count = Math.min(Math.max(motes, 60), 120);
    let width = 0;
    let height = 0;
    let frame = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const motes_ = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1,
      vx: 0.02 + Math.random() * 0.08,
      vy: -(0.004 + Math.random() * 0.02),
      a: 0.15 + Math.random() * 0.5,
    }));

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const scale = dpr();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(201, 168, 119, 0.9)';
      for (const m of motes_) {
        ctx.globalAlpha = m.a;
        ctx.beginPath();
        ctx.arc(m.x * width, m.y * height, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const m of motes_) {
        m.x += m.vx * 0.0016;
        m.y += m.vy * 0.0016;
        if (m.x > 1.05) m.x = -0.05;
        if (m.y < -0.05) m.y = 1.05;
      }
      draw();
    };

    let raf = 0;
    let last = 0;
    let visible = false;
    const FRAME_MS = 1000 / 30;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      step();
    };

    const play = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    const pause = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const sync = () => {
      if (visible && document.visibilityState === 'visible') play();
      else pause();
    };

    resize();
    draw();

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { rootMargin: '120px 0px' },
    );
    io.observe(wrap);

    const onVisibility = () => sync();
    const onResize = () => {
      resize();
      draw();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    const onMotionChange = () => {
      if (reduce.matches) {
        pause();
        ctx.clearRect(0, 0, width, height);
      } else {
        sync();
      }
    };
    reduce.addEventListener('change', onMotionChange);

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      reduce.removeEventListener('change', onMotionChange);
    };
  }, [motes]);

  return (
    <div ref={wrapRef} className={`sand-cloud${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className="sand-cloud__band" />
      <canvas ref={canvasRef} />
    </div>
  );
}
