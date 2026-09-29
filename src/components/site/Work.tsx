import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { MaskReveal, Reveal, RevealText } from "./Reveal";
import { cn } from "@/lib/utils";

export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className={cn("h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]", className)}
      />
    );
  }
  // Layered placeholder until the real mockup is uploaded
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface", className)}>
      <div className="grid-lines absolute inset-0 opacity-40" />
      <div className="glow absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end gap-4 transition-transform duration-700 ease-out group-hover:-translate-y-[54%]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "w-24 rounded-[1.4rem] border border-border bg-card p-2 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.6)] transition-transform duration-700 sm:w-32",
              i === 1 ? "h-56 sm:h-64 group-hover:-translate-y-3" : "h-44 sm:h-52",
            )}
          >
            <div className="h-full rounded-[1rem] bg-surface p-2">
              <div className="h-16 rounded-lg bg-accent/20" />
              <div className="mt-2 h-2 w-3/4 rounded-full bg-surface-strong" />
              <div className="mt-1.5 h-2 w-1/2 rounded-full bg-surface-strong" />
            </div>
          </div>
        ))}
      </div>
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-card/80 px-3 py-1 text-[11px] text-muted-foreground">
        <ImageIcon className="size-3" /> [Upload {project.name} mockup]
      </span>
    </div>
  );
}

function ProjectCard({ project, reverse }: { project: Project; reverse?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      data-cursor="project"
      className="group grid gap-8 lg:grid-cols-12 lg:items-center"
    >
      <MaskReveal className={cn("lg:col-span-8", reverse && "lg:order-2")}>
        <div className="aspect-[16/11] overflow-hidden rounded-3xl border border-border transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-50px_rgba(0,0,0,0.55)]">
          <ProjectVisual project={project} />
        </div>
      </MaskReveal>

      <Reveal delay={120} className={cn("lg:col-span-4", reverse && "lg:order-1")}>
        <span className="font-display text-6xl font-extrabold text-accent/20 transition-colors duration-500 group-hover:text-accent/60">
          {project.index}
        </span>
        <p className="mt-3 eyebrow">{project.cardLabel} • {project.platform}</p>
        <h3 className="mt-3 font-display text-3xl font-extrabold transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
          <div>
            <dt className="eyebrow">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div>
            <dt className="eyebrow">Tools</dt>
            <dd className="mt-1">{project.tools.join(" / ")}</dd>
          </div>
        </dl>
        <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
          View Project
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </Reveal>
    </Link>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">01 — Portfolio</span>
            </Reveal>
            <RevealText text="Selected Projects" className="mt-4 font-display text-4xl font-extrabold sm:text-6xl" />
          </div>
          <Reveal delay={150}>
            <p className="max-w-sm text-muted-foreground">
              A selection of digital products and interfaces I've designed across mobile and web experiences.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-24 md:space-y-32">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} reverse={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-28 grid gap-6 md:grid-cols-3">
          {projects.slice(3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                data-cursor="project"
                className="group block h-full rounded-2xl border border-border bg-card p-4 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_-45px_rgba(0,0,0,0.5)]"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                  <ProjectVisual project={p} />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <div>
                    <span className="eyebrow">{p.index} — {p.cardLabel}</span>
                    <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{p.platform} • {p.tools.join(" / ")}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                      View Project
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
