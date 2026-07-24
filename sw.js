// De app zelf op de telefoon bewaren, zodat het icoontje op het beginscherm óók opent
// als er geen bereik is. Zonder dit bestand wordt de hele app bij elke start opnieuw van
// de server gehaald — en dan doet dat icoontje niets zodra je buiten bereik bent.
//
// Hoe het werkt:
//  - De pagina zelf (en version.txt) halen we het liefst vers op, zodat een nieuwe versie
//    meteen binnenkomt. Lukt dat niet, dan pakken we de bewaarde versie.
//  - De rest (de programmabestanden, lettertypes, het rekenhart sql-wasm) heeft een naam
//    met een unieke code erin en verandert dus nooit stiekem van inhoud. Die pakken we
//    eerst uit de bewaarde kopie; wat er nog niet in zit halen we op en bewaren we meteen.
//  - Alles wat met de server praat (/api/…) slaan we NOOIT op: dat zijn echte gegevens en
//    die moeten altijd van de bron komen.

const CACHE = "fixferm-app-v1";

self.addEventListener("install", () => {
  // Niet wachten tot alle oude tabbladen dicht zijn; deze versie mag meteen aan de slag.
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    // Oude bewaarplekken opruimen (van een vorige opzet).
    const namen = await caches.keys();
    await Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

/** Bewaren we dit verzoek? Alleen gewone GET-verzoeken naar onze eigen app. */
function magBewaard(verzoek) {
  if (verzoek.method !== "GET") return false;
  const url = new URL(verzoek.url);
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.startsWith("/api/")) return false;   // echte gegevens: nooit uit de kast
  return true;
}

/** De pagina en het versiebestand: eerst vers proberen, anders de bewaarde kopie. */
async function eerstVers(verzoek) {
  const kast = await caches.open(CACHE);
  try {
    const vers = await fetch(verzoek);
    if (vers && vers.ok) kast.put(verzoek, vers.clone());
    return vers;
  } catch (e) {
    const bewaard = await kast.match(verzoek);
    if (bewaard) return bewaard;
    // Bij het openen van de app: val terug op de bewaarde startpagina.
    if (verzoek.mode === "navigate") {
      const start = await kast.match("/index.html") || await kast.match("/");
      if (start) return start;
    }
    throw e;
  }
}

/** Programmabestanden: uit de kast als het kan, anders ophalen en meteen bewaren. */
async function eerstUitDeKast(verzoek) {
  const kast = await caches.open(CACHE);
  const bewaard = await kast.match(verzoek);
  if (bewaard) return bewaard;
  const vers = await fetch(verzoek);
  if (vers && vers.ok) kast.put(verzoek, vers.clone());
  return vers;
}

self.addEventListener("fetch", (e) => {
  const verzoek = e.request;
  if (!magBewaard(verzoek)) return;
  const url = new URL(verzoek.url);
  const isPagina = verzoek.mode === "navigate" || url.pathname.endsWith("version.txt");
  e.respondWith(isPagina ? eerstVers(verzoek) : eerstUitDeKast(verzoek));
});
