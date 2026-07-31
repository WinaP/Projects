// ============================================================
//  skills.js — logic for pages/skills.html
// ============================================================

fetch('../data/skills.json')
  .then(r => r.json())
  .then(skills => {
    buildSkills(skills);
    buildProficiencyChart(skills);
  });

// ── Skills Timeline ──────────────────────────────────────────
function buildSkills(skillGroups) {

  const container = document.getElementById("skill-timeline");

  let html = "";

  skillGroups.forEach(group => {

    group.skills.forEach(skill => {

      html += `
        <div class="skill-item" style="--skill-color:${group.color}">

          <div class="skill-type">
            ${group.type}
          </div>

          <div class="skill-body">

            <div class="skill-name">
              ${skill.name}
            </div>

            <div class="skill-summary">
              ${group.summary}
            </div>

            <div class="proficiency-bar-wrap">

              <div class="proficiency-row">
                <span>Proficiency</span>
                <span>${skill.proficiency}%</span>
              </div>

              <div class="proficiency-bar">
                <div
                  class="proficiency-fill"
                  style="width:${skill.proficiency}%;background:${group.color}">
                </div>
              </div>

            </div>

          </div>

        </div>
      `;

    });

  });

  container.innerHTML = html;

}


// ── Proficiency Chart ────────────────────────────────────────
function buildProficiencyChart(skillGroups) {

  const allSkills = [];

  skillGroups.forEach(group => {
    group.skills.forEach(skill => {
      allSkills.push({
        ...skill,
        color: group.color
      });
    });
  });

  const canvas = document.getElementById("proficiency-chart");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const W = canvas.width;
  const H = canvas.height;

  const pad = {
    top: 10,
    bottom: 30,
    left: 10,
    right: 10
  };

  const chartH = H - pad.top - pad.bottom;

  const barW =
    (W - pad.left - pad.right) / allSkills.length;

  allSkills.forEach((skill, i) => {

    const barH =
      (skill.proficiency / 100) * chartH;

    const x = pad.left + i * barW;

    const y = pad.top + chartH - barH;

    ctx.fillStyle = skill.color + "44";

    ctx.fillRect(
      x + 2,
      y,
      barW - 4,
      barH
    );

    ctx.fillStyle = skill.color;

    ctx.fillRect(
      x + 2,
      y,
      barW - 4,
      3
    );

    ctx.fillStyle = "rgba(160,160,170,0.6)";
    ctx.font = "7px DM Sans";
    ctx.textAlign = "center";

    ctx.fillText(
      skill.name,
      x + barW / 2,
      H - 8
    );

  });

  ctx.beginPath();

  ctx.moveTo(
    pad.left,
    pad.top + chartH
  );

  ctx.lineTo(
    W - pad.right,
    pad.top + chartH
  );

  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.stroke();

}
