import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/SiteFrame";
import { useContact } from "@/components/ContactModal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — neeraj-built" },
      { name: "description", content: "Selected freelance work: marketing sites, web apps, hosted modules and SEO engagements." },
      { property: "og:title", content: "Projects — neeraj-built" },
      { property: "og:description", content: "Selected work across product, brand and editorial." },
    ],
  }),
  component: ProjectsPage,
});

const ALL = [
  { y: "2024", t: "Helios Studio", c: "Brand site", stack: "GSAP · Lenis · Sanity", w: "An immersive design-studio site with scroll-driven case studies.", tag: "site" },
  { y: "2024", t: "Karuna AI", c: "SaaS dashboard", stack: "React · Supabase · tRPC", w: "Internal AI workflow tool with streaming responses and role-based access.", tag: "app" },
  { y: "2024", t: "Module: pay-link", c: "Hosted module", stack: "TanStack Start · Stripe", w: "Embeddable payment link component used across client projects.", tag: "module" },
  { y: "2023", t: "Northwall", c: "E-commerce", stack: "Shopify Hydrogen", w: "Premium streetwear store with custom PDP transitions.", tag: "site" },
  { y: "2023", t: "Field Notes", c: "Editorial CMS", stack: "Sanity · Next.js", w: "Long-form publication with reading progress and footnote layer.", tag: "site" },
  { y: "2023", t: "Module: form-kit", c: "Hosted module", stack: "React · Zod", w: "Validated multi-step form builder used by 9 client products.", tag: "module" },
  { y: "2022", t: "Cobalt Bank", c: "Fintech app", stack: "TanStack Start · Plaid", w: "Personal-finance app with budget visualisations.", tag: "app" },
  { y: "2022", t: "Atlas Maps", c: "Scroll story", stack: "Mapbox · GSAP", w: "Interactive 3D-globe storytelling for a travel publication.", tag: "site" },
];

function ProjectsPage() {
  const { open } = useContact();
  return (
    <SiteFrame>
      <section className="px-5 md:px-10 pt-36 pb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">/ projects · 50+ shipped · selected below</p>
        <h1 className="font-display text-6xl md:text-9xl mt-4 leading-[0.9]">
          The <span className="italic text-primary">work</span>.
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {["all", "sites", "apps", "modules"].map((f) => (
            <span key={f} className="rounded-full border border-border px-4 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">{f}</span>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-10 pb-24 grid md:grid-cols-2 gap-6">
        {ALL.map((p, i) => (
          <Link key={p.t} to="/projects" data-cursor="view" className="group relative rounded-3xl border border-border bg-surface-elevated p-8 md:p-10 overflow-hidden transition-colors hover:border-foreground">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>{p.y}</span>
              <span>{p.tag}</span>
            </div>
            <div className="aspect-[16/10] mt-6 rounded-2xl bg-foreground/90 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at ${20 + i * 11}% ${30 + i * 7}%, var(--color-primary), transparent 60%)` }} />
              <span className="relative font-display text-5xl md:text-6xl text-background text-center px-6">{p.t}</span>
            </div>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl group-hover:text-primary transition-colors">{p.t}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.c} · {p.stack}</p>
                <p className="text-sm mt-3 max-w-md">{p.w}</p>
              </div>
              <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="px-5 md:px-10 pb-32 text-center">
        <p className="font-display text-4xl md:text-6xl max-w-3xl mx-auto">Got something rattling in your head? Let's give it a URL.</p>
        <button onClick={open} data-cursor="say hi" className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground text-background px-6 py-4 text-xs uppercase tracking-[0.3em] hover:bg-primary hover:text-primary-foreground transition-colors">
          start a project →
        </button>
      </section>
    </SiteFrame>
  );
}
