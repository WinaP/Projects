// ============================================================
//  characters.js — logic for pages/characters.html
// ============================================================

const CATEGORY_LABEL = {
  'software': 'Software',
  'web': 'Web Development',
  'embedded': 'Embedded Systems',
  'electrical': 'Electrical Engineering',
  'robotics': 'Robotics',
  'research': 'Research',
  'other': 'Other',
};

const TECH_TAG = {
  'HTML':          '<span class="tag tag-html">HTML</span>',
  'CSS':           '<span class="tag tag-css">CSS</span>',
  'JavaScript':    '<span class="tag tag-js">JavaScript</span>',
  'Python':        '<span class="tag tag-python">Python</span>',
  'C++':           '<span class="tag tag-cpp">C++</span>',
  'Arduino':       '<span class="tag tag-arduino">Arduino</span>',
};

let ALL_PROJECTS = {}; // keyed by id after fetch

fetch('../data/projects.json')
  .then(r => r.json())
  .then(arr => {
    arr.forEach(project => {
      ALL_PROJECTS[project.id] = project;
    });
    buildCards('all');
    wireFilters();
    wireDetailClose();
  });

// ── Card grid ─────────────────────────────────────────────────
function buildCards(filter) {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '';
  Object.values(ALL_PROJECTS).forEach(project => {
    if (filter !== 'all') {
      const categoryMatch = project.category === filter || project.category === `${filter} (OC)`;
      const techMatch = project.tech && project.tech.toLowerCase().includes(filter.toLowerCase());
      if (!categoryMatch && !techMatch) return;
    }
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.setProperty('--project-color', project.color || '#9F7AEA');
    card.innerHTML = `
      <div class="project-name">${project.name}</div>
      ${project.subtitle ? `<div class="project-subtitle">${project.subtitle}</div>` : ''}
      <div class="project-category">${CATEGORY_LABEL[project.category?.toLowerCase()] || project.catergory || ''}</div>
      <div class="project-desc">${project.description || ''}</div>
      <div class="project-tags">
        ${TECH_TAG[char.fandom] || ''}
        ${project.year ? `<span class="tag" style="background:rgba(255,255,255,0.05);color:var(--text-faint)">Ch ${project.year}+</span>` : ''}
      </div>`;
    card.addEventListener('click', () => openDetail(char));
    grid.appendChild(card);
  });
}

// ── Detail panel ──────────────────────────────────────────────
function openDetail(char) {
  const relHTML = (project.technologies || []).map(id => {
    const r = ALL_CHARACTERS[id];
    return r
      ? `<span style="display:inline-block;margin:0.2rem 0.25rem;padding:0.2rem 0.55rem;
           background:var(--bg-hover);border:1px solid var(--border);border-radius:4px;
           font-size:0.75rem;color:var(--text-muted)">${r.name}</span>`
      : '';
  }).join('');

  const momHTML = (char.notable_moments || []).map(m =>
    `<li><span class="ch-badge">Ch ${m.ch}</span><span>${m.desc}</span></li>`
  ).join('');

  document.getElementById('detail-content').innerHTML = `
    <div style="margin-bottom:0.4rem;margin-top:0.2rem">${FANDOM_TAG[char.fandom] || ''}</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;margin-bottom:0.15rem;color:${char.color || 'var(--text)'}">${char.name}</h2>
    ${char.alias ? `<div style="font-style:italic;color:var(--text-muted);font-size:0.88rem;margin-bottom:0.7rem">${char.alias}</div>` : ''}
    <div style="font-size:0.63rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-faint);margin-bottom:1.2rem">
      ${ROLE_LABEL[char.role?.toLowerCase()] || char.role || ''}
    </div>
    ${char.description ? `<div class="detail-section"><h4>About</h4><p style="font-size:0.85rem">${char.description}</p></div>` : ''}
    ${char.appearance  ? `<div class="detail-section"><h4>Appearance</h4><p style="font-size:0.85rem">${char.appearance}</p></div>` : ''}
    ${char.quirk       ? `<div class="detail-section"><h4>Quirk</h4><p style="font-size:0.85rem">${char.quirk}</p></div>` : ''}
    ${char.fighting_style ? `<div class="detail-section"><h4>Fighting Style</h4><p style="font-size:0.85rem">${char.fighting_style}</p></div>` : ''}
    ${relHTML ? `<div class="detail-section"><h4>Key Relationships</h4><div style="margin-top:0.2rem">${relHTML}</div></div>` : ''}
    ${momHTML ? `<div class="detail-section"><h4>Notable Moments</h4><ul class="moment-list">${momHTML}</ul></div>` : ''}
  `;
  document.getElementById('char-detail').classList.add('open');
}


// ── Project detail panel ─────────────────────────────────────

function openDetail(project) {
  const techHTML = (project.technologies || []).map(t =>
      TECH_TAG[t] ||
      `<span class="tag">${t}</span>`
    ).join('');


  const featureHTML = (project.features || [])
    .map(feature =>
      `<li>${feature}</li>`
    ).join('');
  
  document.getElementById('detail-content').innerHTML = `
    <div style="margin-bottom:0.4rem;margin-top:0.2rem">${techHTML}</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;margin-bottom:0.15rem;color:${project.color || 'var(--text)'}">
      ${project.name}</h2>
    ${project.subtitle ? `<div style="font-style:italic;color:var(--text-muted);font-size:0.88rem;margin-bottom:0.7rem">${project.subtitle}</div>` : ''}
    <div style="font-size:0.63rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-faint);margin-bottom:1.2rem">
      ${CATEGORY_LABEL[project.category?.toLowerCase()] || project.category || ''}</div>
    ${project.description ? `<div class="detail-section"><h4>About</h4><p style="font-size:0.85rem">${project.description}</p></div>` : ''}
    ${project.goal ? `<div class="detail-section"><h4>Goal</h4><p style="font-size:0.85rem">${project.goal}</p></div>` : ''}
    ${project.tools ? `<div class="detail-section"><h4>Tools & Technologies</h4><p style="font-size:0.85rem">${project.tools}</p></div>` : ''}
    ${featureHTML ? `<div class="detail-section"><h4>Key Features</h4><ul class="moment-list">${featureHTML}</ul></div>` : ''}
  `;
  document.getElementById('project-detail').classList.add('open');
}




// ── Wiring ────────────────────────────────────────────────────
function wireFilters() {
  document.getElementById('project-filters').querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#project-filters button').forEach(b =>b.classList.remove('active'));
        btn.classList.add('active');
        buildCards(btn.dataset.filter);
      });
    });
}

// ── Close detail panel ───────────────────────────────────────
function wireDetailClose() {
  document.getElementById('detail-close').addEventListener('click', () => {
      document.getElementById('project-detail').classList.remove('open');
    });
}
