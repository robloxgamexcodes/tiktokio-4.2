// src/components/ResultAd.tsx
// Download-click helper: opens the asiafilm direct link.
// (The Sayyidvanglo display ad, its script re-injection and the synthetic ad click were removed.)
import { openDirectLink } from "./directLink";

/**
 * Call this directly from a genuine visitor-initiated download-button click
 * (before any `await`, so the browser does not block the new tab).
 */
export function engageAdsOnDownload() {
  if (typeof document === "undefined") return;
  openDirectLink();
}
