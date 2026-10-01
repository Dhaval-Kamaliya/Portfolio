/**
 * Lightweight analytics for the portfolio (Google Analytics 4).
 *
 * 1. Create a free GA4 property at https://analytics.google.com
 * 2. Copy its Measurement ID (looks like G-XXXXXXXXXX) and paste it below.
 *
 * While the ID is still the placeholder, nothing is sent anywhere.
 */
export const GA_MEASUREMENT_ID: string =
  (import.meta.env["VITE_GA_ID"] as string | undefined) ?? "G-XXXXXXXXXX";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const enabled = () => typeof window !== "undefined" && /^G-[A-Z0-9]{6,}$/.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";

let initialised = false;

export function initAnalytics() {
  if (initialised || !enabled()) return;
  initialised = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // GA requires the real `arguments` object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // We send page views ourselves so single-page navigation is counted correctly.
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

export function trackEvent(name: string, params: Params = {}) {
  if (!enabled()) {
    if (import.meta.env.DEV) console.info("[analytics:disabled]", name, params);
    return;
  }
  initAnalytics();
  window.gtag?.("event", name, params);
}

export function trackPageView(path: string) {
  trackEvent("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
