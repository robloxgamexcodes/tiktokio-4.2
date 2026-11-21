// src/components/AdSlot.tsx
// Reusable GPT ad slot for Solid components (inline <script> tags do not run inside JSX).
import { onMount, onCleanup } from "solid-js";
import { registerAdSlot } from "./adRefresh";

const AD_UNIT = "/213794966,23337107551/display-2026/tiktokio.com_336x280";
const GPT_SRC = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

function AdSlot(props: { id: string }) {
  let slot: any = null;
  let unregister: (() => void) | null = null;

  onMount(() => {
    const w = window as any;
    w.googletag = w.googletag || { cmd: [] };

    if (!document.querySelector(`script[src="${GPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = GPT_SRC;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    }

    w.googletag.cmd.push(() => {
      slot = w.googletag
        .defineSlot(AD_UNIT, [[1, 1], [300, 250], [320, 250], [336, 280]], props.id)
        ?.addService(w.googletag.pubads());
      w.googletag.enableServices();
      w.googletag.display(props.id);
      if (slot) unregister = registerAdSlot(slot, props.id);
    });
  });

  onCleanup(() => {
    const w = window as any;
    unregister?.();
    if (slot && w.googletag?.destroySlots) w.googletag.cmd.push(() => w.googletag.destroySlots([slot]));
  });

  return (
    <div class="flex justify-center items-center w-full my-4">
      <div id={props.id} style={{ "min-width": "300px", "min-height": "250px" }} />
    </div>
  );
}

export default AdSlot;
