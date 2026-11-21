// src/components/adRefresh.ts
// Policy-friendly ad refresh: after every 5th–6th download click (per visitor/browser),
// request a fresh ad for the on-screen GPT slot(s). No synthetic clicks – just a normal
// GPT refresh() so a new impression/auction happens.
//
// Safeguards:
//  - only refreshes slots that are at least 50% inside the viewport (viewable)
//  - only when the tab is visible
//  - never refreshes the same slots more often than every 30 seconds
//  - the trigger is a real user action (a download click)

const COUNT_KEY = "ad_dl_count";
const TARGET_KEY = "ad_dl_target";
const MIN_INTERVAL_MS = 30_000;
const MIN_TARGET = 5;
const MAX_TARGET = 6;

type Registered = { slot: any; elementId: string };

const w = (typeof window !== "undefined" ? window : {}) as any;
// Keep state on window so separate Astro islands share one registry.
w.__adSlots = w.__adSlots || new Set<Registered>();
w.__adLastRefresh = w.__adLastRefresh || 0;
const memory: Record<string, string> = {};

function read(key: string): number {
  try {
    const v = localStorage.getItem(key) ?? memory[key];
    return v ? parseInt(v, 10) || 0 : 0;
  } catch {
    return memory[key] ? parseInt(memory[key], 10) || 0 : 0;
  }
}

function write(key: string, value: number) {
  memory[key] = String(value);
  try { localStorage.setItem(key, String(value)); } catch {}
}

function randomTarget() {
  return MIN_TARGET + Math.floor(Math.random() * (MAX_TARGET - MIN_TARGET + 1)); // 5 or 6
}

function isViewable(el: HTMLElement | null): boolean {
  if (!el || document.visibilityState !== "visible") return false;
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return false;
  const visibleH = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
  const visibleW = Math.min(r.right, window.innerWidth) - Math.max(r.left, 0);
  if (visibleH <= 0 || visibleW <= 0) return false;
  return (visibleH * visibleW) / (r.width * r.height) >= 0.5;
}

/** Called by AdSlot once its GPT slot exists. Returns an unregister function. */
export function registerAdSlot(slot: any, elementId: string): () => void {
  const entry: Registered = { slot, elementId };
  w.__adSlots.add(entry);
  return () => w.__adSlots.delete(entry);
}

function refreshViewableSlots(): boolean {
  if (Date.now() - w.__adLastRefresh < MIN_INTERVAL_MS) return false;

  const slots: any[] = [];
  w.__adSlots.forEach((s: Registered) => {
    if (isViewable(document.getElementById(s.elementId))) slots.push(s.slot);
  });
  if (!slots.length || !w.googletag?.cmd) return false;

  w.__adLastRefresh = Date.now();
  w.googletag.cmd.push(() => w.googletag.pubads().refresh(slots));
  return true;
}

/**
 * Call this on every download click (any button). Every 5th–6th click the
 * visible ad is refreshed. If a refresh isn't allowed yet (ad off-screen or
 * <30s since the last one) the counter keeps its value and the next click retries.
 */
export function onDownloadAction() {
  let count = read(COUNT_KEY) + 1;
  let target = read(TARGET_KEY) || randomTarget();
  write(TARGET_KEY, target);

  if (count >= target) {
    if (refreshViewableSlots()) {
      count = 0;
      write(TARGET_KEY, randomTarget());
    }
  }
  write(COUNT_KEY, count);
}
