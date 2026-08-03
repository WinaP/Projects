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
│
├── images/                      ← All images
│
├── files/                       ← All files
│
├── css/
│   └── style.css                ← All styles
│
├── data/                        ← ✏️  Edit these files to update content
│   ├── projects.json            ← Project information and descriptions
│   ├── skills.json              ← Skills and technologies
│
└── js/
    ├── projects.js              ← Logic for projects.html
    ├── skills.js                 ← Logic for skills.html
```

Each HTML page is pure markup — it `<link>`s one CSS file and `<script>`s one JS file.  
All data lives in JSON. No build step, no dependencies, no modules.

---

## ✏️ Editing content

### Add / update a project — `data/projects.json`

```json
{
  "id": "project_name",
  "name": "Project Title",
  "subtitle": "Short project description",
  "category": "university/personal",
  "type": [
    "web/software/mechanical/electrical"
  ],
  "color": "#9F7AEA",
  "year": Year,
  "description": "Detailed project overview.",
  "technologies": [
    "Tech 1",
    "Tech 2"
  ],
  "tools": "Development tools used",
  "features": [
    "Feature one",
    "Feature two"
  ],
  "github": null,
  "demo": null
}
```

### Add a skill — `data/skills.json`

```json
{
  "id": "web/electrical/software/mechanical",
  "type": "Web/electrical/software/mechanical",
  "color": TYPE_COLOR,
  "skills": [
    {
      "id": "skill",
      "name": "SKILL",
      "summary": "Summary of Skill.",
      "proficiency": Proficiency
    }
  ]
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
