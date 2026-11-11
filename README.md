# Projekt 1024

Erster Entwurf der Portfolio-Website von Stephan Reuvekamp. Statische Seite für GitHub Pages, erreichbar unter [www.projekt1024.net](https://www.projekt1024.net).

## Inhalte anpassen

- Texte und Abschnitte direkt in `index.html` ändern.
- Projektkarten stehen im Array `projects` in `script.js` (Titel, Text, Tags, Link, Jahr).
- Farben und Typografie in `styles.css`.

Es gibt keinen Build-Schritt. Die Dateien können so veröffentlicht werden.

## Veröffentlichung

1. Repository auf GitHub anlegen und diese Dateien hochladen.
2. Unter **Settings → Pages** als Quelle den Branch (z. B. `main`, Ordner `/root`) wählen.
3. Als Custom Domain `www.projekt1024.net` eintragen und speichern.
4. DNS bei Strato setzen — siehe [STRATO-DNS.md](STRATO-DNS.md).
5. Sobald das Zertifikat bereitsteht, **Enforce HTTPS** aktivieren.

Die Datei `CNAME` enthält bereits `www.projekt1024.net`. `.nojekyll` verhindert, dass GitHub die Seite durch Jekyll laufen lässt.
