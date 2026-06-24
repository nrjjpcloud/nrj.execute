import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useContact } from "./ContactModal";
import logo from "@/assets/neeraj-built-logo-transparent.asset.json";

const links = [
  { to: "/", label: "index" },
  { to: "/projects", label: "work" },
  { to: "/blog", label: "blog" },
];

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { open } = useContact();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d) + " IST");
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-4 flex items-center justify-between gap-4 mix-blend-difference text-foreground">
      <Link to="/" className="flex items-center gap-2 group" data-cursor="home">
        <img 
    src="/nrj-logo.png" 
    alt="nrj.execute logo" 
    className="h-12 md:h-14 w-auto" />
      </Link>

      <nav className="hidden md:flex items-center gap-1 rounded-full border border-foreground/20 px-2 py-1 backdrop-blur-sm">
        {links.map((l) => {
          const active = pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              data-cursor=""
              className={`relative px-4 py-1.5 text-xs uppercase tracking-widest rounded-full transition-colors ${active ? "text-background bg-foreground" : "hover:text-primary"}`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-[11px] uppercase tracking-widest opacity-60">{time}</span>
        <button
          onClick={open}
          data-cursor="say hi"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary-glow transition-colors"
        >
          <span className="size-1.5 rounded-full bg-primary-foreground animate-blink" />
          contact
        </button>
      </div>
    </header>
  );
}
