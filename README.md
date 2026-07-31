# Project Portfolio 

> by Wina Prasetyo
> 
> Modified 31/07/2026

---

## 📁 Structure

```
projectsportfolio/
│
├── index.html                   ← Homepage / Overview
│
├── pages/
│   ├── projects.html            ← Project showcase and details
│   ├── skills.html              ← Skills and proficiency 
│   ├── contact.html             ← Contact information and form
│
├── css/
│   └── style.css                ← All styles
│
├── data/                        ← ✏️  Edit these files to update content
│   ├── projects.json            ← Project information and descriptions
│   ├── skills.json              ← Skills and technologies
│   ├── experience.json          ← Timeline and achievements
│
└── js/
    ├── projects.js              ← Logic for projects.html
    ├── skills.js                 ← Logic for skills.html
    ├── contact.js               ← Logic for contact.html
```

Each HTML page is pure markup — it `<link>`s one CSS file and `<script>`s one JS file.  
All data lives in JSON. No build step, no dependencies, no modules.

---

## ✏️ Editing content

### Add / update a project — `data/projects.json`

```json
{
  "id": "project_name",
  "title": "Project Title",
  "description": "Short project overview.",
  "technologies": [
    "HTML",
    "CSS",
    "JavaScript"
  ],
  "image" : "project-image.png"
}
```

### Add a skill — `data/skills.json`

```json
{
  "category": "Frontend",
  "skills": [
    "HTML",
    "CSS",
    "JavaScript"
  ]
}
```

### Add experience — `data/experience.json`

```json
{
  "title": "Role or Achievement",
  "organisation": "Organisation Name",
  "date": "2026",
  "description": "Summary of responsibilities or outcomes."
}
```

---

## 🎨 Styling tokens — `css/style.css` → `:root`

| Token | Purpose |
|---|---|
| `--bg` / `--bg-card` / `--bg-hover` | Background layers |
| `--text` / `--text-muted` / `--text-faint` | Text hierarchy |
| `--border` / `--border-hover` | Card borders |
| `--radius` | Corner rounding |
| `--transition` | Global animation easing |

---
