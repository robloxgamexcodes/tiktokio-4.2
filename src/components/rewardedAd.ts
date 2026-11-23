// src/components/rewardedAd.ts
// Google Ad Manager rewarded ad (opt-in).
//  - initRewarded(): called when a result screen mounts (AdSlot.tsx). Requests the rewarded ad in the background.
//  - offerRewarded(): called on every download click. If an ad is ready and none was offered this session,
//    a small non-blocking banner asks the visitor whether they want to watch it. Downloads are never delayed.

const AD_UNIT = "/213794966,23337107551/display-2026/tiktokio.com_rewarded_ads";
const SESSION_KEY = "tk_rewarded_offered";
const BANNER_ID = "tk-rewarded-offer";
const OFFER_DELAY_MS = 1500; // let the download start first
const BANNER_VISIBLE_MS = 15000;

const w = (typeof window !== "undefined" ? window : {}) as any;

let slot: any = null;
let readyEvent: any = null;
let initialised = false;

function alreadyOffered(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return !!w.__tkRewardedOffered;
  }
}

function markOffered() {
  w.__tkRewardedOffered = true;
  try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
}

function removeBanner() {
  document.getElementById(BANNER_ID)?.remove();
}

function showBanner(message: string, withButtons: boolean) {
  removeBanner();
  const box = document.createElement("div");
  box.id = BANNER_ID;
  box.setAttribute("role", "dialog");
  box.style.cssText =
    "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99999;max-width:92vw;" +
    "display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;" +
    "background:#111;color:#fff;padding:12px 16px;border-radius:10px;font:14px/1.4 system-ui,sans-serif;" +
    "box-shadow:0 6px 24px rgba(0,0,0,.35)";

  const text = document.createElement("span");
  text.textContent = message;
  box.appendChild(text);

  if (withButtons) {
    const watch = document.createElement("button");
    watch.textContent = "Watch ad";
    watch.style.cssText = "background:#d97706;color:#fff;border:0;border-radius:6px;padding:6px 12px;font-weight:600;cursor:pointer";
    watch.onclick = () => {
      removeBanner();
      try { readyEvent?.makeRewardedVisible(); } catch (err) { console.warn("Rewarded ad could not be shown:", err); }
    };

    const no = document.createElement("button");
    no.textContent = "No thanks";
    no.style.cssText = "background:transparent;color:#ddd;border:1px solid #666;border-radius:6px;padding:6px 12px;cursor:pointer";
    no.onclick = removeBanner;

    box.appendChild(watch);
    box.appendChild(no);
  }

  document.body.appendChild(box);
  window.setTimeout(removeBanner, withButtons ? BANNER_VISIBLE_MS : 4000);
}

/** Request the rewarded ad once per page view (skipped if it was already offered this session). */
export function initRewarded() {
  if (typeof window === "undefined" || initialised || alreadyOffered()) return;
  initialised = true;

  w.googletag = w.googletag || { cmd: [] };
  w.googletag.cmd.push(() => {
    const g = w.googletag;
    slot = g.defineOutOfPageSlot(AD_UNIT, g.enums.OutOfPageFormat.REWARDED);
    if (!slot) return; // rewarded format not supported here: do nothing

    slot.addService(g.pubads());

    g.pubads().addEventListener("rewardedSlotReady", (e: any) => {
      if (e.slot === slot) readyEvent = e;
    });
    g.pubads().addEventListener("rewardedSlotGranted", (e: any) => {
      if (e.slot === slot) showBanner("Thank you for supporting TikTokio!", false);
    });
    g.pubads().addEventListener("rewardedSlotClosed", (e: any) => {
      if (e.slot !== slot) return;
      readyEvent = null;
      removeBanner();
      g.destroySlots([slot]);
      slot = null;
    });

    g.enableServices();
    g.display(slot);
  });
}

/** Call on a download click. Shows the opt-in banner only if an ad is ready and none was offered this session. */
export function offerRewarded() {
  if (typeof window === "undefined" || !readyEvent || alreadyOffered()) return;
  window.setTimeout(() => {
    if (!readyEvent || alreadyOffered()) return;
    markOffered();
    showBanner("Enjoying TikTokio? Watch a short ad to support us (optional).", true);
  }, OFFER_DELAY_MS);
}
