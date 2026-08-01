// ============================================================
//  skills.js — logic for pages/skills.html
// ============================================================

let SKILL_CACHE = [];

fetch('../data/skills.json')
  .then(r => r.json())
  .then(skills => {
    SKILL_CACHE = skills;
    buildSkills(skills);
    buildProficiencyChart(skills);
  });

// ── Get All Skills (Sorted) ──────────────────────────────────
function getSortedSkills(skillGroups) {
  const allSkills = [];

  skillGroups.forEach(group => {
    group.skills.forEach(skill => {
      allSkills.push({
        ...skill,
        type: group.type,
        categoryColor: group.color,
        proficiencyColor: getProficiencyColor(skill.proficiency)
      });
    });
  });

  // Highest proficiency first, then alphabetical
  allSkills.sort((a, b) => {
    if (b.proficiency !== a.proficiency) {
      return b.proficiency - a.proficiency;
    }
    return a.name.localeCompare(b.name);
  });

  return allSkills;
}

// ── Skills Timeline ──────────────────────────────────────────
function buildSkills(skillGroups) {
  const container = document.getElementById("skill-timeline");
  let html = "";

  const allSkills = getSortedSkills(skillGroups);

  allSkills.forEach(skill => {
    html += `
      <div class="skill-item" style="--skill-color:${skill.proficiencyColor}">
        <div class="skill-type">
          ${skill.type}
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
                style="width:${skill.proficiency}%;background:${skill.proficiencyColor}">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}


// ── Proficiency Colours ──────────────────────────────────────
function getProficiencyColor(value) {
  if (value >= 90) {
    return "#F56565"; // Advanced
  }
  if (value >= 70) {
    return "#ED64A6"; // Proficient
  }
  if (value >= 45) {
    return "#FFE135"; // Intermediate
  }
  return "#718096"; // Learning
}


// ── Proficiency Chart ────────────────────────────────────────
function buildProficiencyChart(skillGroups) {
  const allSkills = getSortedSkills(skillGroups);

  const styles = getComputedStyle(document.body);
  
  const textColor = styles.getPropertyValue("--text").trim();
  const faintColor = styles.getPropertyValue("--text-faint").trim();
  const borderColor = styles.getPropertyValue("--border").trim();

  const canvas = document.getElementById("proficiency-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  const cssWidth = canvas.clientWidth;
  const cssHeight = canvas.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.scale(dpr, dpr);
  const W = cssWidth;
  const H = cssHeight;
  ctx.clearRect(0, 0, W, H);
    
  const pad = {
    top: 20,
    bottom: 60,
    left: 20,
    right: 20
  };

  const chartH = H - pad.top - pad.bottom;
  const barW =
    (W - pad.left - pad.right) / allSkills.length;
  allSkills.forEach((skill, i) => {
    const barH =
      (skill.proficiency / 100) * chartH;
    const x =
      pad.left + i * barW;
    const y =
      pad.top + chartH - barH;

    // bar background
    ctx.fillStyle = skill.proficiencyColor + "33";
    ctx.fillRect(
      x + 4,
      y,
      barW - 8,
      barH
    );

    // top highlight
    ctx.fillStyle = skill.proficiencyColor;
    ctx.fillRect(
      x + 4,
      y,
      barW - 8,
      3
    );

    const isMobile = window.innerWidth <= 768;
    
    // percentage
    ctx.fillStyle = textColor;
    ctx.font = isMobile ? "8px DM Sans" : "10px DM Sans";
    
    ctx.textAlign = "center";
    ctx.fillText(
      skill.proficiency + "%",
      x + barW / 2,
      y - 6
    );
    
    // horizontal skill label
    if (!isMobile) {
      ctx.fillStyle = faintColor;
      ctx.font = "9px DM Sans";
      ctx.textAlign = "center";
    
      // split long names into two lines
      const words = skill.name.split(" ");
      const midpoint =
        Math.ceil(words.length / 2);
    
      const line1 =
        words.slice(0, midpoint).join(" ");
    
      const line2 =
        words.slice(midpoint).join(" ");
    
      ctx.fillText(
        line1,
        x + barW / 2,
        H - 25
      );
    
      if (line2) {
        ctx.fillText(
          line2,
          x + barW / 2,
          H - 12
        );
      }
    }
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

  ctx.strokeStyle = borderColor;

  ctx.stroke();
}

// For when window changes after drawing
window.addEventListener("resize", () => {
  if (SKILL_CACHE.length) {
    buildProficiencyChart(SKILL_CACHE);
  }
});

window.addEventListener("themeChanged", () => {
    if (SKILL_CACHE.length) {
        buildProficiencyChart(SKILL_CACHE);
    }
});
