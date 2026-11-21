// Data for the "More Links & Resources" section (src/components/morelinks.astro).
// Edit this file to add, remove or re-group links. rel attributes are set in the component.

export type MoreLink = { label: string; url: string; group: string };

export const moreLinksTitle = 'More Links & Resources';
export const moreLinksNote = 'Sponsored and third-party links. TikTokio is not responsible for the content of external sites.';

// Featured Links (badges/widgets). `html` is rendered exactly as written, so verification
// services (e.g. FrogDR) can find the link. Do not add rel/nofollow attributes to these.
export type FeaturedLink = { html: string };

export const featuredLinksTitle = 'Featured Links';

export const moreLinkGroups = ["Online tools", "Streaming & APK sites", "Games & apps"];

export const moreLinks: MoreLink[] = [
  // Online tools
  { label: "Musicallydown", url: "https://musicaldown.se/", group: "Online tools" },
  { label: "mp3paw", url: "https://mp3paw.nu/", group: "Online tools" },
  { label: "White Screen Online", url: "https://whitescrn.com/", group: "Online tools" },
  // Streaming & APK sites
  { label: "SportzX APK", url: "https://sportzxapk.com.co", group: "Streaming & APK sites" },
  { label: "Pikashow APK", url: "https://pikashowtvs.org.in", group: "Streaming & APK sites" },
  { label: "Pikashow", url: "https://pikashowtv.in", group: "Streaming & APK sites" },
  { label: "VidMate", url: "https://vidmateapk.com.in", group: "Streaming & APK sites" },
  { label: "Onstream APK", url: "https://onstreamapp.app/", group: "Streaming & APK sites" },
  { label: "capcut mod apk", url: "https://capcuts.co.com/", group: "Streaming & APK sites" },
  { label: "apk result", url: "https://apkresult.io/", group: "Streaming & APK sites" },
  // Games & apps
  { label: "Pak Rummy Official", url: "https://pak-rummy.com.pk/", group: "Games & apps" },
  { label: "Winpkr", url: "https://winpkr.org/", group: "Games & apps" },
  { label: "Winpkr VIP", url: "https://winpkrvip.org/", group: "Games & apps" },
  { label: "666 Game", url: "https://666-wgame.com.pk/", group: "Games & apps" },
  { label: "A2 Game", url: "https://a2game.com.co/", group: "Games & apps" },
  { label: "Winpkr VIP 2", url: "https://winpkrpc.pk/", group: "Games & apps" },
  { label: "Q988 Game", url: "https://q98.com.pk/", group: "Games & apps" },
  { label: "S9 Pro", url: "https://s9pro.pk/", group: "Games & apps" },
  { label: "N999", url: "https://n999game.net.pk/", group: "Games & apps" },
  { label: "Teen Patti Blue", url: "https://3patiblue.com.pk/", group: "Games & apps" },
  { label: "Z777", url: "https://z777game.pk/", group: "Games & apps" },
  { label: "Winrupees", url: "https://winrupees.com.pk/", group: "Games & apps" },
  { label: "X666", url: "https://x666game.pk/", group: "Games & apps" },
  { label: "Playpkr", url: "https://playpkr.net.pk/", group: "Games & apps" },
  { label: "H555", url: "https://h555.pk/", group: "Games & apps" },
  { label: "Pak Rummy", url: "https://pakrummy.com.pk/", group: "Games & apps" },
  { label: "Pkrslots", url: "https://pkrslots.com.pk/", group: "Games & apps" },
  { label: "P999 Game", url: "https://p999.com.pk/", group: "Games & apps" },
  { label: "Pak Games", url: "https://pakgame.net.pk/", group: "Games & apps" },
  { label: "988", url: "https://988winapp.pk/", group: "Games & apps" },
  { label: "3patti Showy", url: "https://3pattishowy.pk/", group: "Games & apps" },
  { label: "288win", url: "https://288winapp.pk/", group: "Games & apps" },
  { label: "Q98", url: "https://q98games.pk/", group: "Games & apps" },
  { label: "Fantasy Gems", url: "https://fantasygems-game.pk/", group: "Games & apps" },
  { label: "We999", url: "https://we99.com.pk/", group: "Games & apps" },
  { label: "Betpkr", url: "https://betpkrapp.com.pk/", group: "Games & apps" },
  { label: "Six Game", url: "https://sixgames.com.pk/", group: "Games & apps" },
];

export const featuredLinks: FeaturedLink[] = [
  {
    html: `<a href="https://frogdr.com/tiktokio.cam?utm_source=tiktokio.cam" target="_blank"><img src="https://frogdr.com/tiktokio.cam/badge-white.svg" alt="Monitor&#0032;your&#0032;Domain&#0032;Rating&#0032;with&#0032;FrogDR" width="120" height="36"></a>`,
  },
  {
    html: `<a href="https://stackdirectory.com/product/tiktokio" target="_blank" ><img src="https://stackdirectory.com/assets/images/badge.png" alt="Stack Directory" width="120" height="36" loading="lazy"></a>`,
  },
  {
    html: `<a href="https://stackdirectory.com/product/tiktokio" target="_blank" ><img src="https://stackdirectory.com/assets/images/badge.png" alt="Stack Directory" width="120" height="36" loading="lazy"></a>`,
  },
  {
    html: `<a href="https://circlesaasboard.com/startup/5-letter-word-finder-520271" target="_blank" rel="noopener"><img src="https://circlesaasboard.com/badge.svg" alt="Featured on CircleSaaS" width="120" height="36" /></a>`,
  }
];
