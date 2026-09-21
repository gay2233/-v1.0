// ===== 个人技能渲染（侧栏标签，可点击联动）=====
function renderSkills() {
  const container = document.getElementById('skillGroups');
  profileData.skills.forEach(group => {
    const block = document.createElement('div');
    block.className = 'skill-group';
    block.innerHTML =
      '<span class="skill-group-name">' + group.group + '</span><div class="skill-group-tags">' +
      group.skills.map(s => '<button class="skill-tag" type="button" data-skill="' + s.id + '">' + s.name + '</button>').join('') +
      '</div>';
    container.appendChild(block);
  });

  // 点击技能标签 -> 滚动到主内容对应技能介绍并高亮
  container.querySelectorAll('.skill-tag').forEach(btn => {
    btn.addEventListener('click', () => goToSkill(btn.getAttribute('data-skill')));
  });
}

// ===== 技能介绍：主内容区第 03 区块的详细内容渲染 =====
function renderSkillsDetail() {
  const container = document.getElementById('skillsDetail');
  const levelText = ['', '入门', '基础', '进阶', '熟练', '精通'];
  profileData.skills.forEach((group, gi) => {
    const groupBlock = document.createElement('div');
    groupBlock.className = 'skill-detail-group';
    const items = group.skills.map(s => {
      let seg = '';
      for (let i = 1; i <= 5; i++) {
        seg += '<span class="skill-bar-seg' + (i <= s.level ? ' active' : '') + '"></span>';
      }
      return (
        '<div class="skill-detail-item" id="skill-' + s.id + '" data-skill="' + s.id + '">' +
          '<div class="skill-detail-top">' +
            '<span class="skill-detail-name">' + s.name + '</span>' +
            '<span class="skill-detail-level">' + (levelText[s.level] || '') + '</span>' +
          '</div>' +
          '<p class="skill-detail-desc">' + s.desc + '</p>' +
          '<div class="skill-detail-bar">' + seg + '</div>' +
        '</div>'
      );
    }).join('');
    groupBlock.innerHTML =
      '<div class="skill-detail-group-head">' +
        '<span class="skill-detail-group-no">0' + (gi + 1) + '</span>' +
        '<h3 class="skill-detail-group-title">' + group.group + '</h3>' +
      '</div>' +
      '<div class="skill-detail-grid">' + items + '</div>';
    container.appendChild(groupBlock);
  });
}

// ===== 侧栏技能标签 -> 主内容技能介绍联动 =====
function goToSkill(id) {
  const item = document.getElementById('skill-' + id);
  if (!item) return;
  item.scrollIntoView({ behavior: 'smooth', block: 'center' });
  clearTimeout(item.__hl);
  document.querySelectorAll('.skill-detail-item.flash').forEach(el => el.classList.remove('flash'));
  item.classList.add('flash');
  item.__hl = setTimeout(() => item.classList.remove('flash'), 1600);
}

// ===== 图片失败兜底：加载失败时替换为内嵌渐变占位图 =====
function FALLBACK_IMG() {
  // 编码后的 SVG 数据 URI（含页面强调色渐变 + 文本占位）
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#0f766e"/><stop offset="1" stop-color="#e08a2e"/>' +
      '</linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<rect x="10" y="10" width="780" height="580" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2"/>' +
      '<text x="400" y="300" fill="#ffffff" font-family="sans-serif" font-size="24" text-anchor="middle">为您准备的图片加载中…</text>' +
    '</svg>'
  );
}

function applyImageFallback(img) {
  img.addEventListener('error', function () {
    this.removeEventListener('error', arguments.callee);
    this.src = FALLBACK_IMG();
  });
}

function buildCarousel(images) {
  let dots = '';
  for (let i = 0; i < images.length; i++) {
    dots += '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></button>';
  }
  return (
    '<div class="carousel">' +
      '<div class="carousel-track">' +
        images.map((src, i) =>
          '<div class="carousel-slide' + (i === 0 ? ' active' : '') + '"><img src="' + src + '" alt="项目图片 ' + (i + 1) + '"></div>'
        ).join('') +
      '</div>' +
      '<button class="carousel-arrow"' + ' aria-label="上一张"></button>' +
      '<button class="carousel-arrow next"' + ' aria-label="下一张"></button>' +
      '<div class="carousel-dots">' + dots + '</div>' +
    '</div>'
  );
}

function renderProjects() {
  const container = document.getElementById('projects');
  projectsData.forEach((p, i) => {
    const row = document.createElement('article');
    row.className = 'project';
    row.setAttribute('data-index', i);
    const html =
      '<div class="project-media">' + buildCarousel(p.images) + '</div>' +
      '<div class="project-info">' +
        '<span class="project-no">0' + (i + 1) + '</span>' +
        '<div class="project-meta">' +
          '<span class="project-cat">' + p.category + '</span>' +
          '<time class="project-date">' + p.date + '</time>' +
        '</div>' +
        '<h3 class="project-title">' + p.title + '</h3>' +
        '<p class="project-summary">' + p.summary + '</p>' +
        '<div class="project-tech">' + p.tech.map(t => '<span>' + t + '</span>').join('') + '</div>' +
      '</div>';
    row.innerHTML = html;
    container.appendChild(row);
    row.querySelectorAll('img').forEach(applyImageFallback);
    initCarousel(row.querySelector('.carousel'));
  });
}

// ===== 图片轮播逻辑 =====
function initCarousel(carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  if (slides.length <= 1) return;
  let current = 0;
  let timer = null;
  const autoPlayMs = 4200;

  function go(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  function startAuto() {
    if (timer) return;
    timer = setInterval(next, autoPlayMs);
  }
  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  carousel.querySelector('.carousel-arrow').addEventListener('click', prev);
  carousel.querySelector('.carousel-arrow.next').addEventListener('click', next);
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  startAuto();
}

// ===== 滚动监听导航高亮 + 平滑滚动 =====
function setupNav() {
  const links = document.querySelectorAll('.nav-link');
  const sections = ['works', 'about', 'skills', 'contact'].map(id => document.getElementById(id));

  function onScroll() {
    const pos = window.scrollY + 100;
    let current = 'works';
    sections.forEach(sec => { if (sec && sec.offsetTop <= pos) current = sec.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderSkillsDetail();
  renderProjects();
  setupNav();
});