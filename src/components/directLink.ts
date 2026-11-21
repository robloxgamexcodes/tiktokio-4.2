// src/components/directLink.ts
// Opens the ad-network direct link in a new tab whenever a download button is clicked.
// MUST be called synchronously inside the click handler (before any `await`),
// otherwise browsers treat window.open() as a popup and block it.

export const DIRECT_LINK = "https://asiafilm.org/4/22bc114ba1505cadd4b7554cee7bb4ac";

// 1 = every download click, 2 = every 2nd click, etc.
const OPEN_EVERY_N_CLICKS = 1;

let clicks = 0;

export function openDirectLink() {
  if (typeof window === "undefined") return;
  clicks += 1;
  if (clicks % OPEN_EVERY_N_CLICKS !== 0) return;
  try {
    window.open(DIRECT_LINK, "_blank", "noopener,noreferrer");
  } catch (err) {
    console.error("Direct link failed to open:", err);
  }
}
