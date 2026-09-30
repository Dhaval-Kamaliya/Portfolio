import { useState } from "react";
import { Mail, MapPin, Phone, ArrowUpRight, Plus, Minus, Send } from "lucide-react";
import { toast } from "sonner";
import {
  experience,
  navLinks,
  processSteps,
  profile,
  portrait,
  coreSkills,
  tools,
  services,
  thinking,
} from "@/data/portfolio";
import { Reveal, RevealText } from "./Reveal";
import { cn } from "@/lib/utils";

export function About() {
  const facts = [
    { big: "2.5+", small: "Years Experience" },
    { big: "Web + Mobile", small: "Design" },
    { big: "UI/UX", small: "Design" },
    { big: "Design + Visual", small: "Experience" },
  ];

  return (
    <section id="about" className="scroll-mt-24 border-t border-border py-20 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface">
              {portrait ? (
                <img
                  src={portrait}
                  alt="Dhaval Kamaliya, UI/UX Designer"
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              ) : null}
            </div>
            <div className="absolute -right-3 -bottom-3 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-[0_20px_50px_-40px_rgba(0,0,0,0.6)]">
              <span className="eyebrow">Based in</span>
              <p className="mt-1">{profile.location}</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">02 — About Me</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
              Designing with purpose, not just pixels.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                I'm a creative and user-focused UI/UX Designer with 2.5+ years of experience designing web and mobile
                experiences. I enjoy transforming complex requirements into simple, intuitive, and visually engaging
                digital products.
              </p>
              <p>
                My approach combines user-centered thinking, visual design, interaction design, and collaboration with
                developers and product teams.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.small + f.big} className="bg-card p-5">
                  <dt className="font-display text-lg font-bold">{f.big}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{f.small}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="scroll-mt-24 border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">03 — Experience</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">A short product timeline.</h2>
        </Reveal>

        <ol className="mt-12 border-l border-border pl-6 sm:pl-10">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={job.company} delay={i * 80} className="relative pb-10 last:pb-0">
                <span className="absolute top-2 -left-[31px] size-2.5 rounded-full bg-accent ring-4 ring-background sm:-left-[47px]" />
                <div className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="eyebrow">{job.dates}</span>
                      <h3 className="mt-2 font-display text-xl font-bold">{job.company}</h3>
                      <p className="text-sm text-muted-foreground">{job.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Hide" : "Show"} responsibilities at ${job.company}`}
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </button>
                  </div>
                  <div
                    className="grid transition-all duration-400"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
                        {job.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">04 — Design Process</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">How I Approach Design</h2>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-5">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.num} delay={i * 60} className="group bg-card p-6 transition-colors hover:bg-surface">
              <span className="font-display text-2xl font-extrabold text-accent">{s.num}</span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Skills & Tools</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">What I work with.</h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <span className="eyebrow">Core Skills</span>
              <ul className="mt-5 flex flex-wrap gap-2">
                {coreSkills.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <span className="eyebrow">Tools — Experienced With</span>
              <ul className="mt-5 flex flex-wrap gap-2">
                {tools.experienced.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-7">
            <span className="eyebrow">Tools — Working Knowledge</span>
            <ul className="mt-5 flex flex-wrap gap-2">
              {tools.working.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">05 — Services</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">What I can help with.</h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.primary.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <article
                data-cursor="image"
                className="group h-full bg-card p-7 transition-colors hover:bg-surface"
              >
                <span className="eyebrow">0{((i % 8) + 1)}</span>
                <h3 className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-accent">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap gap-2">
            {services.secondary.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Thinking() {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Design Philosophy</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">What I bring to the table.</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {thinking.map((t, i) => (
            <Reveal key={t} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span className="eyebrow">0{i + 1}</span>
                <p className="mt-4 font-display text-lg font-bold transition-colors group-hover:text-accent">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResumeCta() {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-14">
            <div className="noise pointer-events-none absolute inset-0 opacity-10" />
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.08]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
                Have a product that needs a better experience?
              </h2>
              <p className="mt-5 opacity-80">Let's create something simple, useful, and meaningful.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href="#contact"
                  data-cursor="cta"
                  className="rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Let's Talk
                </a>
                <a
                  href={profile.resumeUrl}
                  download="Dhaval_Kamaliya_Resume.pdf"
                  data-cursor="cta"
                  className="rounded-full border border-current/30 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-20 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <span className="eyebrow">06 — Contact</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">Let's create something meaningful.</h2>
            <p className="mt-5 text-muted-foreground">
              I'm always open to discussing new projects, product ideas, design opportunities, and collaborations.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <ul className="mt-10 space-y-4 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 transition-colors hover:text-accent">
                  <span className="grid size-8 place-items-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:bg-accent/10">
                    <Mail className="size-3.5 text-muted-foreground" />
                  </span>
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 transition-colors hover:text-accent">
                  <span className="grid size-8 place-items-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:bg-accent/10">
                    <Phone className="size-3.5 text-muted-foreground" />
                  </span>
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="grid size-8 place-items-center rounded-full border border-border">
                  <MapPin className="size-3.5" />
                </span>
                {profile.location}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="cta"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    {s.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);

              setStatus("sending");
              const params = new URLSearchParams({
                subject: String(data.get("subject") ?? ""),
                body: `${data.get("message") ?? ""}\n\n— ${data.get("name") ?? ""} (${data.get("email") ?? ""})`,
              });

              setTimeout(() => {
                window.location.href = `mailto:${profile.email}?${params.toString()}`;
                setStatus("sent");
                toast.success("Opening your email app…");
                form.reset();
                setTimeout(() => setStatus("idle"), 2000);
              }, 400);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" placeholder="What's this about?" />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="eyebrow">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me a little about the project…"
                className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              data-cursor="cta"
              className={cn(
                "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
                status === "sent"
                  ? "bg-green-600 text-white"
                  : "bg-primary text-primary-foreground",
              )}
            >
              {status === "sending" ? (
                "Opening…"
              ) : status === "sent" ? (
                "Sent"
              ) : (
                <>
                  Send Message
                  <Send className="size-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent"
      />
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-sm font-extrabold tracking-[0.18em] uppercase">{profile.name}</p>
          <p className="mt-1 eyebrow">UI/UX Designer</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Designing digital experiences with purpose.
          </p>
        </div>
        <nav aria-label="Footer">
          <span className="eyebrow">Navigate</span>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`/#${l.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <span className="eyebrow">Elsewhere</span>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
                {profile.email}
              </a>
            </li>
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[1280px] border-t border-border px-5 pt-6 text-xs text-muted-foreground sm:px-8">
        © {year} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
