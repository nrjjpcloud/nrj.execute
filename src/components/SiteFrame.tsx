import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { useContact } from "./ContactModal";
import { Marquee } from "./Marquee";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="grain-overlay" aria-hidden />
      <Nav />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  const { open } = useContact();
  return (
    <footer className="relative z-10 border-t border-border bg-surface">
      <Marquee className="py-8 border-b border-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="font-display text-6xl md:text-8xl whitespace-nowrap flex items-center gap-12">
            available for projects
            <span className="text-primary">✦</span>
            let's build something
            <span className="text-primary">✦</span>
          </span>
        ))}
      </Marquee>
      <div className="px-6 md:px-10 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">// neeraj-built</p>
          <p className="mt-3 font-display text-3xl max-w-md">Freelance dev crafting reliable websites & web apps since 2017.</p>
          <button onClick={open} data-cursor="say hi" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline underline-offset-4">
            <span className="size-1.5 rounded-full bg-primary animate-blink" />
            Let's talk →
          </button>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">// sitemap</p>
          <ul className="mt-3 space-y-2">
            <li><Link to="/" data-cursor="">Index</Link></li>
            <li><Link to="/projects" data-cursor="">Work</Link></li>
            <li><Link to="/blog" data-cursor="">Blog</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">// elsewhere</p>
          <ul className="mt-3 space-y-2">
            <li><a href="#" data-cursor="↗">GitHub</a></li>
            <li><a href="#" data-cursor="↗">LinkedIn</a></li>
            <li><a href="#" data-cursor="↗">Twitter / X</a></li>
            <li><a href="#" data-cursor="↗">Read.cv</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>© {new Date().getFullYear()} neeraj-built — all rights reserved</span>
        <span>made by hand, in india</span>
      </div>
    </footer>
  );
}
