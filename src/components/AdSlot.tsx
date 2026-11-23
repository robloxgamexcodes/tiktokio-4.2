// src/components/AdSlot.tsx
// Result-section ad slot (3rd-party network). Solid/JSX does not execute inline <script> tags,
// so the network script is injected from onMount. The container id MUST stay exactly as below,
// because the ad script looks it up by id.
import { onMount, onCleanup } from "solid-js";

const CONTAINER_ID = "container-531da32ec3fcb205a3490d7e5bc1f538";
const AD_SRC = "https://bancadeltempoidea.org/21/531da32ec3fcb205a3490d7e5bc1f538";

function AdSlot() {
  let wrapper: HTMLDivElement | undefined;
  let script: HTMLScriptElement | null = null;

  onMount(() => {
    if (!wrapper) return;
    // Fresh <script> element each time the result screen mounts, so the ad re-runs on every result.
    script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = AD_SRC;
    wrapper.appendChild(script);
  });

  onCleanup(() => {
    script?.remove();
    script = null;
  });

  return (
    <div ref={wrapper} class="flex justify-center items-center w-full my-4">
      <div id={CONTAINER_ID}></div>
    </div>
  );
}

export default AdSlot;
