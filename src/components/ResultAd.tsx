// src/components/ResultAd.tsx
// Single entry-point for monetisation actions that must run on a real user download click.
//
// 1. openDirectLink()  → opens the asiafilm.org direct-link tab exactly once
// 2. clickAdSlotBanner() → tries to click the banner that lives inside AdSlot.tsx
//
// IMPORTANT: call engageAdsOnDownload() synchronously inside the click handler
// (before any await). Browsers block window.open() that is not tied to a real gesture.

import { openDirectLink } from "./directLink";

/** Same ID used by AdSlot.tsx */
const AD_ID = "531da32ec3fcb205a3490d7e5bc1f538";

/**
 * Attempts to click the banner ad that AdSlot renders inside its srcdoc iframe.
 * The ad network injects content into #container-{AD_ID}.
 * We look for a real <a href> first, then fall back to other clickable elements.
 */
export function clickAdSlotBanner() {
  if (typeof document === "undefined") return;

  // AdSlot iframes are marked with title="Advertisement"
  const frames = document.querySelectorAll<HTMLIFrameElement>(
    'iframe[title="Advertisement"]'
  );

  frames.forEach((frame) => {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;

      const container = doc.getElementById(`container-${AD_ID}`);
      if (!container) return;

      // Prefer a real link (most networks inject <a href="...">)
      const link = container.querySelector<HTMLAnchorElement>("a[href]");
      if (link) {
        // Dispatch a full MouseEvent first (some networks listen for it)
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: frame.contentWindow ?? window,
          })
        );
        // Native click as fallback
        link.click();
        return;
      }

      // Fallback: any element that looks interactive
      const clickable = container.querySelector<HTMLElement>(
        "[onclick], button, [role='button'], [data-click]"
      );
      (clickable ?? container).click();
    } catch {
      // iframe not ready, or script hasn't rendered yet – ignore
    }
  });
}

/**
 * Call this from a genuine download-button click (before any await).
 * Runs both monetisation actions exactly once.
 */
export function engageAdsOnDownload() {
  if (typeof document === "undefined") return;

  // 1. Direct link tab (asiafilm.org) – once
  openDirectLink();

  // 2. Banner ad click inside AdSlot – once
  clickAdSlotBanner();
}

// Default export so both import styles work on Vercel:
//   import { engageAdsOnDownload } from "./ResultAd";
//   import ResultAd, { engageAdsOnDownload } from "./ResultAd";
export default { engageAdsOnDownload, clickAdSlotBanner };
