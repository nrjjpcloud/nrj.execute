import type { ReactNode } from "react";

export function Marquee({ children, reverse = false, className = "" }: { children: ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee gap-12 will-change-transform"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
