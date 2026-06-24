import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;

    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (t) { setHover(true); setLabel(t.dataset.cursor || null); }
      else { setHover(false); setLabel(null); }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ width: 6, height: 6, borderRadius: 999, background: "var(--color-primary)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center transition-[width,height,background,color] duration-200"
        style={{
          width: hover ? (label ? 92 : 44) : 30,
          height: hover ? (label ? 92 : 44) : 30,
          borderRadius: 999,
          border: "1px solid color-mix(in oklab, var(--color-primary) 70%, transparent)",
          background: hover && label ? "var(--color-primary)" : "transparent",
          color: "var(--color-primary-foreground)",
          mixBlendMode: hover && label ? "normal" : "difference",
        }}
      >
        {label && <span className="text-[10px] uppercase tracking-widest font-medium">{label}</span>}
      </div>
    </>
  );
}
