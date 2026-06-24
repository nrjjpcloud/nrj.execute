import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const ContactCtx = createContext<Ctx | null>(null);

export function useContact() {
  const ctx = useContext(ContactCtx);
  if (!ctx) throw new Error("useContact must be used inside ContactProvider");
  return ctx;
}

const schema = z.object({
  name: z.string().min(2, "tell me your name"),
  email: z.string().email("valid email please"),
  whatsapp: z.string().min(7, "include country code"),
  service: z.enum(["Development", "White-Label", "Design & Development", "Not sure yet"]),
  currency: z.enum(["USD", "INR"]),
  budget: z.string().optional(),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const USD = ["N/A", "$2–5k", "$5–8k", "$8–12k", "$12k+"];
const INR = ["N/A", "₹1–4L", "₹4–8L", "₹8–12L", "₹12L+"];

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "Development", currency: "USD", budget: "N/A" },
  });

  const currency = watch("currency");
  const service = watch("service");
  const budget = watch("budget");

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("contact submission", data);
    setSent(true);
    setTimeout(() => { reset(); setSent(false); setOpen(false); }, 1800);
  };

  return (
    <ContactCtx.Provider value={{ open: () => setOpen(true), close: () => setOpen(false), isOpen }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            data-cursor="close"
          />
          <div className="relative w-full md:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-background border border-border shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-border bg-background/90 backdrop-blur">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">// new project inquiry</p>
                <h2 className="font-display text-3xl md:text-4xl mt-1">So about your new website…</h2>
              </div>
              <button onClick={() => setOpen(false)} data-cursor="close" className="text-2xl leading-none px-2 hover:text-primary">×</button>
            </div>

            <div className="px-6 md:px-10 py-6">
              <p className="text-sm text-muted-foreground max-w-xl">
                I hope that's not too presumptive of me. But initial consultations are free, so you really don't have much to lose. And everything to gain.
              </p>

              {sent ? (
                <div className="my-16 text-center">
                  <div className="font-display text-5xl text-primary text-glow">Message sent.</div>
                  <p className="mt-3 text-muted-foreground">I'll get back to you within 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6">
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register("name")} placeholder="your name" className="field" data-cursor="" />
                  </Field>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Email" error={errors.email?.message}>
                      <input {...register("email")} placeholder="you@domain.com" className="field" data-cursor="" />
                    </Field>
                    <Field label="WhatsApp" error={errors.whatsapp?.message}>
                      <input {...register("whatsapp")} placeholder="+91 98xxxxxxxx" className="field" data-cursor="" />
                    </Field>
                  </div>

                  <Field label="What services are you interested in?">
                    <div className="flex flex-wrap gap-2">
                      {(["Development","White-Label","Design & Development","Not sure yet"] as const).map((s) => (
                        <button type="button" key={s} onClick={() => setValue("service", s)} data-cursor=""
                          className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition ${service === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="What's your budget? (optional)">
                    <div className="flex items-center gap-2 mb-3">
                      {(["USD","INR"] as const).map((c) => (
                        <button type="button" key={c} onClick={() => { setValue("currency", c); setValue("budget", "N/A"); }} data-cursor=""
                          className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-widest transition ${currency === c ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                          {c === "USD" ? "$ USD" : "₹ INR"}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(currency === "INR" ? INR : USD).map((b) => (
                        <button type="button" key={b} onClick={() => setValue("budget", b)} data-cursor=""
                          className={`rounded-full border px-4 py-2 text-xs tracking-wider transition ${budget === b ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Anything else? (optional)">
                    <textarea {...register("message")} rows={3} placeholder="a few lines about your project..." className="field resize-none" data-cursor="" />
                  </Field>

                  <button type="submit" disabled={isSubmitting} data-cursor="send" className="group mt-2 inline-flex items-center justify-between gap-4 rounded-full bg-foreground text-background px-6 py-4 text-sm uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50">
                    <span>{isSubmitting ? "Sending…" : "Submit inquiry"}</span>
                    <span className="text-xl">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </ContactCtx.Provider>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
