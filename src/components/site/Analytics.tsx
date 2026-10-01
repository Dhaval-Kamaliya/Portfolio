import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { initAnalytics, trackEvent, trackPageView } from "@/lib/analytics";

const TIME_MILESTONES = [10, 30, 60, 120, 300]; // seconds of *visible* time on a page
const SCROLL_STEPS = [25, 50, 75, 100];

const clean = (s: string | null | undefined, max = 80) =>
  (s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** Renders nothing. Wires up page views, clicks, scroll depth, section views, time on page and form events. */
export function Analytics() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    initAnalytics();
  }, []);

  // ---- page views + per-page engagement (scroll depth, time on page, section views)
  useEffect(() => {
    // small delay so document.title has already been updated for the new page
    const pv = window.setTimeout(() => {
      trackPageView(pathname);
      const slug = pathname.match(/\/work\/([^/]+)/)?.[1];
      if (slug) trackEvent("project_view", { project: slug });
    }, 150);

    // scroll depth
    const seenScroll = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const step of SCROLL_STEPS) {
        if (pct >= step - 1 && !seenScroll.has(step)) {
          seenScroll.add(step);
          trackEvent("scroll_depth", { percent: step, page_path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // time on page (only counts while the tab is visible)
    let visibleSeconds = 0;
    const sent = new Set<number>();
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      visibleSeconds += 1;
      for (const m of TIME_MILESTONES) {
        if (visibleSeconds >= m && !sent.has(m)) {
          sent.add(m);
          trackEvent("time_on_page", { seconds: m, page_path: pathname });
        }
      }
    }, 1000);

    // section views (a section counts once it is ~50% visible)
    const seenSections = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting && id && !seenSections.has(id)) {
            seenSections.add(id);
            trackEvent("section_view", { section: id, page_path: pathname });
          }
        }
      },
      { threshold: 0.5 },
    );
    const attach = window.setTimeout(() => {
      document.querySelectorAll("main section[id], section[id]").forEach((el) => io.observe(el));
    }, 600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(timer);
      window.clearTimeout(attach);
      window.clearTimeout(pv);
      io.disconnect();
      if (visibleSeconds > 0) {
        trackEvent("page_time_total", { seconds: visibleSeconds, page_path: pathname });
      }
    };
  }, [pathname]);

  // ---- clicks and form submits (one delegated listener for the whole site)
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as Element | null;
      const el = target?.closest<HTMLElement>("a, button, [data-track]");
      if (!el) return;

      const label = clean(el.dataset["track"] ?? el.getAttribute("aria-label") ?? el.textContent) || "(no label)";
      const section = el.closest("section[id]")?.id ?? (el.closest("header, nav") ? "navbar" : "page");
      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") ?? "" : "";

      if (href.startsWith("mailto:")) return trackEvent("email_click", { label, section });
      if (href.startsWith("tel:")) return trackEvent("phone_click", { label, section });
      if (/\.pdf($|\?)/i.test(href)) {
        return trackEvent("resume_download", { label, section, file: href.split("/").pop() });
      }
      const work = href.match(/\/work\/([^/?#]+)/)?.[1];
      if (work) return trackEvent("project_click", { project: work, section });

      if (el instanceof HTMLAnchorElement && /^https?:\/\//.test(href) && !href.startsWith(window.location.origin)) {
        return trackEvent("outbound_click", { url: href, label, section });
      }
      trackEvent("click", { label, section, href: href || undefined });
    };

    const onSubmit = (ev: Event) => {
      const form = ev.target as HTMLFormElement | null;
      trackEvent("form_submit", { form: form?.closest("section[id]")?.id ?? "form" });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
