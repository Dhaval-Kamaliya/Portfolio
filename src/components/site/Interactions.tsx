import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Thin scroll progress line pinned to the very top of the viewport. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent">
      <div
        className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

const LABELS: Record<string, string> = {
  project: "VIEW",
  image: "EXPLORE",
  cta: "CLICK",
  case: "OPEN",
};

/** Desktop-only custom cursor. Elements opt in with data-cursor="project|image|cta|case". */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setActive(true);
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const key = target?.dataset["cursor"];
      setLabel(key ? (LABELS[key] ?? null) : null);
    };
    const onLeave = () => setActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={ref}
      className={cn(
        "cursor-dot text-[10px] font-semibold tracking-[0.18em]",
        label ? "size-16 bg-accent text-accent-foreground" : "size-3 bg-foreground",
        active ? "opacity-100" : "opacity-0",
      )}
    >
      {label}
    </div>
  );
}

/** Floating back-to-top button, appears after the hero. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      data-cursor="cta"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "group fixed right-5 bottom-5 z-50 grid size-11 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-[0_18px_40px_-28px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}

/** Subtle floating "Let's Talk" CTA — desktop only, appears after the hero. */
export function FloatingTalk() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 900;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="/#contact"
      data-cursor="cta"
      className={cn(
        "group fixed bottom-5 left-5 z-50 hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_22px_50px_-30px_rgba(0,0,0,0.8)] transition-all duration-300 lg:inline-flex",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      Let's Talk
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
