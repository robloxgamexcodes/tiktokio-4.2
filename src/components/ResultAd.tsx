// src/components/ResultAd.tsx
// Ad placed in the result section, right after the "Download Profile Picture" button.
// Inline <script> tags don't execute inside Solid JSX, so the ad script is injected on mount.
// Also exposes triggerResultAdClick() so Download buttons can programmatically engage the ad.
import { onMount } from "solid-js";

const AD_SRC = "//om.serragebewit.com/tMUYVVn3bUJso2/161737";
const AD_CONTAINER_ID = "tiktokio-result-ad";

/** Programmatically engage the result ad (call from any Download click handler). */
export function triggerResultAdClick() {
  if (typeof document === "undefined") return;
  try {
    const box = document.getElementById(AD_CONTAINER_ID);
    if (!box) return;

    // Prefer clicking a real interactive element the ad script may have injected
    const clickable =
      box.querySelector<HTMLElement>("a[href], button, [onclick], [role='button']") ||
      box.querySelector<HTMLElement>("iframe") ||
      box;

    // Use a real MouseEvent so listeners that check isTrusted / event type still fire when possible
    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    clickable.dispatchEvent(evt);

    // Fallback: also call .click() for elements that only listen via the property
    if (typeof (clickable as any).click === "function") {
      (clickable as any).click();
    }
  } catch (err) {
    console.error("ResultAd trigger failed:", err);
  }
}

function ResultAd() {
  let box: HTMLDivElement | undefined;

  onMount(() => {
    if (!box) return;
    // Avoid injecting the same script more than once into this container
    if (box.querySelector(`script[src="${AD_SRC}"]`)) return;

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
