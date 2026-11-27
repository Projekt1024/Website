/**
 * Arbeiten bearbeiten
 * -------------------
 * Jeden Eintrag im Array `projects` anpassen oder Einträge hinzufügen/entfernen.
 *
 * Felder:
 *   title       – Titel der Karte
 *   subtitle    – Untertitel (optional)
 *   description – kurze Beschreibung
 *   tags        – sichtbare Schlagwörter
 *   links       – Liste von Buttons: { label, url, download (true/false) }
 *   year        – Stand bzw. Kurzhinweis
 *   image       – Vorschaubild (optional, Pfad zu einer -th.webp-Datei)
 *   thumbFit    – "contain" zeigt das Vorschaubild ganz (für Diagramme)
 *   featured    – true hebt die Karte hervor (breiter)
 */
const DOCS = "assets/docs/";

const projects = [
  {
    title: "War der Urknall ein Phasenübergang?",
    subtitle: "Das Buch · 558 Seiten",
    description:
      "Das Hauptwerk des Projekts. Es untersucht, ob sich der Urknall als Phasenübergang eines einzigen Mediums beschreiben lässt, und prüft jede Aussage an veröffentlichten Messwerten. Kennzeichnung jeder Aussage als Postulat [P], Folgerung [F] oder Vorhersage [V]; die Rechnungen stehen in den Anhängen A bis J.",
    tags: ["Buch", "Kosmologie", "Medium", "Atomebene"],
    links: [
      { label: "PDF herunterladen (14,9 MB)", url: DOCS + "Reuvekamp_War-der-Urknall-ein-Phasenuebergang.pdf", download: true },
      { label: "Inhalt", url: "#buch" },
    ],
    year: "Nov. 2026",
    image: "assets/img/buch-abb05-kreislauf-th.webp",
    featured: true,
  },
  {
    title: "Spin",
    subtitle: "Die Quintessenz · D1: Die 3:2-Logik, 1080° und Spin 1/2",
    description:
      "Kugelgeometrie (540°) und Projektion (360°) als dieselbe Realität in zwei Zählweisen: Ein Schritt ist 45° in der Projektion und 67,5° auf der Fläche, das Verhältnis 3:2. Beide treffen sich bei 1080°. Der Autor liest darin die Form von Spin 1/2, der erst nach 720° wieder deckungsgleich ist, und verbindet das mit dem CAD-Modell und dem Möbiusband.",
    tags: ["Geometrie", "Spin 1/2", "4 Seiten"],
    links: [{ label: "PDF herunterladen", url: DOCS + "Reuvekamp_Spin-1-2_3-2-Logik.pdf", download: true }],
    year: "10.11.2026",
    image: "assets/img/spin-abb1-zwei-zaehlweisen-th.webp",
    thumbFit: "contain",
  },
  {
    title: "Atommodell 1:2",
    subtitle: "Numerische Auswertung der CAD-Schleife",
    description:
      "Entlang eines vollständigen Umlaufs um die Mittelachse durchläuft die untersuchte Randlinie zwei Höhenzyklen (Länge 362,29 mm, Abstand zur Achse 49,50 mm, Höhenunterschied 42,55 mm). Eine einfache Zweifach-Schwingung beschreibt den Verlauf mit 2,51 mm RMS-Abweichung, bis zur Sechsfach-Schwingung mit 0,43 mm. Drehzahlverhältnis, Stabilität und Energie des Wasserstoffatoms wurden laut Dokument nicht berechnet.",
    tags: ["CAD", "Auswertung", "1 Seite"],
    links: [{ label: "PDF herunterladen", url: DOCS + "Reuvekamp_Atommodell-1zu2_Auswertung.pdf", download: true }],
    year: "09.11.2026",
    image: "assets/img/atommodell-hoehenverlauf-th.webp",
    thumbFit: "contain",
  },
  {
    title: "Herleitung: Kern als Pumpe, Schalen mit Wetter",
    subtitle: "Rechnung zum Modell · nicht im Buch",
    description:
      "Das Modell: Nur der Kern ist eine Pumpe. Materie strömt von oben, Antimaterie von unten zu, beide zerstrahlen im Kern, die Energie weicht am Äquator aus und läuft als Spirale in einem geschlossenen Kreislauf zurück; auf den Schalen herrscht „Wetter“. Die Rechnung prüft diese Annahmen an Messwerten (u. a. Sgr A*, M87*, Neutronensterne) und stellt zuerst die 19 Stellen zusammen, an denen Rechnung und Messung nicht zusammenpassen.",
    tags: ["Rechnung", "Schwarze Löcher", "12 Seiten"],
    links: [{ label: "PDF herunterladen", url: DOCS + "Reuvekamp_Herleitung-Kern-als-Pumpe.pdf", download: true }],
    year: "10.11.2026",
    image: "assets/img/skizze-kern-pumpe-th.webp",
  },
  {
    title: "Bilder und Modell",
    subtitle: "Analyse der Bildersammlung",
    description:
      "Was die Bilder der Sammlung an seinem Modell zeigen, geordnet nach den Kapiteln des Buchs und gekennzeichnet als Postulat, gemessene Tatsache oder Vermutung. Eigene Bilder sind abgebildet, fremde nur im Text erwähnt. Dazu skaleninvariante Wiederholungen (Kugel mit Wirbeln, Torus, Pfeifenputzer-Moden, Trichter) und eine Liste, was an fremden Bildern nicht zu seinem Modell passt.",
    tags: ["Bilder", "Analyse", "3 Seiten"],
    links: [
      { label: "PDF herunterladen", url: DOCS + "Reuvekamp_Bilder-und-Modell_Analyse.pdf", download: true },
      { label: "Zur Galerie", url: "#galerie" },
    ],
    year: "Nov. 2026",
    image: "assets/img/pfeifenputzer-moden-th.webp",
  },
  {
    title: "Schleife n = 2",
    subtitle: "CAD-Modell (STEP)",
    description:
      "Das 3D-Modell der Schleife, aus FreeCAD als STEP-Datei exportiert. Es ist die Grundlage der Auswertung „Atommodell 1:2“ und lässt sich in jedem gängigen CAD-Programm öffnen (z. B. FreeCAD).",
    tags: ["CAD", "3D-Modell", "STEP"],
    links: [{ label: "STEP herunterladen (425 KB)", url: DOCS + "Reuvekamp_Schleife-n2.step", download: true }],
    year: "08.11.2026",
    image: "assets/img/buch-abb37-drei-naehte-th.webp",
    thumbFit: "contain",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((project, index) => {
      const number = String(index + 1).padStart(2, "0");
      const tagList = (project.tags || [])
        .map((tag) => `<li>${escapeHtml(tag)}</li>`)
        .join("");
      const links = (project.links || [])
        .map((link, i) => {
          const cls = i === 0 ? "btn btn-primary btn-small" : "btn btn-ghost btn-small";
          const dl = link.download ? " download" : "";
          return `<a class="${cls}" href="${escapeHtml(link.url)}"${dl}>${escapeHtml(link.label)}</a>`;
        })
        .join("");
      const image = project.image
        ? `<div class="project-thumb${project.thumbFit === "contain" ? " project-thumb--contain" : ""}"><img src="${escapeHtml(project.image)}" alt="" loading="lazy" decoding="async"></div>`
        : "";

      return `
        <article class="project-card${project.featured ? " project-card--featured" : ""}">
          ${image}
          <div class="project-body">
            <div class="project-card-top">
              <span class="project-index">${number}</span>
              <span class="project-year">${escapeHtml(project.year)}</span>
            </div>
            <h3>${escapeHtml(project.title)}</h3>
            ${project.subtitle ? `<p class="project-subtitle">${escapeHtml(project.subtitle)}</p>` : ""}
            <p class="project-desc">${escapeHtml(project.description)}</p>
            <ul class="tags">${tagList}</ul>
            <p class="project-links">${links}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function setupLightbox() {
  const dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-cap");

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a.gallery-link");
    if (!link) return;
    event.preventDefault();
    img.src = link.getAttribute("href");
    img.alt = link.dataset.caption || "";
    cap.textContent = link.dataset.caption || "";
    dialog.showModal();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    img.removeAttribute("src");
  });
}

renderProjects();
setupLightbox();

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
