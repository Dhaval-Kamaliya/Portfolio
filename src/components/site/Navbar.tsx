import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.classList.toggle("dark", dark);
    const t = setTimeout(() => root.classList.remove("theme-anim"), 500);
    return () => clearTimeout(t);
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/75 shadow-[0_10px_30px_-25px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 md:h-20">
        <Link to="/" className="font-display text-sm font-extrabold tracking-[0.18em] uppercase transition-opacity hover:opacity-70">
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`/#${l.id}`}
                className={cn(
                  "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  active === l.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:rotate-12 hover:border-foreground/30 hover:text-foreground"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href="/#contact"
            data-cursor="cta"
            className="group hidden items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 md:inline-flex"
          >
            Let's Talk
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 grid size-9 place-items-center rounded-full border border-border bg-background lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 top-0 -z-0 flex flex-col bg-background px-6 pt-24 pb-10 transition-all duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {navLinks.map((l, i) => (
            <li
              key={l.id}
              className={cn("transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <a
                href={`/#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-border py-4 font-display text-3xl font-bold"
              >
                {l.label}
                <span className="eyebrow">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/#contact"
          onClick={() => setOpen(false)}
          className="mt-auto block rounded-full bg-accent px-5 py-4 text-center text-sm font-medium text-accent-foreground"
        >
          Let's Talk
        </a>
      </div>
    </header>
  );
}
