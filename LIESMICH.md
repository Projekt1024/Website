# Webseiten für den Strato-Webspace · v2 (Vorschau, noch nicht online)

Drei Hauptseiten, Projekt 1024 ist die Dachmarke:
- **Projekt 1024**: Studio (bezahlte Arbeit: Konstruktion, Prototyp, Objekt & Service), darunter „Welten“: Endless on Fire, M.A.N.T.I.S. 1024, Forschung, Literatur/Saga, Shop; getrennt davon der kostenlose Workshop.
- **Endless on Fire** und **M.A.N.T.I.S. 1024**: Bereiche von Projekt 1024 („Ein Bereich von Projekt 1024“ in Leiste und Fußzeile).
- Unterseiten/Archive: Das Manifest · Illusion oder Realität · Rising Light - Falling Light.

Ansehen: Ordner öffnen → index.html doppelklicken. Das Formular funktioniert erst auf dem Server (PHP).

## Formulare (anfrage.php)
Kontakt, Shop-Anfrageliste (Projekt 1024), Beta-Formular (M.A.N.T.I.S. 1024) und Anfrage (Endless on Fire) senden per `fetch` an `anfrage.php` im jeweiligen Ordner.
Das Skript schickt die Nachricht mit PHP `mail()` an:
- Projekt 1024 und M.A.N.T.I.S. 1024 → **kontakt@projekt1024.net**
- Endless on Fire → **info@endlessonfire.de**

**Wichtig:** Diese Postfächer müssen bei Strato existieren (Strato → E-Mail → Postfach anlegen). Strato verschickt `mail()` nur mit einer Absenderadresse der eigenen Domain, deshalb ist der Absender das Postfach selbst; „Antworten“ geht an den Anfragenden (Reply-To).
Schutz: Honeypot, Längenprüfung, Prüfung auf dem Server, max. 5 Anfragen pro Stunde je IP (gehasht, Ordner `.anfrage-limit` per .htaccess gesperrt), keine Zeilenumbrüche in Kopfzeilen, Antwort als JSON.
Die Erfolgsmeldung erscheint erst, wenn der Server `{"ok":true}` meldet. Bei Fehlern: klare Meldung plus E-Mail-Link. Die Anfrageliste im Shop wird erst nach bestätigtem Versand geleert.
Nach dem Hochladen einmal selbst testen: Formular absenden → Mail muss im Postfach ankommen.

## Vorschau-Schutz
Alle Seiten haben `noindex` und `robots.txt` mit `Disallow: /`. Beides bleibt, bis www.projekt1024.net die öffentliche Version ist. Erst dann entfernen.

## Bauen und Hochladen
Neu bauen: `python3 build_sites.py` (Quelle: /workspace/website_repo, Branch drei-seiten-verbund)
Hochladen: `./deploy.sh --check` (nur lesen) · `./deploy.sh "Ordner"` (Probelauf) · `./deploy.sh --live "Ordner"` (Sicherung, dann nur geänderte Dateien). Auf dem Server wird nie etwas gelöscht.
Vor Go-live: Impressum (Geschäftsadresse, Kontakt) ausfüllen, Platzhalter `[… ergänzen]` füllen, Domains in der Strato-Domainverwaltung auf die Ordner zeigen lassen.
