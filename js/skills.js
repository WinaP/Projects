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
              ${skill.summary}
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

function getProficiencyColor(value) {
  if (value >= 90) {
    return "#F56565"; // Advanced
  }
  if (value >= 70) {
    return "#38B2AC"; // Proficient
  }
  if (value >= 45) {
    return "#D69E2E"; // Intermediate
  }
  return "#718096"; // Learning
}


// ── Proficiency Chart ────────────────────────────────────────
function buildProficiencyChart(skillGroups) {
  const allSkills = [];
  skillGroups.forEach(group => {
    group.skills.forEach(skill => {
      allSkills.push({
        name: skill.name,
        proficiency: skill.proficiency,
        color: getProficiencyColor(skill.proficiency)
      });
    });
  });
  
  const canvas = document.getElementById("proficiency-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const pad = {
    top: 20,
    bottom: 60,
    left: 20,
    right: 20
  };

  const chartH = H - pad.top - pad.bottom;
  const barW =(W - pad.left - pad.right) / allSkills.length;

  allSkills.forEach((skill, i) => {
    const barH =(skill.proficiency / 100) * chartH;
    const x =pad.left + i * barW;
    const y =pad.top + chartH - barH;
    
    // bar background
    ctx.fillStyle = skill.color + "33";
    ctx.fillRect(
      x + 4,
      y,
      barW - 8,
      barH
    );

    // top highlight
    ctx.fillStyle = skill.color;
    ctx.fillRect(
      x + 4,
      y,
      barW - 8,
      3
    );

    // percentage
    ctx.fillStyle = "rgba(240,235,228,0.7)";
    ctx.font = "10px DM Sans";
    ctx.textAlign = "center";
    ctx.fillText(
      skill.proficiency + "%",
      x + barW / 2,
      y - 6
    );

    // rotated skill label
    ctx.save();
    ctx.translate(
      x + barW / 2,
      H - 10
    );

    ctx.rotate(-Math.PI / 5);

    ctx.fillStyle = "rgba(160,160,170,0.8)";
    ctx.font = "9px DM Sans";
    ctx.textAlign = "right";
    ctx.fillText(
      skill.name,
      0,
      0
    );
    ctx.restore();
  });

  // baseline
  ctx.beginPath();
  ctx.moveTo(
    pad.left,
    pad.top + chartH
  );
  
  ctx.lineTo(
    W - pad.right,
    pad.top + chartH
  );

  ctx.strokeStyle =
    "rgba(255,255,255,0.06)";
  ctx.stroke();
}
