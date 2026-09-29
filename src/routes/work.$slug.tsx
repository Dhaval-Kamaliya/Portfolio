import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { profile, projects, type Project } from "@/data/portfolio";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";
import { Reveal, MaskReveal } from "@/components/site/Reveal";
import { ProjectVisual } from "@/components/site/Work";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/data/caseStudies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const i = projects.findIndex((p) => p.slug === params.slug);
    const project = projects[i];
    if (i === -1 || !project) throw notFound();
    const n = projects.length;
    return { project, prev: projects[(i - 1 + n) % n]!, next: projects[(i + 1) % n]! };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — Dhaval Kamaliya" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = `${p.name} — UI/UX Case Study | Dhaval Kamaliya`;
    const description = `${p.name}: ${p.description} UI/UX design by Dhaval Kamaliya.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: CaseStudy,
});

function ProjectNotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Project not found</h1>
        <Link to="/" hash="work" className="mt-6 inline-block underline">Back to Work</Link>
      </div>
    </main>
  );
}

const sections = [
  ["overview", "Overview"],
  ["challenge", "Challenge"],
  ["goals", "Goals"],
  ["flow", "Flow"],
  ["visual", "Visual Design"],
  ["components", "Components"],
  ["screens", "Final Screens"],
  ["prototype", "Prototype"],
  ["outcome", "Outcome"],
] as const;

function Block({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-border py-12 md:py-16">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[180px_1fr]">
          <div>
            <span className="eyebrow">{num}</span>
            <h2 className="mt-2 font-display text-xl font-bold">{title}</h2>
          </div>
          <div className="text-muted-foreground">{children}</div>
        </div>
      </Reveal>
    </section>
  );
}

function Placeholder({ text, ratio = "aspect-[16/9]" }: { text: string; ratio?: string }) {
  return (
    <div className={cn("grid place-items-center rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-sm", ratio)}>
      {text}
    </div>
  );
}

function SectionNav() {
  const [active, setActive] = useState<string>("overview");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav aria-label="Project sections" className="sticky top-20 z-30 -mx-5 mt-12 border-y border-border bg-background/85 backdrop-blur sm:-mx-8">
      <ul className="flex gap-1 overflow-x-auto px-5 py-2 sm:px-8 [scrollbar-width:none]">
        {sections.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "block whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs transition-colors",
                active === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid animate-in fade-in place-items-center bg-foreground/85 p-4 backdrop-blur-sm duration-300"
    >
      <button aria-label="Close preview" onClick={onClose} className="absolute top-5 right-5 rounded-full bg-background p-2.5 text-foreground">
        <X className="size-5" />
      </button>
      <img src={src} alt={alt} className="max-h-[90vh] max-w-full animate-in zoom-in-95 rounded-2xl object-contain duration-300" />
    </div>
  );
}

function ZoomImage({ project, className, onOpen }: { project: Project; className?: string; onOpen: () => void }) {
  if (!project.image) return <Placeholder text="[Add actual project screens]" />;
  return (
    <button type="button" onClick={onOpen} data-cursor="image" aria-label={`Open ${project.name} preview`} className={cn("group block w-full overflow-hidden rounded-3xl border border-border", className)}>
      <ProjectVisual project={project} />
    </button>
  );
}

function CaseStudy() {
  const { project, prev, next } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState(false);
  const open = () => setLightbox(true);
  const cs = caseStudies[project.slug]!;

  return (
    <>
      <Navbar />
      <main key={project.slug} className="mx-auto max-w-[1080px] animate-in fade-in px-5 pt-32 pb-10 duration-500 sm:px-8 md:pt-40">
        <Reveal>
          <Link to="/" hash="work" data-cursor="cta" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to Work
          </Link>
          <p className="mt-8 eyebrow">Project {project.index} • {project.category}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-6xl">{project.name}</h1>
          <p className="mt-3 font-display text-xl text-foreground/80">{cs.subtitle}</p>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{project.description}</p>
        </Reveal>

        <Reveal delay={90}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {[
              ["My Role", project.role],
              ["Platform", project.platform],
              ["Tools", project.tools.join(" / ")],
              ["Category", project.category],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-5">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-1.5 text-sm text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <MaskReveal delay={140} className="mt-12">
          <ZoomImage project={project} className="aspect-[16/9]" onOpen={open} />
        </MaskReveal>

        <SectionNav />

        <Block id="overview" num="01" title="Overview">
          <div className="space-y-4">{cs.overview.map((o) => <p key={o}>{o}</p>)}</div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <span className="eyebrow">My contribution</span>
              <ul className="mt-3 space-y-1.5 text-sm">{cs.contribution.map((c) => <li key={c}>• {c}</li>)}</ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <span className="eyebrow">Features in the design</span>
              <ul className="mt-3 space-y-1.5 text-sm">{project.overview.map((c) => <li key={c}>• {c}</li>)}</ul>
            </div>
          </div>
        </Block>

        <Block id="challenge" num="02" title="The Challenge">
          <p className="font-display text-xl leading-relaxed text-foreground sm:text-2xl">{cs.challenge}</p>
        </Block>

        <Block id="goals" num="03" title="User Goals">
          <ul className="grid gap-4 sm:grid-cols-2">
            {cs.goals.map((g, i) => (
              <li key={g.title} className="rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-1">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display font-bold text-foreground">{g.title}</p>
                <p className="mt-1 text-sm">{g.text}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="flow" num="04" title="User Flow">
          <ol className="flex flex-wrap items-center gap-3">
            <li className="eyebrow">Start</li>
            {cs.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <ArrowRight className="size-4 text-accent" />
                <span className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground">
                  <span className="mr-2 text-xs text-muted-foreground">{i + 1}</span>{step}
                </span>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="visual" num="05" title="Visual Design">
          <span className="eyebrow">Color palette</span>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cs.colors.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="h-20" style={{ backgroundColor: c.hex }} />
                <div className="p-3 text-xs"><p className="font-medium text-foreground">{c.name}</p><p>{c.hex}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {cs.visualNotes.map((v) => (
              <div key={v.label} className="rounded-2xl border border-border bg-card p-5">
                <span className="eyebrow">{v.label}</span>
                <p className="mt-2 text-sm">{v.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="components" num="06" title="Components">
          <div className="overflow-hidden rounded-2xl border border-border">
            {cs.components.map((c) => (
              <div key={c.name} className="grid grid-cols-2 gap-4 border-b border-border bg-card px-5 py-4 text-sm last:border-b-0">
                <span className="font-medium text-foreground">{c.name}</span>
                <span>{c.purpose}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block id="screens" num="07" title="Key & Final Screens">
          <MaskReveal>
            <ZoomImage project={project} className="aspect-[16/9]" onOpen={open} />
          </MaskReveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cs.keyScreens.map((k, i) => (
              <div key={k.title} className="border-l-2 border-accent pl-4">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 font-display font-bold text-foreground">{k.title}</p>
                <p className="mt-1 text-sm">{k.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs">Click the image to view it full screen.</p>
        </Block>

        <Block id="prototype" num="08" title="Design File">
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="cta"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            View Design <ArrowUpRight className="size-4" />
          </a>
        </Block>

        <Block id="outcome" num="09" title="Design Outcome">
          <ul className="grid gap-3 sm:grid-cols-3">
            {cs.outcome.map((o) => (
              <li key={o} className="rounded-2xl border border-border bg-card p-5 text-sm text-foreground">{o}</li>
            ))}
          </ul>
        </Block>

        
<Reveal className="mt-16 rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="font-display text-2xl font-extrabold sm:text-4xl">Interested in working together?</h2>
          <p className="mt-3 opacity-75">Let's create something meaningful.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" hash="contact" data-cursor="cta" className="rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground">
              Let's Talk
            </Link>
            <a href={profile.resumeUrl} download data-cursor="cta" className="inline-flex items-center gap-2 rounded-full border border-current/30 px-6 py-3.5 text-sm font-medium">
              Download Resume <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>

        <nav aria-label="More projects" className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link to="/work/$slug" params={{ slug: prev.slug }} data-cursor="cta" className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50">
            <span className="eyebrow">Previous Project</span>
            <p className="mt-2 flex items-center gap-2 font-display text-xl font-bold">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> {prev.name}
            </p>
          </Link>
          <Link to="/work/$slug" params={{ slug: next.slug }} data-cursor="cta" className="group rounded-2xl border border-border bg-card p-6 text-right transition-colors hover:border-accent/50">
            <span className="eyebrow">Next Project</span>
            <p className="mt-2 flex items-center justify-end gap-2 font-display text-xl font-bold">
              {next.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </nav>
      </main>
      <Footer />
      {lightbox && project.image && <Lightbox src={project.image} alt={project.imageAlt} onClose={() => setLightbox(false)} />}
    </>
  );
}
