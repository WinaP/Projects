// ============================================================
//  skills.js — logic for pages/skills.html
// ============================================================

fetch('../data/skills.json')
  .then(r => r.json())
  .then(skills => {
    buildSkillTimeline(skills);
    buildProficiencyChart(skills);
  });


// ── Skill Timeline ────────────────────────────────────────────
function buildSkillTimeline(skills) {
  const container = document.getElementById('skill-timeline');

  container.innerHTML = skills.map(skill => {

    const level = skill.level || 0;

    const levelColor =
      level >= 90 ? '#F56565' :
      level >= 70 ? '#ED8936' :
      level >= 45 ? '#9F7AEA' :
      '#48BB78';


    const tools = (skill.tools || [])
      .map(t => `<div class="skill-tool">${t}</div>`)
      .join('');


    return `
      <div class="skill-item" style="--skill-color:${skill.color || '#A0AEC0'}">

        <div class="skill-category">
          ${skill.category || ''}
        </div>

        <div class="skill-body">

          <div class="skill-name">
            ${skill.name}
          </div>

          <div class="skill-description">
            ${skill.description || ''}
          </div>

          ${tools ? `
            <div class="skill-tools" style="margin-top:0.45rem">
              ${tools}
            </div>
          ` : ''}


          <div class="proficiency-bar-wrap">

            <div class="proficiency-row">
              <span>Proficiency</span>
              <span>${level}%</span>
            </div>

            <div class="proficiency-bar">
              <div 
                class="proficiency-fill"
                style="width:${level}%;background:${levelColor}">
              </div>
            </div>

          </div>


        </div>

      </div>
    `;

  }).join('');
}



// ── Mini proficiency bar chart ────────────────────────────────
function buildProficiencyChart(skills) {

  const canvas = document.getElementById('proficiency-chart');

  if (!canvas) return;


  const ctx = canvas.getContext('2d');

  const W = canvas.width;
  const H = canvas.height;


  const pad = {
    t: 8,
    b: 24,
    l: 6,
    r: 6
  };


  const chartH = H - pad.t - pad.b;

  const barW = (W - pad.l - pad.r) / skills.length;



  skills.forEach((skill, i) => {

    const level = skill.level || 0;

    const barH = (level / 100) * chartH;

    const x = pad.l + i * barW;

    const y = pad.t + chartH - barH;


    const colour =
      level >= 90 ? '#F56565' :
      level >= 70 ? '#ED8936' :
      level >= 45 ? '#9F7AEA' :
      '#48BB78';


    ctx.fillStyle = colour + '44';
    ctx.fillRect(
      x + 0.5,
      y,
      barW - 1,
      barH
    );


    ctx.fillStyle = colour;
    ctx.fillRect(
      x + 0.5,
      y,
      barW - 1,
      2
    );


    if (i % 2 === 0) {

      ctx.fillStyle = 'rgba(160,160,170,0.5)';
      ctx.font = '7px DM Sans,sans-serif';
      ctx.textAlign = 'center';

      ctx.fillText(
        skill.name,
        x + barW / 2,
        H - 6
      );

    }

  });


  // axis line
  ctx.beginPath();

  ctx.moveTo(
    pad.l,
    pad.t + chartH
  );

  ctx.lineTo(
    W - pad.r,
    pad.t + chartH
  );

  ctx.strokeStyle =
    'rgba(255,255,255,0.06)';

  ctx.lineWidth = 1;

  ctx.stroke();

}
