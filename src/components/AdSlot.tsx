// src/components/AdSlot.tsx
// Result-section ad (3rd-party network).
//
// The exact ad snippet is run inside its own same-origin <iframe srcdoc>. This is more reliable than
// injecting the <script> into a Solid component: the script always runs on a fresh document, it finds its
// container by id immediately, and it can never be skipped by a "already loaded" guard when the result
// screen is shown more than once. The frame grows/shrinks to fit whatever the network renders.
import { onMount, onCleanup } from "solid-js";

const AD_ID = "531da32ec3fcb205a3490d7e5bc1f538";

const AD_DOC = `<!doctype html><html><head><meta charset="utf-8">
<base target="_blank">
<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{display:flex;justify-content:center}</style>
</head><body>
<script async="async" data-cfasync="false" src="https://bancadeltempoidea.org/21/${AD_ID}"></script>
<div id="container-${AD_ID}"></div>
</body></html>`;

function AdSlot() {
  let frame: HTMLIFrameElement | undefined;
  let timer: number | undefined;

  const fit = () => {
    try {
      const doc = frame?.contentDocument;
      if (!frame || !doc?.body) return;
      const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      if (h > 0) frame.style.height = h + "px";
    } catch {
      /* cross-origin: keep default height */
    }
  };

  onMount(() => {
    // Resize to the ad's real height (ads render a moment after load).
    timer = window.setInterval(fit, 700);
    window.setTimeout(() => timer && window.clearInterval(timer), 30000);
  });

  onCleanup(() => {
    if (timer) window.clearInterval(timer);
  });

  return (
    <div class="flex justify-center items-center w-full my-4">
      <iframe
        ref={frame}
        title="Advertisement"
        srcdoc={AD_DOC}
        scrolling="no"
        frameborder="0"
        onLoad={fit}
        style={{ width: "100%", "max-width": "336px", "min-height": "250px", border: "0", overflow: "hidden" }}
      />
    </div>
  );
}

export default AdSlot;
