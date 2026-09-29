import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "li" | "article" | "figure" | "header";

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const Comp = Tag as "div";

  return (
    <Comp ref={ref} data-visible={visible} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", className)}>
      {children}
    </Comp>
  );
}

/** Clipped mask reveal with a subtle 1.03 → 1 settle. Use for images / large previews. */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("mask-reveal", className)}
    >
      {children}
    </div>
  );
}

/** Staggered word-by-word heading reveal. */
export function RevealText({
  text,
  className,
  accentFrom,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  /** Word index from which the accent colour applies (inclusive). */
  accentFrom?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const { ref, visible } = useInView<HTMLHeadingElement>(0.25);
  const words = text.split(" ");
  const Comp = Tag as "h2";

  return (
    <Comp ref={ref} data-visible={visible} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="word-reveal">
          <span
            style={{ transitionDelay: `${i * 45}ms` }}
            className={accentFrom !== undefined && i >= accentFrom ? "text-accent" : undefined}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Comp>
  );
}
