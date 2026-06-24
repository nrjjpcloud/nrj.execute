import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteFrame } from "@/components/SiteFrame";
import { Marquee } from "@/components/Marquee";
import { useContact } from "@/components/ContactModal";
import { Link } from "@tanstack/react-router";
import portrait from "@/assets/neeraj-portrait.asset.json";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "nrj.execute — full-stack engineering" }, 
      { name: "description", content: "Full-stack developer & architecture. Immersive sites, dependable web systems, and absolute execution." },
      { property: "og:title", content: "nrj.execute — full-stack developer" },
      { property: "og:description", content: "Architecting solid backends. Crafting pristine frontends. From data to design." },
    ],
  }),
  component: Index,
});

const SERVICES = [
  { n: "01", t: "Website Development", d: "Bespoke marketing sites, landings, portfolio builds. Performance-first, animation-rich, CMS-friendly.", points: ["Marketing & landing sites", "Headless CMS (Sanity, Contentful)", "GSAP scroll storytelling", "Core Web Vitals tuned"], stack: ["React", "Next.js", "GSAP", "Lenis"] },
  { n: "02", t: "Web Apps", d: "SaaS dashboards, internal tools, AI interfaces. React, TanStack, Supabase, edge runtimes.", points: ["SaaS dashboards & admin panels", "Auth, billing, role-based access", "AI chat & agent interfaces", "Realtime + edge functions"], stack: ["TanStack", "Supabase", "tRPC", "Stripe"] },
  { n: "03", t: "SEO", d: "Technical SEO, schema, Core Web Vitals. Content architecture that ranks and converts.", points: ["Technical audits & fixes", "Schema, sitemap & metadata", "Page-speed & CWV tuning", "Keyword & content mapping"], stack: ["Semrush", "GSC", "Ahrefs", "Schema.org"] },
  { n: "04", t: "White-Label", d: "Quiet collaborator for agencies. Pixel-faithful builds, sane handovers, NDA friendly.", points: ["Figma → production builds", "Agency-friendly comms", "NDA & ghost delivery", "Clean handover docs"], stack: ["Figma", "Webflow", "React", "Shopify"] },
];

const PROJECTS = [
  { y: "2024", t: "Helios Studio", c: "Brand site · GSAP · Lenis" },
  { y: "2024", t: "Karuna AI", c: "SaaS dashboard · React · Supabase" },
  { y: "2023", t: "Northwall", c: "E-commerce · Shopify Hydrogen" },
  { y: "2023", t: "Field Notes", c: "Editorial CMS · Sanity" },
  { y: "2022", t: "Cobalt Bank", c: "Fintech app · TanStack Start" },
  { y: "2022", t: "Atlas Maps", c: "Mapbox · 3D scroll story" },
];

function Index() {
  const { open } = useContact();
  const heroRef = useRef<HTMLDivElement>(null);
  const horizRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax + scale-out
      gsap.to(".hero-title", {
        scale: 0.85,
        y: -60,
        opacity: 0.2,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-sub", {
        y: -120,
        opacity: 0,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "60% top", scrub: true },
      });

      // Floating shapes parallax
      gsap.utils.toArray<HTMLElement>(".float-shape").forEach((el, i) => {
        gsap.to(el, {
          y: () => (i % 2 === 0 ? -200 : -350),
          rotate: i % 2 === 0 ? 45 : -60,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Section pin-fade reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Horizontal scroll for services
      if (horizRef.current && trackRef.current) {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: horizRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // About number counts
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 2, ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SiteFrame>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-end px-5 md:px-10 pb-20 pt-32 overflow-hidden">
        <FloatingShapes />

        <div className="relative z-10 max-w-7xl">
          <p className="hero-sub text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4 md:mb-8">
            // freelance developer · est. 2018 · based in india · available worldwide
          </p>
          <h1 className="hero-title font-display leading-[0.85] text-[15vw] md:text-[11vw] tracking-tight">
            <span className="block">i build the</span>
            <span className="block italic text-primary text-glow">unreasonably</span>
            <span className="block">good web.</span>
          </h1>
          <div className="hero-sub mt-10 grid md:grid-cols-2 gap-6 max-w-4xl">
            <p className="text-base md:text-lg text-muted-foreground">
              I'm <span className="text-foreground">Neeraj</span> — a freelance web developer with 8 years in the field and 80+ shipped projects. I make sites that feel alive: scroll stories, custom interactions, dependable code, on time.
            </p>
            <div className="flex flex-wrap items-end gap-3 md:justify-end">
              <button onClick={open} data-cursor="say hi" className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-5 pr-2 py-2 text-xs uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-colors">
                start a project
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-background text-foreground group-hover:bg-primary-foreground group-hover:text-primary">→</span>
              </button>
              <Link to="/projects" data-cursor="explore" className="rounded-full border border-foreground/30 px-5 py-3 text-xs uppercase tracking-[0.25em] hover:border-foreground transition-colors">
                see the work
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="size-1 rounded-full bg-primary animate-blink" /> scroll
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-y border-border bg-foreground text-background py-6">
        <Marquee>
          {["react", "tanstack", "next.js", "gsap", "lenis", "supabase", "tailwind", "framer motion", "three.js", "shopify"].map((w) => (
            <span key={w} className="text-3xl md:text-5xl font-display flex items-center gap-10">
              {w}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* SERVICES — HORIZONTAL SCROLL */}
      <section ref={horizRef} className="relative h-screen overflow-hidden">
        <div ref={trackRef} className="absolute inset-0 flex items-center will-change-transform">
          <div className="shrink-0 w-screen px-5 md:px-10 flex items-center">
            <div className="max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">/ 02 — services</p>
              <h2 className="font-display text-6xl md:text-8xl mt-4 leading-[0.9]">What I do, <span className="italic text-primary">obsessively</span>.</h2>
              <p className="mt-6 text-muted-foreground max-w-md">Scroll sideways →</p>
            </div>
          </div>
          {SERVICES.map((s) => (
            <article key={s.n} className="shrink-0 w-[88vw] md:w-[52vw] mx-5 md:mx-10 rounded-3xl border border-border bg-surface-elevated p-8 md:p-12 h-[60vh] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.n} / service</span>
                <ServiceGlyph n={s.n} />
              </div>
              <div>
                <h3 className="font-display text-4xl md:text-6xl leading-[0.95]">{s.t}</h3>
                <p className="mt-4 text-muted-foreground max-w-md">{s.d}</p>
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-lg">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {s.stack.map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
          <div className="shrink-0 w-[60vw] px-10 flex items-center justify-center">
            <button onClick={open} data-cursor="hire" className="rounded-full bg-primary text-primary-foreground px-8 py-6 text-sm uppercase tracking-[0.3em] hover:bg-primary-glow transition">
              hire me →
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} className="px-5 md:px-10 py-32 grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground reveal">/ 03 — about</p>
          <h2 className="font-display text-5xl md:text-7xl mt-4 leading-[0.95] reveal">
            A safe pair of hands for ambitious briefs.
          </h2>
        </div>
        <div className="md:col-span-7 md:pl-16 grid gap-10">
          <p className="reveal text-lg text-muted-foreground">
            I've spent the last 8 years building for founders, agencies and product teams. The brief changes — the discipline doesn't: clear scope, honest timelines, code you can hand to anyone, and craft that earns a second look.
          </p>
          <div className="reveal grid grid-cols-3 gap-6 border-t border-border pt-8">
            <Stat target={8} label="years building" />
            <Stat target={80} label="projects shipped" suffix="+" />
            <Stat target={100} label="brief-to-launch" suffix="%" />
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="px-5 md:px-10 pb-24">
        <div className="flex items-end justify-between mb-10 reveal">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">/ 04 — selected work</p>
            <h2 className="font-display text-5xl md:text-7xl mt-2">Recent things.</h2>
          </div>
          <Link to="/projects" data-cursor="all" className="hidden md:inline text-xs uppercase tracking-[0.25em] hover:text-primary">all projects →</Link>
        </div>
        <ul className="border-t border-border">
          {PROJECTS.slice(0, 5).map((p) => (
            <li key={p.t} className="reveal group border-b border-border">
              <Link to="/projects" data-cursor="view" className="grid grid-cols-12 items-center gap-4 py-6 md:py-8 transition-colors hover:bg-surface px-2 md:px-4">
                <span className="col-span-2 md:col-span-1 text-xs text-muted-foreground">{p.y}</span>
                <span className="col-span-7 md:col-span-7 font-display text-3xl md:text-5xl group-hover:text-primary transition-colors">{p.t}</span>
                <span className="col-span-3 md:col-span-3 text-xs md:text-sm text-muted-foreground text-right md:text-left">{p.c}</span>
                <span className="col-span-12 md:col-span-1 text-right text-xl group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT CTA */}
      <section className="relative px-5 md:px-10 py-32 bg-foreground text-background overflow-hidden">
        <div className="relative z-10 max-w-5xl reveal">
          <p className="text-[11px] uppercase tracking-[0.3em] text-background/60">/ 05 — let's talk</p>
          <h2 className="font-display text-6xl md:text-9xl mt-4 leading-[0.9]">
            So about your <span className="italic text-primary">new website</span>…
          </h2>
          <p className="mt-8 max-w-2xl text-background/70 text-lg">
            I hope that's not too presumptive of me. But initial consultations are free, so you really don't have much to lose. And everything to gain.
          </p>
          <button onClick={open} data-cursor="say hi" className="mt-10 inline-flex items-center gap-4 rounded-full bg-primary text-primary-foreground pl-8 pr-3 py-3 text-sm uppercase tracking-[0.3em] hover:bg-primary-glow transition-colors">
            get in touch
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary-foreground text-primary">→</span>
          </button>
        </div>
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-[40rem] rounded-full border border-background/10 animate-float" />
        <div className="pointer-events-none absolute right-40 top-20 size-40 rounded-full bg-primary/40 blur-3xl" />
      </section>
    </SiteFrame>
  );
}

function Stat({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  return (
    <div>
      <div className="font-display text-5xl md:text-7xl text-primary text-glow flex items-baseline">
        <span className="count" data-target={target}>0</span><span>{suffix}</span>
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </div>
  );
}

function ServiceGlyph({ n }: { n: string }) {
  const c = "stroke-primary";
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {n === "01" && <><circle cx="28" cy="28" r="22" className={c} strokeWidth="1.5" /><path d="M6 28h44M28 6v44" className={c} strokeWidth="1.5" /></>}
      {n === "02" && <><rect x="6" y="10" width="44" height="32" rx="4" className={c} strokeWidth="1.5" /><path d="M14 22h12M14 28h20M14 34h16" className={c} strokeWidth="1.5" /></>}
      {n === "03" && <><path d="M8 36c10-20 30-20 40 0" className={c} strokeWidth="1.5" /><circle cx="28" cy="36" r="4" className={c} strokeWidth="1.5" /></>}
      {n === "04" && <><path d="M10 18l18-10 18 10v20L28 48 10 38z" className={c} strokeWidth="1.5" /><path d="M28 8v40M10 18l36 20M46 18L10 38" className={c} strokeWidth="1.5" /></>}
    </svg>
  );
}

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="float-shape absolute top-[18%] left-[6%] size-24 md:size-40 opacity-80" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="var(--color-primary)" strokeWidth="1" />
        <circle cx="50" cy="50" r="32" stroke="var(--color-primary)" strokeWidth="1" />
        <circle cx="50" cy="50" r="16" fill="var(--color-primary)" opacity="0.4" />
      </svg>
      <div className="float-shape absolute top-[20%] right-[6%] md:top-[22%] md:right-[8%] w-32 md:w-56 rotate-3">
        <div className="relative rounded-2xl border border-primary/30 bg-background/40 p-2 shadow-[0_30px_80px_-30px_rgba(0,200,255,0.45)] backdrop-blur">
          <img 
      src="/neeraj-portrait.jpeg" 
      alt="Neeraj portrait sketch" className="w-full h-auto rounded-xl block" />
          <span className="absolute -bottom-3 left-3 bg-primary text-primary-foreground text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-full">that's me</span>
        </div>
      </div>
      <svg className="float-shape absolute top-[55%] left-[14%] size-20 md:size-32 opacity-70" viewBox="0 0 100 100">
        <polygon points="50,5 95,90 5,90" fill="none" stroke="var(--color-primary)" strokeWidth="1" />
      </svg>
      <div className="float-shape absolute top-[12%] right-[24%] size-3 rounded-full bg-primary text-glow" />
      <div className="float-shape absolute top-[68%] right-[18%] size-4 rounded-full bg-primary/60" />
      <div className="pointer-events-none absolute -top-32 -right-32 size-[36rem] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-[36rem] rounded-full bg-primary-glow/30 blur-[120px]" />
    </div>
  );
}
