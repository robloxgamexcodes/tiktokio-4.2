// src/components/AdSlot.tsx
// Result-section ad (3rd-party network).
//
// The exact ad snippet is run inside its own same-origin <iframe srcdoc>. This is more reliable than
// injecting the <script> into a Solid component: the script always runs on a fresh document, it finds its
// container by id immediately, and it can never be skipped by a "already loaded" guard when the result
// screen is shown more than once. The frame grows/shrinks to fit whatever the network renders.

const AD_ID = "531da32ec3fcb205a3490d7e5bc1f538";

const AD_DOC = `<!doctype html><html><head><meta charset="utf-8">
<base target="_blank">
<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{display:flex;justify-content:center}</style>
</head><body>
<script async="async" data-cfasync="false" src="https://bancadeltempoidea.org/21/${AD_ID}"></script>
<div id="container-${AD_ID}"></div>
</body></html>`;

function AdSlot() {
  // Fixed 336x280 box: the ad renders inside it without ever moving the content below (CLS),
  // and there is no polling timer touching the iframe document (INP / forced layout).
  return (
    <div
      class="flex justify-center items-start w-full my-4"
      style={{ height: "280px", contain: "layout paint" }}
    >
      <iframe
        title="Advertisement"
        data-ad-slot="bancadeltempo"
        data-ad-id={AD_ID}
        srcdoc={AD_DOC}
        scrolling="no"
        frameborder="0"
        loading="lazy"
        style={{ width: "100%", "max-width": "336px", height: "280px", border: "0", overflow: "hidden" }}
      />
    </div>
  );
}

export default AdSlot;
