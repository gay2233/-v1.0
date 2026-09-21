// ====== 渲染项目列表 ======
function renderProjects() {
  const container = document.getElementById("project-list");
  if (!container || typeof projects === "undefined") return;

  container.innerHTML = projects
    .map(
      (p, i) => `
    <a class="project-item" href="project-detail.html?id=${i}">
      <div class="project-image">
        <img src="${p.image}" alt="${p.name} 项目截图" loading="lazy" />
      </div>
      <div class="project-info">
        <h3 class="project-name">${p.name}</h3>
        <div class="project-meta">
          <span>${p.category}</span>
          <span>·</span>
          <span>${p.date}</span>
        </div>
        <div class="project-tech">
          ${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
        <p class="project-desc">${p.desc}</p>
        <span class="project-more">查看详情 →</span>
      </div>
    </a>
  `
    )
    .join("");
}

// ====== 导航高亮当前区块 ======
function setupNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

// ====== 移动端导航折叠 ======
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}

// ====== 初始化 ======
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupNavHighlight();
  setupMobileNav();
});
