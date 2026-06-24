import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — neeraj-built" },
      { name: "description", content: "Notes on web craft, performance, scroll interactions and the freelance life." },
      { property: "og:title", content: "Blog — neeraj-built" },
      { property: "og:description", content: "Notes on the craft of building for the web." },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  { d: "Mar 04, 2025", t: "Scroll without spectacle", r: "6 min", c: "craft", e: "When ScrollTrigger stops being a toy and starts being a tool." },
  { d: "Feb 18, 2025", t: "The honest case for hand-rolled CMSes", r: "9 min", c: "process", e: "Why the right CMS for your client is usually not the famous one." },
  { d: "Jan 30, 2025", t: "A freelance pricing system that doesn't lie", r: "12 min", c: "business", e: "Range-based proposals, written so the client can pick the version that fits." },
  { d: "Jan 12, 2025", t: "Lenis, GSAP, and the smooth-scroll question", r: "7 min", c: "craft", e: "Smooth scroll is a taste decision. Here's the one I keep making." },
  { d: "Dec 21, 2024", t: "Web Vitals for sites that move a lot", r: "8 min", c: "performance", e: "How I keep LCP under 2s on animation-heavy builds." },
  { d: "Nov 28, 2024", t: "Notes from 50 projects", r: "11 min", c: "process", e: "Patterns I keep returning to after eight years of client work." },
];

function BlogPage() {
  return (
    <SiteFrame>
      <section className="px-5 md:px-10 pt-36 pb-16 border-b border-border">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">/ blog · field notes from a freelance dev</p>
        <h1 className="font-display text-6xl md:text-9xl mt-4 leading-[0.9]">
          Writing on the <span className="italic text-primary">craft</span>.
        </h1>
      </section>

      <section className="px-5 md:px-10 py-12">
        <ul className="divide-y divide-border">
          {POSTS.map((p) => (
            <li key={p.t}>
              <Link to="/blog" data-cursor="read" className="group grid grid-cols-12 gap-4 py-8 md:py-10 items-start hover:bg-surface px-2 md:px-4 transition-colors">
                <div className="col-span-12 md:col-span-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <div>{p.d}</div>
                  <div className="mt-1 text-primary">/{p.c}</div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h2 className="font-display text-4xl md:text-5xl group-hover:text-primary transition-colors">{p.t}</h2>
                  <p className="mt-3 text-muted-foreground max-w-2xl">{p.e}</p>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right text-xs text-muted-foreground flex md:flex-col items-center md:items-end gap-3 md:gap-1">
                  <span>{p.r} read</span>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteFrame>
  );
}
