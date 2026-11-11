/**
 * Projekte bearbeiten
 * ------------------
 * Jeden Eintrag im Array `projects` anpassen oder Einträge hinzufügen/entfernen.
 *
 * Felder:
 *   title       – Titel der Karte
 *   description – kurze Beschreibung
 *   tags        – sichtbare Schlagwörter
 *   url         – Link des Buttons (z. B. "https://…" oder "#")
 *   year        – Jahreszahl oder anderer Kurzhinweis
 *   placeholder – true setzt ein "Platzhalter"-Tag (für echte Projekte auf false setzen)
 */
const projects = [
  {
    title: "Atelier-Website",
    description: "Platzhalter: Redesign einer Studio-Website mit klarer Typografie und ruhigem Layout.",
    tags: ["Web", "Design"],
    url: "#",
    year: "2026",
    placeholder: true,
  },
  {
    title: "Datenkatalog",
    description: "Platzhalter: Interaktive Übersicht, in der sich Bestände filtern und vergleichen lassen.",
    tags: ["Daten", "UI"],
    url: "#",
    year: "2025",
    placeholder: true,
  },
  {
    title: "Werkstatt-Notizen",
    description: "Platzhalter: Eine kleine Sammlung von Essays, Skizzen und laufenden Experimenten.",
    tags: ["Schreiben", "Archiv"],
    url: "#",
    year: "2025",
    placeholder: true,
  },
  {
    title: "Kartenmodul",
    description: "Platzhalter: Kartendarstellung für ein Stadtprojekt, mit Fokus auf Lesbarkeit statt Effekte.",
    tags: ["Karten", "JavaScript"],
    url: "#",
    year: "2024",
    placeholder: true,
  },
  {
    title: "Typo-Studie",
    description: "Platzhalter: Schrift- und Layoutstudie für Titel, Fließtext und Navigation auf einer Seite.",
    tags: ["Typografie", "Design"],
    url: "#",
    year: "2024",
    placeholder: true,
  },
  {
    title: "Offene Werkzeuge",
    description: "Platzhalter: Kleine Hilfsprogramme und Skripte, die den Alltag in Projekten erleichtern.",
    tags: ["Open Source", "Werkzeuge"],
    url: "#",
    year: "2023",
    placeholder: true,
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
      const tags = [...project.tags];
      if (project.placeholder) tags.unshift("Platzhalter");
      const tagList = tags
        .map((tag) => `<li>${escapeHtml(tag)}</li>`)
        .join("");
      const href = escapeHtml(project.url || "#");
      const hasLink = project.url && project.url !== "#";
      const label = hasLink ? "Zum Projekt" : "Link folgt";

      return `
        <article class="project-card">
          <div class="project-card-top">
            <span class="project-index">${number}</span>
            <span class="project-year">${escapeHtml(project.year)}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <ul class="tags">${tagList}</ul>
          <p>
            ${hasLink
              ? `<a class="btn btn-ghost btn-small" href="${href}">${label}</a>`
              : `<span class="btn btn-ghost btn-small" aria-disabled="true">${label}</span>`}
          </p>
        </article>
      `;
    })
    .join("");
}

renderProjects();

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
