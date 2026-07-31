// ============================================================
//  projects.js — logic for pages/projects.html
// ============================================================

const CATEGORY_LABEL = {
  'university': 'University',
  'personal': 'Personal',
};

const TYPE_LABEL = {
  'web': 'Web',
  'software': 'Software',
  'electrical': 'Electrical',
  'mechanical': 'Mechanical',
};

const TECH_TAG = {
  'HTML':       '<span class="tag">HTML</span>',
  'CSS':        '<span class="tag">CSS</span>',
  'JavaScript': '<span class="tag">JavaScript</span>',
  'Python':     '<span class="tag">Python</span>',
  'C++':        '<span class="tag">C++</span>',
  'Arduino':    '<span class="tag">Arduino</span>',
  '3D CAD':     '<span class="tag">3D CAD</span>',
};

let ALL_PROJECTS = {};


// ── Fetch & boot ─────────────────────────────────────────────
fetch('../data/projects.json')
  .then(r => r.json())
  .then(arr => {
    arr.forEach(p => { ALL_PROJECTS[p.id] = p; });
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
      const categoryMatch = project.category &&
                            project.category.toLowerCase() === filter;
    
      const typeMatch = project.type &&
                        project.type.toLowerCase() === filter;
    
      if (!categoryMatch && !typeMatch) return;
    }

    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.setProperty('--project-color', project.color || '#9F7AEA');

    card.innerHTML = `
      <div class="project-name">${project.name}</div>

      ${project.subtitle ? 
        `<div class="project-subtitle">${project.subtitle}</div>` 
        : ''}

      <div class="project-category">
        ${CATEGORY_LABEL[project.category?.toLowerCase()] || project.category || ''}
      </div>
      
      ${project.type ? 
        `<div class="project-type">
          ${TYPE_LABEL[project.type.toLowerCase()] || project.type}
        </div>` 
        : ''}

      <div class="project-desc">
        ${project.description || ''}
      </div>

      <div class="project-tags">
        ${(project.technologies || []).map(t => TECH_TAG[t] || '').join('')}
        ${project.year ? 
          `<span class="tag" style="background:rgba(255,255,255,0.05);color:var(--text-faint)">
            ${project.year}
          </span>` 
          : ''}
      </div>
    `;

    card.addEventListener('click', () => openDetail(project));
    grid.appendChild(card);
  });
}


// ── Detail panel ──────────────────────────────────────────────
function openDetail(project) {

  const techHTML = (project.technologies || [])
    .map(t => TECH_TAG[t] || '')
    .join('');


  const featureHTML = (project.features || [])
    .map(feature =>
      `<span style="display:inline-block;margin:0.2rem 0.25rem;padding:0.2rem 0.55rem;
       background:var(--bg-hover);border:1px solid var(--border);border-radius:4px;
       font-size:0.75rem;color:var(--text-muted)">
       ${feature}
       </span>`
    )
    .join('');


  document.getElementById('detail-content').innerHTML = `

    <div style="margin-bottom:0.4rem;margin-top:0.2rem">
      ${techHTML}
    </div>

    <h2 style="font-family:'Cormorant Garamond',serif;
      font-size:1.8rem;
      margin-bottom:0.15rem;
      color:${project.color || 'var(--text)'}">
      ${project.name}
    </h2>


    ${project.subtitle ? 
      `<div style="font-style:italic;color:var(--text-muted);
      font-size:0.88rem;margin-bottom:0.7rem">
      ${project.subtitle}
      </div>` 
      : ''}


    <div style="font-size:0.63rem;
      text-transform:uppercase;
      letter-spacing:0.06em;
      color:var(--text-faint);
      margin-bottom:1.2rem">

      ${CATEGORY_LABEL[project.category?.toLowerCase()] || project.category || ''}
      
      ${project.type ? 
        ` · ${TYPE_LABEL[project.type.toLowerCase()] || project.type}` 
        : ''}

    </div>


    ${project.description ? 
      `<div class="detail-section">
        <h4>About</h4>
        <p style="font-size:0.85rem">${project.description}</p>
      </div>` 
      : ''}


    ${project.tools ? 
      `<div class="detail-section">
        <h4>Tools</h4>
        <p style="font-size:0.85rem">${project.tools}</p>
      </div>` 
      : ''}


    ${featureHTML ? 
      `<div class="detail-section">
        <h4>Key Features</h4>
        <div style="margin-top:0.2rem">
          ${featureHTML}
        </div>
      </div>` 
      : ''}


    ${project.github ? 
      `<div class="detail-section">
        <a href="${project.github}" target="_blank">
          View Repository →
        </a>
      </div>` 
      : ''}


    ${project.demo ? 
      `<div class="detail-section">
        <a href="${project.demo}" target="_blank">
          Live Demo →
        </a>
      </div>` 
      : ''}

  `;

  document.getElementById('project-detail').classList.add('open');
}


// ── Wiring ────────────────────────────────────────────────────
function wireFilters() {
  document.getElementById('project-filters')
    .querySelectorAll('button')
    .forEach(btn => {

      btn.addEventListener('click', () => {

        document.querySelectorAll('#project-filters button')
          .forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        buildCards(btn.dataset.filter);

      });

    });
}


function wireDetailClose() {
  document.getElementById('detail-detail').classList.remove('open');

  document.getElementById('detail-close')
    .addEventListener('click', () => {

      document.getElementById('project-detail')
        .classList.remove('open');

    });
}
