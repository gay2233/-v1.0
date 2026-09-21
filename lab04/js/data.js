// 个人信息与技能数据
// skills: group 为分组名；每项技能含 id（用于锚点联动）、name、level（1-5 熟练度）、desc（详细介绍）
const profileData = {
  skills: [
    {
      group: "后端与数据",
      skills: [
        { id: "python", name: "Python", level: 4, desc: "数据分析、脚本自动化与 AI 应用开发的主力语言。" },
        { id: "java", name: "Java", level: 4, desc: "服务端开发主力语言，熟悉面向对象设计与常用框架。" },
        { id: "springboot", name: "Spring Boot", level: 3, desc: "用于快速构建 REST API 与完整业务后端。" },
        { id: "mysql", name: "MySQL", level: 3, desc: "关系型数据库建模、查询与常用运维操作。" }
      ]
    },
    {
      group: "前端开发",
      skills: [
        { id: "ts", name: "TypeScript", level: 4, desc: "前后端统一使用 TS，提升代码类型安全与可维护性。" },
        { id: "htmlcss", name: "HTML/CSS", level: 4, desc: "原生页面结构、布局与交互动效开发。" },
        { id: "vue", name: "Vue", level: 3, desc: "组件化界面开发，配合工程化与状态管理实践。" }
      ]
    },
    {
      group: "AI 应用",
      skills: [
        { id: "llm", name: "大语言模型 API", level: 4, desc: "搭建智能问答、内容生成类应用，掌握提示词与参数调优。" },
        { id: "rag", name: "RAG", level: 4, desc: "基于检索增强生成构建带引用出处的问答系统。" },
        { id: "vector", name: "向量检索", level: 3, desc: "知识库索引构建与语义检索实现。" },
        { id: "viz", name: "数据可视化", level: 4, desc: "使用 Canvas / SVG / ECharts 呈现复杂数据。" }
      ]
    }
  ]
};

// 项目数据：新增项目只需在此数组中追加一条记录
const projectsData = [
  {
    title: "轻记账",
    category: "微信小程序",
    date: "2025-04",
    tech: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    summary: "面向日常生活场景的极简记账微信小程序，支持语音快捷记账、月度收支统计与预算提醒，使用微信云开发完成数据存储与后端能力。",
    images: [
      "https://picsum.photos/seed/notes01/800/600",
      "https://picsum.photos/seed/notes02/800/600",
      "https://picsum.photos/seed/notes03/800/600"
    ]
  },
  {
    title: "拾光集市",
    category: "校园二手交易平台",
    date: "2025-09",
    tech: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    summary: "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成。",
    images: [
      "https://picsum.photos/seed/market01/800/600",
      "https://picsum.photos/seed/market02/800/600",
      "https://picsum.photos/seed/market03/800/600"
    ]
  },
  {
    title: "城市脉搏",
    category: "数据可视化大屏",
    date: "2026-03",
    tech: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    summary: "城市实时交通与天气数据可视化大屏，通过多数据源轮询聚合数据，结合 SVG 图表、Canvas 粒子地图与响应式布局完成大屏可视化展示。",
    images: [
      "https://picsum.photos/seed/pulse01/800/600",
      "https://picsum.photos/seed/pulse02/800/600",
      "https://picsum.photos/seed/pulse03/800/600"
    ]
  },
  {
    title: "课语通",
    category: "AI 学习助手",
    date: "2026-07",
    tech: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    summary: "基于大语言模型的课程问答助手，上传课程资料后自动建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助快速复习课程重点。",
    images: [
      "https://picsum.photos/seed/course01/800/600",
      "https://picsum.photos/seed/course02/800/600",
      "https://picsum.photos/seed/course03/800/600"
    ]
  }
];