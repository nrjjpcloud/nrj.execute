import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CustomCursor } from "../components/CustomCursor";
import { SmoothScroll } from "../components/SmoothScroll";
import { ContactProvider } from "../components/ContactModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-primary text-glow">404</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-muted-foreground">page not found in the index</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
            ← back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl">This page didn't load.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something broke. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-3 text-xs uppercase tracking-widest text-primary-foreground">try again</button>
          <a href="/" className="rounded-full border border-border px-5 py-3 text-xs uppercase tracking-widest">go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "neeraj-built — freelance web developer & immersive web experiences" },
      { name: "description", content: "Freelance web developer with 8 years building reliable websites, web apps & SEO. Custom interactions, scroll experiences and brand-led portfolio sites." },
      { name: "author", content: "neeraj-built" },
      { property: "og:title", content: "neeraj-built — freelance web developer" },
      { property: "og:description", content: "Reliable, interactive websites & web apps. 50+ projects shipped." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Instrument+Serif:ital@0;1&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ContactProvider>
        <SmoothScroll />
        <CustomCursor />
        <Outlet />
      </ContactProvider>
    </QueryClientProvider>
  );
}
