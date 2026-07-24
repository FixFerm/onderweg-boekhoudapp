# FixFerm Onderweg — de telefoon-app

Dit is de app die je op je **telefoon** zet om onderweg uren, ritten,
kilometerstanden en bonnen vast te leggen. Het is dezelfde code als de gewone
FixFerm-app, maar dan met alleen het scherm *Onderweg*.

**Belangrijk om te weten:**

- Hier staat **niets** van jou of van een klant in. Geen boekhouding, geen
  bedragen, geen bonnen. Alleen de knoppen en de rekenregels.
- Jouw gegevens reizen **niet** langs dit adres. Wat je invoert gaat via je eigen
  cloud-map (Synology Drive → de map `postbus`) rechtstreeks naar je NAS.
- De app zit op slot: wie het adres opent zonder ooit de **QR-code** van zijn eigen
  computer te hebben gescand, komt niet binnen. Scannen doe je één keer; daarna zet
  je de app op je beginscherm en opent hij vanzelf, ook zonder bereik.
- Dit is een **apart** adres van de demo. De demo blijft ongemoeid.

## Online zetten (eenmalig) — klik voor klik

### Stap A: de bestanden in GitHub zetten (via de website, met slepen)

Je hebt de repository al aangemaakt (`onderweg-boekhoudapp`). Nu de bestanden erin:

1. Open je lege repository op github.com.
2. Klik in de blauwe balk op de blauwe woorden **"uploading an existing file"**.
   (Staat er geen balk? Klik dan op **Add file** rechtsboven → **Upload files**.)
3. Open op je Mac de map **`onderweg-site`**. Selecteer **alles** wat erin staat —
   ook de mappen `assets`, `fonts` en `tess`. (Klik op het eerste bestand, houd
   ⌘ ingedrukt en klik de rest aan, of gebruik ⌘+A om alles te selecteren.)
4. **Sleep** die selectie naar het grote vak in de browser ("Drag files here").
   Wacht tot alles geüpload is (de mappen komen vanzelf mee).
5. Scrol naar beneden en klik op de groene knop **Commit changes**.

Klaar — de bestanden staan nu in GitHub.

### Stap B: koppelen aan Vercel (dan komt hij online)

1. Ga naar **vercel.com** en log in (mag met je GitHub-account: "Continue with GitHub").
2. Klik rechtsboven op **Add New…** → **Project**.
3. Je ziet een lijst met je GitHub-repositories. Zoek **onderweg-boekhoudapp**
   en klik ernaast op **Import**.
4. Er verschijnt een instelscherm. Zet het zo:
   - **Framework Preset:** kies **Other**
   - **Build Command:** laat dit **leeg** (of zet de schakelaar "Override" uit)
   - **Output Directory:** vul **`./`** in (een punt en een schuine streep)
   - De rest laat je staan.
5. Klik op **Deploy** en wacht tot het klaar is (een halve minuut).
6. Je krijgt een adres te zien, zoiets als **`onderweg-boekhoudapp.vercel.app`**.
   Dat is het adres van je telefoon-app. Noteer het.

### Stap C: het adres in de app zetten

Open op je computer de gewone FixFerm-app → **Onderweg (telefoon)**. De eerste keer
vraagt het scherm om het webadres — vul daar het Vercel-adres uit stap B in
(bijvoorbeeld `https://onderweg-boekhoudapp.vercel.app`). Vanaf nu maakt de app de
QR-code met dat adres erin.

### (Later, als je wilt) een eigen adres

In Vercel bij **Settings → Domains** kun je `onderweg.fixferm.nl` toevoegen, en bij je
domeinbeheer een CNAME `onderweg` naar `cname.vercel-dns.com` zetten. De telefoons blijven
gewoon werken; je hoeft dan alleen het nieuwe adres opnieuw in te vullen op het scherm
Onderweg.

## Daarna: het adres in de app zetten

Op je computer, in de gewone FixFerm-app, ga je naar **Onderweg (telefoon)**. De
eerste keer vraagt het scherm op welk adres de telefoon-app staat — vul daar het
Vercel-adres in (bijv. `https://fixferm-onderweg.vercel.app`). Vanaf dan maakt de
app de QR-code met dat adres erin.

## Bijwerken (alleen wanneer je dat wilt)

Vraag om een nieuwe onderweg-build; vervang daarna de bestanden in de repository
door de nieuwe map. Vercel zet hem vanzelf live. Je telefoon haalt de nieuwe versie
op zodra je online bent; het icoontje op je beginscherm blijft gewoon staan.
