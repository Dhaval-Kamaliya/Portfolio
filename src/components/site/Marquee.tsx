import { cn } from "@/lib/utils";

export function Marquee({
  items,
  reverse = false,
  duration = "40s",
  className,
}: {
  items: string[];
  reverse?: boolean;
  duration?: string;
  className?: string;
}) {
  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-4 whitespace-nowrap">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-3xl font-extrabold sm:text-4xl">{item}</span>
        </span>
      ))}
    </>
  );

  return (
    <div
      data-reverse={reverse}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
      className={cn(
        "marquee group relative flex overflow-hidden border-y border-border py-8 md:py-12 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
        className,
      )}
    >
      <div className="marquee-track flex min-w-full shrink-0 items-center justify-around gap-8 pr-8 md:gap-14 md:pr-14">
        {row}
      </div>
      <div className="marquee-track flex min-w-full shrink-0 items-center justify-around gap-8 pr-8 md:gap-14 md:pr-14" aria-hidden="true">
        {row}
      </div>
    </div>
  );
}
