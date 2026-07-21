"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide animated background: a drifting node network with faded falling
 * binary. Fixed, full-viewport, behind all content, non-interactive.
 *
 * Performance & accessibility:
 * - prefers-reduced-motion: draws ONE static frame and never schedules another
 *   (no loop, no flicker, no battery cost).
 * - Pauses entirely when the tab is hidden (visibilitychange).
 * - Caps node count and link distance hard on small screens.
 */
export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const cv: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = context;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fs = 15;
    const stepx = fs * 1.6;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let linkDist = 124;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    let drops: number[] = [];
    let chars: string[] = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fewer nodes and shorter links on small screens — the pairwise loop is
      // O(n²), so this is where the phone cost lives.
      const small = w < 640;
      linkDist = small ? 96 : 124;
      const maxNodes = small ? 38 : 104;
      const count = Math.max(20, Math.min(maxNodes, Math.floor((w * h) / 18000)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
        });
      }
      const cols = Math.floor(w / stepx);
      drops = [];
      chars = [];
      for (let j = 0; j < cols; j++) {
        drops.push(Math.random() * h);
        chars.push(Math.random() < 0.5 ? "0" : "1");
      }
      if (reduced) render(false); // repaint the static frame on resize
    }

    function render(animate: boolean) {
      cx.clearRect(0, 0, w, h);

      // Faded falling binary (background layer)
      cx.font = `${fs}px "SFMono-Regular", Menlo, Consolas, monospace`;
      for (let j = 0; j < drops.length; j++) {
        const x = j * stepx + 2;
        const y = drops[j];
        cx.fillStyle = "rgba(143,220,215,0.30)";
        cx.fillText(chars[j], x, y);
        cx.fillStyle = "rgba(99,199,194,0.14)";
        cx.fillText(chars[j], x, y - stepx);
        cx.fillStyle = "rgba(99,199,194,0.07)";
        cx.fillText(chars[j], x, y - stepx * 2);
        if (animate) {
          drops[j] += 0.5 + (j % 3) * 0.18;
          if (Math.random() < 0.03) chars[j] = Math.random() < 0.5 ? "0" : "1";
          if (drops[j] > h + stepx * 2) {
            drops[j] = -Math.random() * 160;
            chars[j] = Math.random() < 0.5 ? "0" : "1";
          }
        }
      }

      // Node network (foreground layer)
      if (animate) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            cx.strokeStyle = `rgba(99,199,194,${0.11 * (1 - d / linkDist)})`;
            cx.lineWidth = 1;
            cx.beginPath();
            cx.moveTo(nodes[a].x, nodes[a].y);
            cx.lineTo(nodes[b].x, nodes[b].y);
            cx.stroke();
          }
        }
      }
      for (let k = 0; k < nodes.length; k++) {
        const m = nodes[k];
        const md = animate ? Math.hypot(m.x - mouse.x, m.y - mouse.y) : 9999;
        cx.fillStyle = `rgba(99,199,194,${md < 150 ? 0.9 : 0.48})`;
        cx.beginPath();
        cx.arc(m.x, m.y, md < 150 ? 2.2 : 1.4, 0, 6.2832);
        cx.fill();
      }
    }

    function loop() {
      render(true);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || reduced) return;
      running = true;
      loop();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    if (reduced) {
      render(false); // one static frame, no loop
    } else {
      start();
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
