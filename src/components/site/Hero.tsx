import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight, MousePointer2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal, RevealText } from "./Reveal";

/** Parallax layer: moves by `depth` px relative to pointer position. */
function Layer({ depth, className, children }: { depth: number; className?: string; children: React.ReactNode }) {
  return (
    <div data-depth={depth} className={`absolute transition-transform duration-700 ease-out will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}

const card = "rounded-2xl border border-border bg-card shadow-[0_30px_60px_-45px_rgba(0,0,0,0.5)]";

export function Hero() {
  const stage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        const d = Number(l.dataset["depth"]);
        l.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] animate-in fade-in duration-1000" />
      <div className="glow pointer-events-none absolute -top-40 right-0 size-[520px] opacity-60" />

      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border bg-card px-3.5 py-1.5 eyebrow">{profile.name}</span>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 eyebrow !text-accent">2.5+ Years Experience</span>
            </div>
          </Reveal>

          <RevealText
            as="h1"
            text="Designing digital experiences that feel simple, intuitive, and meaningful."
            accentFrom={5}
            className="mt-7 font-display text-[2.5rem] leading-[1.04] font-extrabold sm:text-6xl lg:text-[4.1rem]"
          />

          <Reveal delay={350}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              UI/UX Designer with 2.5+ years of experience creating user-focused web and mobile experiences through
              research, interaction design, visual systems, and thoughtful problem solving.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                data-cursor="cta"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground active:translate-y-0"
              >
                VIEW MY WORK
                <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
              </a>
              <a
                href={profile.resumeUrl}
                download="Dhaval_Kamaliya_Resume.pdf"
                data-cursor="cta"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 active:translate-y-0"
              >
                DOWNLOAD RESUME
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={550}>
            <p className="mt-8 flex items-center gap-2.5 text-sm text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Open to new opportunities · {profile.location}
            </p>
          </Reveal>
        </div>

        {/* Design-tool composition */}
        <Reveal delay={250} className="relative hidden lg:block">
          <div ref={stage} className="relative h-[520px]">
            {/* Figma-style frame */}
            <Layer depth={8} className="top-6 right-2 w-[72%]">
              <div className="float-soft">
                <span className="mb-1.5 block text-[10px] font-medium text-accent">Frame · Mobile / Home</span>
                <div className={`${card} border-accent/60 p-4 ring-1 ring-accent/30`}>
                  <div className="flex items-center justify-between">
                    <div className="h-2.5 w-20 rounded-full bg-surface-strong" />
                    <div className="size-6 rounded-full bg-surface-strong" />
                  </div>
                  <div className="mt-4 h-28 rounded-xl bg-gradient-to-br from-accent/25 to-accent/5" />
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="h-16 rounded-lg border border-border bg-surface" />
                    <div className="h-16 rounded-lg border border-border bg-surface" />
                  </div>
                  <div className="mt-3 rounded-full bg-primary py-2 text-center text-[11px] text-primary-foreground">Continue</div>
                </div>
              </div>
            </Layer>

            {/* Color tokens */}
            <Layer depth={14} className="top-[44%] left-0 w-[46%]">
              <div className={`${card} p-4`} style={{ animation: "float-soft 9s ease-in-out infinite" }}>
                <span className="eyebrow">Color tokens</span>
                <div className="mt-3 flex gap-1.5">
                  <span className="size-8 rounded-lg bg-accent" />
                  <span className="size-8 rounded-lg bg-primary" />
                  <span className="size-8 rounded-lg bg-surface-strong" />
                  <span className="size-8 rounded-lg border border-border bg-background" />
                </div>
              </div>
            </Layer>

            {/* Type */}
            <Layer depth={5} className="top-0 left-6">
              <div className={`${card} px-4 py-3`}>
                <span className="font-display text-2xl font-extrabold">Aa</span>
                <span className="ml-2 text-[10px] text-muted-foreground">Manrope · 800</span>
              </div>
            </Layer>

            {/* Component chips */}
            <Layer depth={11} className="right-0 bottom-6 w-[56%]">
              <div className={`${card} p-4`} style={{ animation: "float-soft 8s ease-in-out infinite reverse" }}>
                <span className="eyebrow">Button / states</span>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="rounded-full bg-primary px-3 py-1.5 text-primary-foreground">Default</span>
                  <span className="rounded-full bg-accent px-3 py-1.5 text-accent-foreground">Hover</span>
                  <span className="rounded-full border border-border px-3 py-1.5 text-muted-foreground opacity-50">Disabled</span>
                </div>
              </div>
            </Layer>

            {/* Cursor */}
            <Layer depth={18} className="top-[36%] left-[48%]">
              <div className="flex items-start gap-1">
                <MousePointer2 className="size-5 fill-accent text-accent" />
                <span className="mt-4 rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">Dhaval</span>
              </div>
            </Layer>

            <Layer depth={4} className="bottom-20 left-8">
              <span className="rounded-full border border-dashed border-border px-3 py-1 text-[10px] text-muted-foreground">
                spacing · 8pt grid
              </span>
            </Layer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
