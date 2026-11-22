// src/components/ResultAd.tsx
// Ad placed in the result section, right after the "Download Profile Picture" button.
// Inline <script> tags don't execute inside Solid JSX, so the ad script is injected on mount.
import { onMount } from "solid-js";

const AD_SRC = "//kr.sayyidvanglo.com/ttLa3pgvx5WAEtc/161737";

function ResultAd() {
  let box: HTMLDivElement | undefined;

  onMount(() => {
    if (!box) return;
    const s = document.createElement("script");
    s.setAttribute("data-cfasync", "false");
    s.async = true;
    s.type = "text/javascript";
    s.src = AD_SRC;
    box.appendChild(s);
  });

  return (
    <div class="flex justify-center items-center w-full my-4">
      <div ref={box} />
    </div>
  );
}

export default ResultAd;
