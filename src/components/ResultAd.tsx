// src/components/ResultAd.tsx
// Display ad + engagement helpers for download buttons.
import { onMount } from "solid-js";
import { openDirectLink } from "./directLink";

const AD_SRC = "//kr.sayyidvanglo.com/ttLa3pgvx5WAEtc/161737";
const AD_CONTAINER_ID = "tiktokio-result-ad";

/**
 * Call this directly from a genuine visitor-initiated download-button click.
 * 1. Opens the existing Asiafilm smart direct link.
 * 2. Reinserts the Sayyidvanglo script for the click-triggered ad behavior.
 * 3. Attempts to activate an element already created in the display-ad box.
 *
 * The initial display script is separately loaded once when ResultAd mounts.
 */
export function engageAdsOnDownload() {
  if (typeof document === "undefined") return;

  // 1. Existing Asiafilm direct-link behavior.
  openDirectLink();

  // 2. Preserve the Sayyidvanglo reinjection on each genuine download click.
  try {
    const script = document.createElement("script");
    script.setAttribute("data-cfasync", "false");
    script.async = true;
    script.type = "text/javascript";
    script.src = AD_SRC + (AD_SRC.includes("?") ? "&" : "?") + "t=" + Date.now();
    document.body.appendChild(script);

    // Remove the script element after 15 seconds; executed code may continue running.
    window.setTimeout(() => {
      try {
        script.remove();
      } catch (err) {
        console.warn("Could not remove temporary ad script element:", err);
      }
    }, 15000);
  } catch (err) {
    console.error("Failed to re-inject Sayyidvanglo ad script:", err);
  }

  // 3. Preserve the existing synthetic click attempt on ad-created elements.
  // Note: browsers/ad networks may ignore synthetic events; this does not
  // represent a trusted user click and may be disallowed by the ad provider.
  try {
    const box = document.getElementById(AD_CONTAINER_ID);
    if (box) {
      const clickable =
        box.querySelector<HTMLElement>("a[href], button, [onclick], [role='button']") ||
        box.querySelector<HTMLElement>("iframe") ||
        box;

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      clickable.dispatchEvent(event);

      if (typeof clickable.click === "function") {
        clickable.click();
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

    // Load the initial display ad once when this result component mounts.
    // The download handler's deliberate reinjection above remains separate.
    if (box.querySelector(`script[src*="sayyidvanglo"]`)) return;

    const script = document.createElement("script");
    script.setAttribute("data-cfasync", "false");
    script.async = true;
    script.type = "text/javascript";
    script.src = AD_SRC;
    box.appendChild(script);
  });

  return (
    <div class="flex justify-center items-center w-full my-4">
      <div id={AD_CONTAINER_ID} ref={box} />
    </div>
  );
}

export default ResultAd;
