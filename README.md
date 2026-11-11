# Projekt 1024 — Realität oder Illusion!?

Website zum Forschungsprojekt „Realität oder Illusion!?“ von Stephan Reuvekamp.
Statische Seite für GitHub Pages, erreichbar unter [www.projekt1024.net](https://www.projekt1024.net).

## Aufbau

- `index.html` — alle Abschnitte: Start, Buch (mit Kapitelübersicht), Arbeiten, Galerie, Quellen / Literatur, Über mich, Kontakt.
- `script.js` — die Karten im Abschnitt „Arbeiten“ (Array `projects`) und die Bildansicht der Galerie.
- `styles.css` — Farben und Typografie (heller und dunkler Modus).
- `assets/docs/` — Downloads: Buch, Arbeitspapiere (PDF) und das CAD-Modell (STEP).
- `assets/img/` — Bilder als WebP, jeweils groß (max. 1600 px) und als Vorschau (`-th.webp`, max. 720 px).
- `assets/fonts/` — Schrift Fraunces, lokal eingebunden (keine Verbindung zu Google Fonts).

Es gibt keinen Build-Schritt. Die Dateien können so veröffentlicht werden.

## Inhalte anpassen

- Texte direkt in `index.html` ändern. Stellen in eckigen Klammern `[Platzhalter …]` müssen noch ergänzt werden
  (Vorstellung, Standort, Kontakt-Adresse, Impressum/Datenschutz).
- Neue Arbeit: PDF nach `assets/docs/` legen und in `script.js` einen Eintrag im Array `projects` ergänzen.
- Neues Galeriebild: als WebP in `assets/img/` ablegen (groß + `-th`-Vorschau) und eine `<figure class="gallery-item">` in `index.html` kopieren.

## Veröffentlichung

1. Dateien ins Repository hochladen (Branch `main`).
2. Unter **Settings → Pages** als Quelle den Branch `main`, Ordner `/ (root)` wählen.
3. Als Custom Domain `www.projekt1024.net` eintragen und speichern.
4. DNS bei Strato setzen — siehe [STRATO-DNS.md](STRATO-DNS.md).
5. Sobald das Zertifikat bereitsteht, **Enforce HTTPS** aktivieren.

Die Datei `CNAME` enthält bereits `www.projekt1024.net`. `.nojekyll` verhindert, dass GitHub die Seite durch Jekyll laufen lässt.
