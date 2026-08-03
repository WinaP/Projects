// ============================================================
//  projects.js — logic for pages/projects.html
// ============================================================

const CATEGORY_LABEL = {
  'university': 'Course Work',
  'personal': 'Personal',
};

const TYPE_LABEL = {
  'web': 'Web',
  'software': 'Software',
  'electrical': 'Electrical',
  'mechanical': 'Mechanical',
};

const TYPE_COLOR = {
  'web': '#4299E1',
  'software': '#9F7AEA',
  'electrical': '#48BB78',
  'mechanical': '#F6AD55'
};

let ALL_PROJECTS = {};


// ── Fetch & boot ─────────────────────────────────────────────

fetch('../data/projects.json')
  .then(r => r.json())
  .then(arr => {
    arr.forEach(p => {
      ALL_PROJECTS[p.id] = p;
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

      const categoryMatch =
        project.category &&
        project.category.toLowerCase() === filter.toLowerCase();


      const typeMatch =
        Array.isArray(project.type) &&
        project.type.some(type =>
          type.toLowerCase() === filter.toLowerCase()
        );


      if (!categoryMatch && !typeMatch) return;
    }



    const card = document.createElement('div');

    card.className = 'project-card';

    card.style.setProperty(
      '--project-color',
      project.color || '#9F7AEA'
    );



    card.innerHTML = `

      <div class="project-name">
        ${project.name}
      </div>


      ${
        project.subtitle
        ? `<div class="project-subtitle">${project.subtitle}</div>`
        : ''
      }


      <div class="project-category">

        ${
          CATEGORY_LABEL[project.category?.toLowerCase()]
          || project.category
          || ''
        }

      </div>


      <div class="project-types">

        ${
          (project.type || [])
          .map(type => {
            const typeColor = TYPE_COLOR[type.toLowerCase()] || '#9F7AEA';
          
            return `
              <span class="tag"
              style="background:${typeColor}22;color:${typeColor}">
                ${TYPE_LABEL[type.toLowerCase()] || type}
              </span>
            `;
          })
          .join('')
        }

      </div>


      <div class="project-desc">
        ${project.description || ''}
      </div>


      <div class="project-tags">

        ${
          (project.technologies || [])
          .map(t => `<span class="tag">${t}</span>`)
          .join('')
        }


        ${
          project.year
          ?
          `
          <span class="tag"
          style="background:rgba(255,255,255,0.05);
          color:var(--text-faint)">
            ${project.year}
          </span>
          `
          : ''
        }

      </div>

    `;


    card.addEventListener(
      'click',
      () => openDetail(project)
    );


    grid.appendChild(card);

  });

}



// ── Detail panel ──────────────────────────────────────────────

function openDetail(project) {


  const techHTML =
    (project.technologies || [])
    .map(t => `<span class="tag">${t}</span>`)
    .join('');



  const typeHTML =
    (project.type || [])
    .map(type =>
      TYPE_LABEL[type.toLowerCase()] || type
    )
    .join(', ');



  const featureHTML =
    (project.features || [])
    .map(feature =>
      `
      <span style="
      display:inline-block;
      margin:0.2rem 0.25rem;
      padding:0.2rem 0.55rem;
      background:var(--bg-hover);
      border:1px solid var(--border);
      border-radius:4px;
      font-size:0.75rem;
      color:var(--text-muted)">
        ${feature}
      </span>
      `
    )
    .join('');



  document.getElementById('detail-content').innerHTML = `


    <div style="margin-bottom:0.4rem;margin-top:0.2rem">
      ${techHTML}
    </div>


    <h2 style="
    font-family:'Cormorant Garamond',serif;
    font-size:1.8rem;
    margin-bottom:0.15rem;
    color:${project.color || 'var(--text)'}">

      ${project.name}

    </h2>



    ${
      project.subtitle
      ?
      `
      <div style="
      font-style:italic;
      color:var(--text-muted);
      font-size:0.88rem;
      margin-bottom:0.7rem">

        ${project.subtitle}

      </div>
      `
      : ''
    }



    <div style="
    font-size:0.63rem;
    text-transform:uppercase;
    letter-spacing:0.06em;
    color:var(--text-faint);
    margin-bottom:1.2rem">


      ${
        CATEGORY_LABEL[project.category?.toLowerCase()]
        || project.category
        || ''
      }


      ${
        typeHTML
        ? ` · ${typeHTML}`
        : ''
      }


    </div>




    ${
      project.description
      ?
      `
      <div class="detail-section">

        <h4>About</h4>

        <p style="font-size:0.85rem">
          ${project.description}
        </p>

      </div>
      `
      : ''
    }




    ${
      project.tools
      ?
      `
      <div class="detail-section">

        <h4>Tools</h4>

        <p style="font-size:0.85rem">
          ${project.tools}
        </p>

      </div>
      `
      : ''
    }




    ${
      featureHTML
      ?
      `
      <div class="detail-section">

        <h4>Key Features</h4>

        <div style="margin-top:0.2rem">
          ${featureHTML}
        </div>

      </div>
      `
      : ''
    }



    ${
      project.github
      ?
      `
      <div class="detail-section">

        <a href="${project.github}" target="_blank">
          View Repository →
        </a>

      </div>
      `
      : ''
    }


    
    ${
     project.media && project.media.length
     ?
     `
     <div class="detail-section">
    
       <button 
       class="view-images"
       onclick="openGallery('${project.id}')">
    
          View Gallery →
    
       </button>
    
     </div>
     `
     :
     ''
    }



    ${
      project.demo
      ?
      `
      <div class="detail-section">

        <a href="${project.demo}" target="_blank">
          Live Demo →
        </a>

      </div>
      `
      : ''
    }



  `;


  document
    .getElementById('project-detail')
    .classList.add('open');
  
  document.body.classList.add('detail-open');

}

function closeDetail() {
  document
    .getElementById('project-detail')
    .classList.remove('open');

  document.body.classList.remove('detail-open');
}



// ── Filters ───────────────────────────────────────────────────

function wireFilters() {


  document
    .getElementById('project-filters')
    .querySelectorAll('button')
    .forEach(btn => {


      btn.addEventListener('click', () => {


        document
          .querySelectorAll('#project-filters button')
          .forEach(b =>
            b.classList.remove('active')
          );



        btn.classList.add('active');


        buildCards(btn.dataset.filter);


      });


    });

}



// ── Close detail panel ────────────────────────────────────────
function wireDetailClose() {

  // X button
  document
    .getElementById('detail-close')
    .addEventListener('click', closeDetail);

  // ESC key
  document.addEventListener('keydown', (e) => {
  
    if (e.key !== 'Escape') return;
  
  
    const gallery = document.getElementById("media-gallery");
    const detail = document.getElementById("project-detail");
  
  
    // Close gallery first
    if (gallery.classList.contains("open")) {
  
      gallery.classList.remove("open");
  
      return;
    }
  
  
    // Otherwise close project detail
    if (detail.classList.contains("open")) {
  
      closeDetail();
  
    }
  
  });

  // Click outside modal (desktop only)
  document.addEventListener('click', (e) => {

    if (window.innerWidth <= 768) return;
    
    if (e.target.closest('#theme-toggle')) return;

    const detail = document.getElementById('project-detail');

    if (
      detail.classList.contains('open') &&
      !detail.contains(e.target) &&
      !document.getElementById("media-gallery").contains(e.target) &&
      !e.target.closest('.project-card')
    ) {
      closeDetail();
    }

  });

}

// ── Media gallery ────────────────────────────────────────
let galleryProject = null;
let galleryIndex = 0;

function openGallery(id){
  galleryProject = ALL_PROJECTS[id];
  galleryIndex = 0;
  renderGallery();
  document
  .getElementById("media-gallery")
  .classList.add("open");
}

function renderGallery(){
  const media = galleryProject.media;
  const container = document.getElementById("gallery-media");
  container.innerHTML = "";
  const src = media[galleryIndex];
  
  // Video detection
  if (
    src.endsWith(".mp4") ||
    src.endsWith(".webm") ||
    src.endsWith(".ogg")
  ){
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.id = "gallery-video";
    container.appendChild(video);
  }

  // Image
  else {
    const img = document.createElement("img");
    img.src = src;
    img.id = "gallery-image";
    container.appendChild(img);
  }

  const dots = document.getElementById("gallery-dots");
  dots.innerHTML = "";
  media.forEach((_,i)=>{
    const dot=document.createElement("span");
    dot.className =
    "gallery-dot " +
    (i===galleryIndex ? "active":"");
    dots.appendChild(dot);
  });
}

document
.getElementById("gallery-next")
.addEventListener("click",()=>{
 const media = galleryProject.media;
 galleryIndex =
 (galleryIndex+1)%media.length;
 renderGallery();
});

document
.getElementById("gallery-prev")
.addEventListener("click",()=>{
 const media = galleryProject.media;
 galleryIndex =
 (galleryIndex-1+media.length)%media.length;
 renderGallery();
});

const galleryClose = document.getElementById("gallery-close");

if (galleryClose) {
  galleryClose.addEventListener("click", () => {
    document
      .getElementById("media-gallery")
      .classList.remove("open");
  });
}
