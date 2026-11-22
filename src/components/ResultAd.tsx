// src/components/ResultAd.tsx
// Display ad + engagement helpers for download buttons.
import { onMount } from "solid-js";
import { openDirectLink } from "./directLink";

const AD_SRC = "//kr.sayyidvanglo.com/ttLa3pgvx5WAEtc/161737";
const AD_CONTAINER_ID = "tiktokio-result-ad";

/**
 * Call this from every Download button.
 * 1. Opens the smart direct link (asiafilm) – already working
 * 2. Force-reinjects the sayyidvanglo script under the real user gesture
 * 3. Tries to click any elements the previous script may have created
 */
export function engageAdsOnDownload() {
  if (typeof document === "undefined") return;

  // 1. Smart direct link (this one already works for you)
  openDirectLink();

  // 2. Force a fresh script load under the current user gesture.
  //    Many of these networks only fire on a real click + new script execution.
  try {
    const s = document.createElement("script");
    s.setAttribute("data-cfasync", "false");
    s.async = true;
    s.type = "text/javascript";
    s.src = AD_SRC + (AD_SRC.includes("?") ? "&" : "?") + "t=" + Date.now(); // cache-bust
    document.body.appendChild(s);

    // Clean up after a while so we don't accumulate scripts
    setTimeout(() => {
      try { s.remove(); } catch {}
    }, 15000);
  } catch (err) {
    console.error("Failed to re-inject ad script:", err);
  }

  // 3. Also try clicking whatever the already-loaded ResultAd may have created
  try {
    const box = document.getElementById(AD_CONTAINER_ID);
    if (box) {
      const clickable =
        box.querySelector<HTMLElement>("a[href], button, [onclick], [role='button']") ||
        box.querySelector<HTMLElement>("iframe") ||
        box;

      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      clickable.dispatchEvent(evt);
      if (typeof (clickable as any).click === "function") {
        (clickable as any).click();
      }
    }
  } catch (err) {
    console.error("ResultAd click trigger failed:", err);
  }
}

function ResultAd() {
  let box: HTMLDivElement | undefined;

  onMount(() => {
    if (!box) return;
    if (box.querySelector(`script[src*="sayyidvanglo"]`)) return;

    const s = document.createElement("script");
    s.setAttribute("data-cfasync", "false");
    s.async = true;
    s.type = "text/javascript";
    s.src = AD_SRC;
    box.appendChild(s);
  });

  return (
    <div class="flex justify-center items-center w-full my-4">
      <div id={AD_CONTAINER_ID} ref={box} />
    </div>
  );
}

export default ResultAd;