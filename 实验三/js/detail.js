// ====== 渲染项目详情 ======
function renderDetail() {
  const container = document.getElementById("detail-content");
  if (!container || typeof projects === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  // id 无效或越界
  if (isNaN(id) || id < 0 || id >= projects.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:60px 0;">
        <h2 style="font-size:24px;color:var(--text-main);margin-bottom:16px;">项目未找到</h2>
        <p style="color:var(--text-sub);margin-bottom:24px;">该项目不存在或已被移除。</p>
        <a href="index.html#projects" class="btn btn-primary">返回项目列表</a>
      </div>
    `;
    return;
  }

  const p = projects[id];

  // 项目链接（待补充则不显示）
  const linksHtml = `
    ${p.links?.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener" class="detail-link-btn">在线演示</a>` : ""}
    ${p.links?.source ? `<a href="${p.links.source}" target="_blank" rel="noopener" class="detail-link-btn">源代码</a>` : ""}
  `;
  const hasLinks = p.links?.demo || p.links?.source;

  container.innerHTML = `
    <header class="detail-header">
      <h1 class="detail-title">${p.name}</h1>
      <div class="detail-meta">
        <span>${p.category}</span>
        <span>·</span>
        <span>${p.date}</span>
      </div>
    </header>

    <img src="${p.image}" alt="${p.name} 封面图" class="detail-cover" />

    <div class="detail-section">
      <h3>项目简介</h3>
      <p>${p.desc}</p>
    </div>

    <div class="detail-section">
      <h3>我的角色</h3>
      <p>${p.role || "待补充"}</p>
    </div>

    <div class="detail-section">
      <h3>核心功能</h3>
      <ul class="detail-list">
        ${p.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-section">
      <h3>项目亮点</h3>
      <ul class="detail-list">
        ${p.highlights.map((h) => `<li>${h}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-section">
      <h3>技术栈</h3>
      <div class="detail-tech">
        ${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h3>挑战与解决</h3>
      <ul class="detail-list">
        ${p.challenges.map((c) => `<li>${c}</li>`).join("")}
      </ul>
    </div>

    ${hasLinks ? `
    <div class="detail-section">
      <h3>相关链接</h3>
      <div class="detail-links">
        ${linksHtml}
      </div>
    </div>
    ` : ""}
  `;

  // 更新页面标题
  document.title = `${p.name} | 郑志贤`;
}

document.addEventListener("DOMContentLoaded", renderDetail);
