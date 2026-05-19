"use client";

import { useEffect, useRef } from "react";

interface Particle {
  theta: number;
  phi: number;
  size: number;
  brightness: number;
  speed: number;
  glowing: boolean;
  twinkleOffset: number;
  twinkleSpeed: number;
}

export function NetworkGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const rotRef    = useRef(0);
  const timeRef   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 500;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      // Uniform sphere distribution (Marsaglia)
      theta:         2 * Math.PI * Math.random(),
      phi:           Math.acos(1 - 2 * Math.random()),
      size:          Math.random() < 0.07 ? 2.2 + Math.random() * 1.2 : Math.random() * 1.1 + 0.35,
      brightness:    Math.random() * 0.35 + 0.65,
      speed:         (Math.random() - 0.5) * 0.00045,
      glowing:       Math.random() < 0.12,
      twinkleOffset: Math.random() * Math.PI * 2,
      twinkleSpeed:  Math.random() * 0.04 + 0.01,
    }));

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.42;

      ctx.clearRect(0, 0, W, H);

      rotRef.current += 0.0014;
      timeRef.current += 1;
      const rot  = rotRef.current;
      const time = timeRef.current;

      // Project all particles
      const projected = particles.map((p) => {
        p.theta += p.speed;
        const sinPhi = Math.sin(p.phi);
        const cosPhi = Math.cos(p.phi);
        const x = sinPhi * Math.cos(p.theta + rot);
        const y = cosPhi;
        const z = sinPhi * Math.sin(p.theta + rot);
        // depth: back = 0.2 opacity, front = 1.0
        const depth = (z + 1) / 2; // 0..1
        const twinkle = 0.82 + 0.18 * Math.sin(time * p.twinkleSpeed + p.twinkleOffset);
        const alpha = p.brightness * (0.2 + depth * 0.8) * twinkle;
        return { p, x, y, z, depth, alpha };
      }).sort((a, b) => a.z - b.z);

      // ── Connections ──────────────────────────────────────────
      // Only front half; cull to nearby pairs quickly
      const front = projected.filter(d => d.z > -0.15);
      for (let i = 0; i < front.length; i++) {
        for (let j = i + 1; j < front.length; j++) {
          const a = front[i], b = front[j];
          const dx = (a.x - b.x) * R;
          const dy = (a.y - b.y) * R;
          const d2 = dx * dx + dy * dy;
          if (d2 > 1600) continue; // 40px cutoff
          const dist = Math.sqrt(d2);
          const alpha = (1 - dist / 40) * 0.3 * a.depth * b.depth;
          ctx.strokeStyle = `rgba(252,253,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.moveTo(cx + a.x * R, cy - a.y * R);
          ctx.lineTo(cx + b.x * R, cy - b.y * R);
          ctx.stroke();
        }
      }

      // ── Particles ────────────────────────────────────────────
      for (const { p, x, y, alpha } of projected) {
        const px = cx + x * R;
        const py = cy - y * R;
        const sz = p.size;

        if (p.glowing) {
          // Outer atmospheric bloom
          const bloom = ctx.createRadialGradient(px, py, 0, px, py, sz * 8);
          bloom.addColorStop(0,    `rgba(220,235,255,${(alpha * 0.9).toFixed(3)})`);
          bloom.addColorStop(0.2,  `rgba(200,220,255,${(alpha * 0.55).toFixed(3)})`);
          bloom.addColorStop(0.55, `rgba(180,210,255,${(alpha * 0.12).toFixed(3)})`);
          bloom.addColorStop(1,    "transparent");
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(px, py, sz * 8, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright spike cross (subtle)
          ctx.save();
          ctx.globalAlpha = alpha * 0.35;
          ctx.strokeStyle = "rgba(255,255,255,1)";
          ctx.lineWidth = 0.8;
          const spike = sz * 3;
          ctx.beginPath();
          ctx.moveTo(px - spike, py);
          ctx.lineTo(px + spike, py);
          ctx.moveTo(px, py - spike);
          ctx.lineTo(px, py + spike);
          ctx.stroke();
          ctx.restore();

          // Solid core
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, sz * 0.9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Small glow ring + solid dot
          const grd = ctx.createRadialGradient(px, py, 0, px, py, sz * 2.5);
          grd.addColorStop(0,   `rgba(252,253,255,${alpha.toFixed(3)})`);
          grd.addColorStop(0.5, `rgba(220,230,255,${(alpha * 0.35).toFixed(3)})`);
          grd.addColorStop(1,   "transparent");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(px, py, sz * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(252,253,255,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, sz * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-80 select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
