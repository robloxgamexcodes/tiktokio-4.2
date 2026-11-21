// src/components/startDownload.ts
// Starts a file download WITHOUT ever navigating the current page.
//
// Why: `<a download>` is ignored by browsers for cross-origin URLs (our files come from
// dl.tiktokiocdn.workers.dev), so a plain anchor click navigates the site tab to that URL.
// If that request hiccups (e.g. ERR_QUIC_PROTOCOL_ERROR) the visitor is left on an error page.
// A hidden iframe downloads the same attachment response, and any error stays inside the iframe.

export function startDownload(url: string, filename: string) {
  if (typeof document === "undefined" || !url) return;

  let sameOrigin = false;
  try {
    sameOrigin = new URL(url, window.location.href).origin === window.location.origin;
  } catch {}

  if (sameOrigin) {
    // Same-origin: the download attribute works and keeps our filename.
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => link.remove(), 100);
    return;
  }

  // Cross-origin: hidden iframe, page never navigates.
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.setAttribute("aria-hidden", "true");
  iframe.src = url;
  document.body.appendChild(iframe);
  setTimeout(() => iframe.remove(), 60_000);
}
