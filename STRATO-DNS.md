# DNS-Checkliste für Strato

Werte geprüft am 11. November 2026 anhand der offiziellen GitHub-Dokumentation:

- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Securing your GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

`BENUTZERNAME` jeweils durch den GitHub-Benutzernamen (oder den Organisationsnamen) ersetzen. Der CNAME zeigt auf `BENUTZERNAME.github.io`, **ohne** den Repository-Namen.

GitHub empfiehlt, die Custom Domain **zuerst** in den Repository-Einstellungen unter **Settings → Pages** einzutragen (`www.projekt1024.net`) und erst danach die DNS-Einträge bei Strato zu setzen. So lässt sich vermeiden, dass jemand anderes die Domain zwischenzeitlich für GitHub Pages beansprucht. DNS-Änderungen können bis zu 24 Stunden brauchen.

In der Strato-Domainverwaltung die DNS-Einstellungen von `projekt1024.net` öffnen. Vorhandene A-, AAAA- oder CNAME-Einträge für `@` (Apex) und `www`, die noch auf Strato-Hosting oder eine Parkseite zeigen, entfernen oder ersetzen, sonst entstehen Konflikte. Keine Wildcard-Einträge (`*.projekt1024.net`) anlegen.

## 1. www-Subdomain (CNAME)

| Feld bei Strato (typisch) | Wert |
| --- | --- |
| Typ | `CNAME` |
| Name / Host / Präfix | `www` |
| Ziel / Wert | `BENUTZERNAME.github.io` |

Manche Oberflächen erwarten den Zielnamen mit abschließendem Punkt (`BENUTZERNAME.github.io.`). Es darf **kein** Repository-Name im Ziel stehen (also nicht `BENUTZERNAME.github.io/repo`).

Damit leitet GitHub die Apex-Domain `projekt1024.net` automatisch auf `www.projekt1024.net` um, sofern die Apex-Einträge unten ebenfalls gesetzt sind und in GitHub `www.projekt1024.net` als Custom Domain hinterlegt ist.

## 2. Apex-Domain `projekt1024.net` (A- und AAAA-Records)

Vier A-Records auf die IPv4-Adressen von GitHub Pages (Name/Host typischerweise `@` oder leer):

| Typ | Name | Wert |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |

Zusätzlich vier AAAA-Records für IPv6. GitHub empfiehlt AAAA nicht allein, sondern zusammen mit den A-Records:

| Typ | Name | Wert |
| --- | --- | --- |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |

Falls Strato statt mehrerer A/AAAA-Records einen `ALIAS`- oder `ANAME`-Eintrag anbietet, kann die Apex-Domain alternativ auf `BENUTZERNAME.github.io` zeigen. Die A- und AAAA-Adressen oben sind der von GitHub dokumentierte Standardweg.

## 3. Prüfen

Nach der Umstellung (Beispiel):

```bash
dig www.projekt1024.net +nostats +nocomments +nocmd
dig projekt1024.net +noall +answer -t A
dig projekt1024.net +noall +answer -t AAAA
```

Erwartet: `www` zeigt per CNAME auf `BENUTZERNAME.github.io`. Die Apex-Domain antwortet mit den vier A- und den vier AAAA-Adressen oben.

## 4. HTTPS erzwingen

1. In GitHub unter **Settings → Pages** als Custom Domain `www.projekt1024.net` speichern (legt bzw. aktualisiert die Datei `CNAME` im Repository).
2. Warten, bis die DNS-Prüfung durchläuft und GitHub das Zertifikat ausgestellt hat. Der Punkt **Enforce HTTPS** kann laut Dokumentation bis zu 24 Stunden brauchen, bevor er auswählbar ist.
3. Anschließend **Enforce HTTPS** aktivieren. HTTP-Aufrufe werden dann auf HTTPS umgeleitet.

Quelle für diesen Schritt: [Securing your GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
