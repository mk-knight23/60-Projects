/**
 * Projects Showcase Data
 * Complete source of truth for all 60 projects in the ecosystem
 * Updated with verified deployment URLs and GitHub repositories
 */

export type ProjectCategory = "portfolio" | "web" | "game" | "tool" | "starter"

export type ProjectStatus = "live"

export interface Project {
  id: string
  number: number
  name: string
  role?: string
  category: ProjectCategory
  description: string
  techStack: string[]
  liveUrl: string
  altUrls?: {
    cloudflare?: string
    azure?: string
    firebase?: string
    aws?: string
    render?: string
    vercel?: string
  }
  repoUrl: string
  status: ProjectStatus
  audit?: {
    buildStatus: "success" | "failure" | "pending"
    screenshotVerified: boolean
    linesOfCode?: number
    deploymentCount: number
  }
}

/**
 * Portfolio Projects (01-08)
 * Professional portfolio sites deployed across multiple cloud platforms
 */
const portfolioProjects: Project[] = [
  {
    id: "portfolio-devtools",
    number: 1,
    name: "DevTools Engineer Portfolio",
    role: "DevTools Engineer",
    category: "portfolio",
    description: "Professional portfolio showcasing DevTools engineering expertise with interactive demos and project showcases.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: "https://01-devtools.pages.dev",
    altUrls: {
      cloudflare: "https://01-devtools.pages.dev",
      azure: "https://witty-cliff-0cf40420f-preview.eastus2.2.azurestaticapps.net",
      firebase: "https://portfolio-devtools.web.app",
      aws: "https://main.d3kxqk7cdhc7i0.amplifyapp.com",
      render: "https://zero1-portfolio-devtools.onrender.com",
      vercel: "https://01-portfolio-devtools.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/01-portfolio-devtools",
    status: "live",
    audit: {
      buildStatus: "success",
      screenshotVerified: true,
      linesOfCode: 184927,
      deploymentCount: 6,
    },
  },
  {
    id: "portfolio-fullstack",
    number: 2,
    name: "Full Stack Developer Portfolio",
    role: "Full Stack Developer",
    category: "portfolio",
    description: "Comprehensive portfolio demonstrating full-stack capabilities with real-world applications and API integrations.",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    liveUrl: "https://02-fullstack.pages.dev",
    altUrls: {
      cloudflare: "https://02-fullstack.pages.dev",
      azure: "https://salmon-coast-0112a010f-preview.eastus2.4.azurestaticapps.net",
      firebase: "https://mk-knight-fullstack.web.app",
      aws: "https://main.dqywouu7sv625.amplifyapp.com",
      render: "https://zero2-portfolio-fullstack.onrender.com",
      vercel: "https://02-portfolio-fullstack.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/02-portfolio-fullstack",
    status: "live",
  },
  {
    id: "portfolio-frontend",
    number: 3,
    name: "Frontend Developer Portfolio",
    role: "Frontend Developer",
    category: "portfolio",
    description: "Modern portfolio highlighting frontend development skills with responsive designs and smooth animations.",
    techStack: ["Vue.js", "TypeScript", "Vite", "Sass"],
    liveUrl: "https://03-frontend.pages.dev",
    altUrls: {
      cloudflare: "https://03-frontend.pages.dev",
      azure: "https://purple-meadow-0b3e5320f-preview.eastus2.4.azurestaticapps.net",
      firebase: "https://mk-knight-frontend.web.app",
      aws: "https://main.d3jrgzxrbbaypo.amplifyapp.com",
      render: "https://zero3-portfolio-frontend.onrender.com",
      vercel: "https://03-portfolio-frontend.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/03-portfolio-frontend",
    status: "live",
  },
  {
    id: "portfolio-backend",
    number: 4,
    name: "Backend Developer Portfolio",
    role: "Backend Developer",
    category: "portfolio",
    description: "Technical portfolio featuring backend architecture, API designs, and database optimization projects.",
    techStack: ["Node.js", "Express", "MongoDB", "Docker"],
    liveUrl: "https://04-backend.pages.dev",
    altUrls: {
      cloudflare: "https://04-backend.pages.dev",
      azure: "https://witty-wave-0a0ebbb0f-preview.eastus2.4.azurestaticapps.net",
      firebase: "https://mk-knight-backend.web.app",
      aws: "https://main.d3li8vaqnxoq5w.amplifyapp.com",
      render: "https://zero4-portfolio-backend.onrender.com",
      vercel: "https://04-portfolio-backend.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/04-portfolio-backend",
    status: "live",
  },
  {
    id: "portfolio-frontend-ai",
    number: 5,
    name: "Frontend AI Engineer Portfolio",
    role: "Frontend AI Engineer",
    category: "portfolio",
    description: "Modern portfolio showcasing frontend development with AI/ML integration and interactive demos.",
    techStack: ["React", "TypeScript", "TensorFlow.js", "Next.js"],
    liveUrl: "https://05-frontend-ai.pages.dev",
    altUrls: {
      cloudflare: "https://05-frontend-ai.pages.dev",
      azure: "https://delightful-meadow-06502290f-preview.eastus2.4.azurestaticapps.net",
      firebase: "https://mk-knight-frontend-ai.web.app",
      aws: "https://main.d37saxm79nzluz.amplifyapp.com",
      render: "https://zero5-portfolio-frontend-ai.onrender.com",
      vercel: "https://05-portfolio-frontend-ai.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/05-portfolio-frontend-ai",
    status: "live",
  },
  {
    id: "portfolio-senior-frontend",
    number: 6,
    name: "Senior Frontend Developer Portfolio",
    role: "Senior Frontend Developer",
    category: "portfolio",
    description: "Executive-level portfolio showcasing leadership in frontend architecture and team-scale projects.",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    liveUrl: "https://06-senior-frontend.pages.dev",
    altUrls: {
      cloudflare: "https://06-senior-frontend.pages.dev",
      azure: "https://ambitious-ground-0749c5e0f-preview.eastus2.6.azurestaticapps.net",
      firebase: "https://mk-knight-senior-frontend.web.app",
      aws: "https://main.d18do5sl5tes8u.amplifyapp.com",
      render: "https://zero6-portfolio-senior-frontend.onrender.com",
      vercel: "https://06-portfolio-senior-frontend.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/06-portfolio-senior-frontend",
    status: "live",
  },
  {
    id: "portfolio-indie-saas",
    number: 7,
    name: "Indie SaaS Builder Portfolio",
    role: "Indie SaaS Builder",
    category: "portfolio",
    description: "Entrepreneurial portfolio featuring successful SaaS products and startup journey highlights.",
    techStack: ["Next.js", "Stripe", "Supabase", "Vercel"],
    liveUrl: "https://07-indie-saas.pages.dev",
    altUrls: {
      cloudflare: "https://07-indie-saas.pages.dev",
      azure: "https://brave-flower-00382440f-preview.eastus2.6.azurestaticapps.net",
      firebase: "https://portfolio-indie-saas.web.app",
      aws: "https://main.d1haw7u92fgag5.amplifyapp.com",
      render: "https://zero7-portfolio-indie-saas.onrender.com",
      vercel: "https://07-portfolio-indie-saas.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/07-portfolio-indie-saas",
    status: "live",
  },
  {
    id: "portfolio-ai-automation",
    number: 8,
    name: "AI Automation Engineer Portfolio",
    role: "AI Automation Engineer",
    category: "portfolio",
    description: "Cutting-edge portfolio showcasing AI automation workflows and intelligent system integrations.",
    techStack: ["Python", "LangChain", "OpenAI", "React"],
    liveUrl: "https://08-ai-automation.pages.dev",
    altUrls: {
      cloudflare: "https://08-ai-automation.pages.dev",
      azure: "https://ambitious-hill-0eda5ed0f-preview.eastus2.2.azurestaticapps.net",
      firebase: "https://portfolio-ai-automation.web.app",
      aws: "https://main.dvh268q1nnb4x.amplifyapp.com",
      render: "https://zero8-portfolio-ai-automation.onrender.com",
      vercel: "https://08-portfolio-ai-automation.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/08-portfolio-ai-automation",
    status: "live",
  },
]

/**
 * Web Applications (09-24)
 * Interactive web apps demonstrating various frameworks and patterns
 */
const webProjects: Project[] = [
  {
    id: "web-geographic-explorer",
    number: 9,
    name: "Geographic Explorer",
    category: "web",
    description: "Interactive map-based application for exploring geographic data with custom markers and overlays.",
    techStack: ["React 19", "TypeScript", "Leaflet", "OpenStreetMap"],
    liveUrl: "https://09-web-geographic-explorer.vercel.app",
    altUrls: {
      vercel: "https://09-web-geographic-explorer.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/09-web-geographic-explorer",
    status: "live",
    audit: {
      buildStatus: "success",
      screenshotVerified: true,
      linesOfCode: 15678,
      deploymentCount: 1,
    },
  },
  {
    id: "web-time-display",
    number: 10,
    name: "Time Display",
    category: "web",
    description: "Elegant world clock showing current time across multiple timezones with analog and digital displays.",
    techStack: ["React 19", "TypeScript", "Moment.js", "CSS"],
    liveUrl: "https://10-web-time-display.vercel.app",
    altUrls: {
      vercel: "https://10-web-time-display.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/10-web-time-display",
    status: "live",
  },
  {
    id: "web-keyboard-practice",
    number: 11,
    name: "Keyboard Practice",
    category: "web",
    description: "Interactive typing practice application with speed tracking, accuracy metrics, and progress tracking.",
    techStack: ["React 19", "TypeScript", "Chart.js", "Local Storage"],
    liveUrl: "https://11-web-keyboard-practice.vercel.app",
    altUrls: {
      vercel: "https://11-web-keyboard-practice.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/11-web-keyboard-practice",
    status: "live",
  },
  {
    id: "web-editorial-blog",
    number: 12,
    name: "Editorial Blog",
    category: "web",
    description: "Content-focused blog platform with rich text editing, markdown support, and SEO optimization.",
    techStack: ["React 19", "TypeScript", "MDX", "Tailwind CSS"],
    liveUrl: "https://12-web-editorial-blog.vercel.app",
    altUrls: {
      vercel: "https://12-web-editorial-blog.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/12-web-editorial-blog",
    status: "live",
  },
  {
    id: "web-brutalist-content",
    number: 13,
    name: "Brutalist Content",
    category: "web",
    description: "Bold brutalist design showcasing raw HTML aesthetics with maximalist typography and layouts.",
    techStack: ["React 19", "TypeScript", "HTML", "CSS"],
    liveUrl: "https://13-web-brutalist-content.vercel.app",
    altUrls: {
      vercel: "https://13-web-brutalist-content.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/13-web-brutalist-content",
    status: "live",
  },
  {
    id: "web-ai-research",
    number: 14,
    name: "AI Research",
    category: "web",
    description: "Research portal for AI/ML papers with interactive visualizations and citation tracking.",
    techStack: ["React 19", "TypeScript", "D3.js", "FastAPI"],
    liveUrl: "https://14-web-ai-research.vercel.app",
    altUrls: {
      vercel: "https://14-web-ai-research.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/14-web-ai-research",
    status: "live",
  },
  {
    id: "web-luxury-boutique",
    number: 15,
    name: "Luxury Boutique",
    category: "web",
    description: "High-end e-commerce experience with premium animations and sophisticated product showcases.",
    techStack: ["React 19", "TypeScript", "Framer Motion", "Stripe"],
    liveUrl: "https://15-web-luxury-boutique.vercel.app",
    altUrls: {
      vercel: "https://15-web-luxury-boutique.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/15-web-luxury-boutique",
    status: "live",
  },
  {
    id: "web-editorial-layouts",
    number: 16,
    name: "Editorial Layouts",
    category: "web",
    description: "Multi-page editorial site demonstrating advanced CSS Grid and Flexbox layout patterns.",
    techStack: ["React 19", "TypeScript", "CSS Grid", "Flexbox"],
    liveUrl: "https://16-web-editorial-layouts.vercel.app",
    altUrls: {
      vercel: "https://16-web-editorial-layouts.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/16-web-editorial-layouts",
    status: "live",
  },
  {
    id: "web-culinary-discovery",
    number: 17,
    name: "Culinary Discovery",
    category: "web",
    description: "Recipe discovery platform with ingredient-based search and meal planning features.",
    techStack: ["Vue 3", "TypeScript", "Edamam API", "Pinia"],
    liveUrl: "https://culinary-discovery.web.app",
    altUrls: {
      firebase: "https://culinary-discovery.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/17-web-culinary-discovery",
    status: "live",
  },
  {
    id: "web-atmospheric-dashboard",
    number: 18,
    name: "Atmospheric Dashboard",
    category: "web",
    description: "Weather dashboard with PWA support, location-based forecasts, and interactive radar maps.",
    techStack: ["Angular 21", "TypeScript", "OpenWeather API", "PWA"],
    liveUrl: "https://atmospheric-dashboard.web.app",
    altUrls: {
      firebase: "https://atmospheric-dashboard.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/18-web-atmospheric-dashboard",
    status: "live",
  },
  {
    id: "web-viral-creator",
    number: 19,
    name: "Viral Creator",
    category: "web",
    description: "Meme and viral content creation tool with templates, filters, and social media integration.",
    techStack: ["React 19", "TypeScript", "Canvas API", "GIPHY"],
    liveUrl: "https://meme-creator-47cf1.web.app",
    altUrls: {
      firebase: "https://meme-creator-47cf1.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/19-web-viral-creator",
    status: "live",
  },
  {
    id: "web-career-navigator",
    number: 20,
    name: "Career Navigator",
    category: "web",
    description: "Technology career roadmap explorer with learning paths and skill tracking features.",
    techStack: ["React 19", "TypeScript", "D3.js", "State Machine"],
    liveUrl: "https://tech-roadmaps-vista.web.app",
    altUrls: {
      firebase: "https://tech-roadmaps-vista.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/20-web-career-navigator",
    status: "live",
  },
  {
    id: "web-enterprise-input",
    number: 21,
    name: "Enterprise Input",
    category: "web",
    description: "Complex form handling system with validation, multi-step workflows, and data persistence.",
    techStack: ["React 19", "TypeScript", "Formik", "Yup"],
    liveUrl: "https://enterprise-input.web.app",
    altUrls: {
      firebase: "https://enterprise-input.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/21-web-enterprise-input",
    status: "live",
  },
  {
    id: "web-professional-showcase",
    number: 22,
    name: "Professional Showcase",
    category: "web",
    description: "Professional services website with case studies, testimonials, and inquiry forms.",
    techStack: ["Vue 3", "TypeScript", "Tailwind CSS", "Vite"],
    liveUrl: "https://professional-showcase-vista.web.app",
    altUrls: {
      firebase: "https://professional-showcase-vista.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/22-web-professional-showcase",
    status: "live",
  },
  {
    id: "web-financial-printing",
    number: 23,
    name: "Financial Printing",
    category: "web",
    description: "Bank cheque and financial document generator with print-ready templates and customization.",
    techStack: ["Angular 21", "TypeScript", "Print.js", "PWA"],
    liveUrl: "https://financial-printing.web.app",
    altUrls: {
      firebase: "https://financial-printing.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/23-web-financial-printing",
    status: "live",
  },
  {
    id: "web-sketch-studio",
    number: 24,
    name: "Sketch Studio",
    category: "web",
    description: "Digital drawing and artwork creation tool with layers, brushes, and export functionality.",
    techStack: ["Vue 3", "TypeScript", "Fabric.js", "FileSaver.js"],
    liveUrl: "https://sketch-studio.web.app",
    altUrls: {
      firebase: "https://sketch-studio.web.app",
    },
    repoUrl: "https://github.com/mk-knight23/24-web-sketch-studio",
    status: "live",
  },
]

/**
 * Game Projects (25-34)
 * Browser-based games showcasing interactive graphics and game logic
 */
const gameProjects: Project[] = [
  {
    id: "game-neon-highway",
    number: 25,
    name: "Neon Highway",
    category: "game",
    description: "Retro synthwave endless runner with neon visuals and increasingly difficult obstacles.",
    techStack: ["Canvas API", "JavaScript", "Web Audio API", "localStorage"],
    liveUrl: "https://25-game-neon-highway.vercel.app",
    altUrls: {
      vercel: "https://25-game-neon-highway.vercel.app",
      render: "https://two5-game-neon-highway.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/25-game-neon-highway",
    status: "live",
    audit: {
      buildStatus: "success",
      screenshotVerified: true,
      linesOfCode: 12456,
      deploymentCount: 2,
    },
  },
  {
    id: "game-retro-vault",
    number: 26,
    name: "Retro Vault",
    category: "game",
    description: "Classic arcade game collection featuring pixel art and authentic retro sound effects.",
    techStack: ["Phaser.js", "TypeScript", "Howler.js", "IndexedDB"],
    liveUrl: "https://26-game-retro-vault.vercel.app",
    altUrls: {
      vercel: "https://26-game-retro-vault.vercel.app",
      render: "https://two6-game-retro-vault.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/26-game-retro-vault",
    status: "live",
  },
  {
    id: "game-world-net",
    number: 27,
    name: "World Net",
    category: "game",
    description: "Multiplayer networking puzzle game with real-time collaborative gameplay features.",
    techStack: ["Socket.io", "React", "Node.js", "Redis"],
    liveUrl: "https://27-game-world-net.vercel.app",
    altUrls: {
      vercel: "https://27-game-world-net.vercel.app",
      render: "https://two7-game-world-net.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/27-game-world-net",
    status: "live",
  },
  {
    id: "game-squid-net",
    number: 28,
    name: "Squid Net",
    category: "game",
    description: "Squid game-inspired challenges with tense gameplay mechanics and high-stakes outcomes.",
    techStack: ["Three.js", "React", "Cannon.js", "WebGL"],
    liveUrl: "https://two8-game-squid-net.onrender.com",
    altUrls: {
      vercel: "https://28-game-squid-net.vercel.app",
      render: "https://two8-game-squid-net.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/28-game-squid-net",
    status: "live",
  },
  {
    id: "game-snake-net",
    number: 29,
    name: "Snake Net",
    category: "game",
    description: "Modern multiplayer snake game with power-ups, obstacles, and competitive leaderboards.",
    techStack: ["Canvas", "Socket.io", "Express", "MongoDB"],
    liveUrl: "https://29-game-snake-net.vercel.app",
    altUrls: {
      vercel: "https://29-game-snake-net.vercel.app",
      render: "https://two9-game-snake-net.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/29-game-snake-net",
    status: "live",
  },
  {
    id: "game-dragon-surge",
    number: 30,
    name: "Dragon Surge",
    category: "game",
    description: "Epic dragon battle game with upgradeable abilities and increasingly powerful enemies.",
    techStack: ["Phaser 3", "TypeScript", "Howler.js", "LocalStorage"],
    liveUrl: "https://30-game-dragon-surge.vercel.app",
    altUrls: {
      vercel: "https://30-game-dragon-surge.vercel.app",
      render: "https://three0-game-dragon-surge.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/30-game-dragon-surge",
    status: "live",
  },
  {
    id: "game-maze-net",
    number: 31,
    name: "Maze Net",
    category: "game",
    description: "Procedurally generated maze game with multiplayer racing and time-trial challenges.",
    techStack: ["Canvas", "Prim's Algorithm", "WebSocket", "React"],
    liveUrl: "https://31-game-maze-net.vercel.app",
    altUrls: {
      vercel: "https://31-game-maze-net.vercel.app",
      render: "https://three1-game-maze-net.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/31-game-maze-net",
    status: "live",
  },
  {
    id: "game-flux-arcade",
    number: 32,
    name: "Flux Arcade",
    category: "game",
    description: "Arcade game collection with fluid animations and responsive touch controls.",
    techStack: ["PixiJS", "TypeScript", "GSAP", "Vite"],
    liveUrl: "https://32-game-flux-arcade.vercel.app",
    altUrls: {
      vercel: "https://32-game-flux-arcade.vercel.app",
      render: "https://three2-game-flux-arcade.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/32-game-flux-arcade",
    status: "live",
  },
  {
    id: "game-aptitude-nexus",
    number: 33,
    name: "Aptitude Nexus",
    category: "game",
    description: "Brain training game with logic puzzles, memory challenges, and skill progression.",
    techStack: ["React", "Redux", "TypeScript", "Chart.js"],
    liveUrl: "https://33-game-aptitude-nexus.vercel.app",
    altUrls: {
      vercel: "https://33-game-aptitude-nexus.vercel.app",
      render: "https://three3-game-aptitude-nexus.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/33-game-aptitude-nexus",
    status: "live",
  },
  {
    id: "game-sigma-nexus",
    number: 34,
    name: "Sigma Nexus",
    category: "game",
    description: "Strategy game with resource management, base building, and multiplayer conquest mechanics.",
    techStack: ["Three.js", "Socket.io", "Node.js", "PostgreSQL"],
    liveUrl: "https://34-game-sigma-nexus.vercel.app",
    altUrls: {
      vercel: "https://34-game-sigma-nexus.vercel.app",
      render: "https://three4-game-sigma-nexus.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/34-game-sigma-nexus",
    status: "live",
  },
]

/**
 * Tool Projects (35-44)
 * Developer utilities and productivity tools
 */
const toolProjects: Project[] = [
  {
    id: "tool-quizflow-pdf",
    number: 35,
    name: "QuizFlow PDF",
    category: "tool",
    description: "Quiz and assessment generator with PDF export, question banks, and answer key generation.",
    techStack: ["React", "PDF.js", "TypeScript", "Local Storage"],
    liveUrl: "https://35-tool-quizflow-pdf-quiz-generator.vercel.app",
    altUrls: {
      vercel: "https://35-tool-quizflow-pdf-quiz-generator.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/35-tool-quizflow-pdf",
    status: "live",
    audit: {
      buildStatus: "success",
      screenshotVerified: true,
      linesOfCode: 8934,
      deploymentCount: 1,
    },
  },
  {
    id: "tool-vaultpass",
    number: 36,
    name: "VaultPass",
    category: "tool",
    description: "Secure password vault with encryption, password generation, and secure sharing features.",
    techStack: ["React", "CryptoJS", "IndexedDB", "TypeScript"],
    liveUrl: "https://36-tool-vaultpass-secure-password-g.vercel.app",
    altUrls: {
      vercel: "https://36-tool-vaultpass-secure-password-g.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/36-tool-vaultpass",
    status: "live",
  },
  {
    id: "tool-text-to-speech",
    number: 37,
    name: "Text to Speech",
    category: "tool",
    description: "Text-to-speech application with multiple voices, speed controls, and audio export.",
    techStack: ["Web Speech API", "React", "MediaRecorder", "WAV"],
    liveUrl: "https://37-tool-text-to-speech.vercel.app",
    altUrls: {
      vercel: "https://37-tool-text-to-speech.vercel.app",
      render: "https://three7-tool-text-to-speech.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/37-tool-text-to-speech",
    status: "live",
  },
  {
    id: "tool-firebase-file-uploader",
    number: 38,
    name: "Firebase File Uploader",
    category: "tool",
    description: "Advanced file upload system with Firebase Storage, drag-and-drop, and progress tracking.",
    techStack: ["React", "Firebase Storage", "TypeScript", "Dropzone"],
    liveUrl: "https://38-tool-firebase-file-uploader.vercel.app",
    altUrls: {
      vercel: "https://38-tool-firebase-file-uploader.vercel.app",
      render: "https://three8-tool-firebase-file-uploader.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/38-tool-firebase-file-uploader",
    status: "live",
  },
  {
    id: "tool-firebase-image-uploader",
    number: 39,
    name: "Firebase Image Uploader",
    category: "tool",
    description: "Image upload tool with compression optimization, multiple upload, and gallery preview.",
    techStack: ["React", "Firebase Storage", "ImageOptimizer", "TypeScript"],
    liveUrl: "https://39-tool-firebase-image-uploader.vercel.app",
    altUrls: {
      vercel: "https://39-tool-firebase-image-uploader.vercel.app",
      render: "https://three9-tool-firebase-image-uploader.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/39-tool-firebase-image-uploader",
    status: "live",
  },
  {
    id: "tool-react-image-uploader",
    number: 40,
    name: "React Image Uploader",
    category: "tool",
    description: "Client-side image uploader with preview, cropping, and compression before upload.",
    techStack: ["React", "react-image-crop", "Compressor.js", "Axios"],
    liveUrl: "https://40-tool-react-image-uploader.vercel.app",
    altUrls: {
      vercel: "https://40-tool-react-image-uploader.vercel.app",
      render: "https://four0-tool-react-image-uploader.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/40-tool-react-image-uploader",
    status: "live",
  },
  {
    id: "tool-firebase-auth",
    number: 41,
    name: "Firebase Auth Demo",
    category: "tool",
    description: "Complete Firebase authentication implementation with email, Google, and GitHub OAuth.",
    techStack: ["React", "Firebase Auth", "React Router", "Context API"],
    liveUrl: "https://41-tool-firebase-auth.vercel.app",
    altUrls: {
      vercel: "https://41-tool-firebase-auth.vercel.app",
      render: "https://four1-tool-firebase-auth.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/41-tool-firebase-auth",
    status: "live",
  },
  {
    id: "tool-facebook-login-ui",
    number: 42,
    name: "Facebook Login UI",
    category: "tool",
    description: "Facebook-style login interface with responsive design and accessibility features.",
    techStack: ["React", "CSS Modules", "TypeScript", "Formik"],
    liveUrl: "https://42-tool-facebook-login-ui.vercel.app",
    altUrls: {
      vercel: "https://42-tool-facebook-login-ui.vercel.app",
      render: "https://four2-tool-facebook-login-ui.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/42-tool-facebook-login-ui",
    status: "live",
  },
  {
    id: "tool-agency-website-clone",
    number: 43,
    name: "Agency Website Clone",
    category: "tool",
    description: "Digital agency website clone with animations, case studies, and contact forms.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Swiper"],
    liveUrl: "https://43-tool-agency-website-clone.vercel.app",
    altUrls: {
      vercel: "https://43-tool-agency-website-clone.vercel.app",
      render: "https://four3-tool-agency-website-clone.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/43-tool-agency-website-clone",
    status: "live",
  },
  {
    id: "tool-github-desktop-guide",
    number: 44,
    name: "GitHub Desktop Guide",
    category: "tool",
    description: "Interactive guide for GitHub Desktop with tutorials, shortcuts, and best practices.",
    techStack: ["Vue", "Electron", "TypeScript", "GitHub API"],
    liveUrl: "https://44-tool-github-desktop-guide.vercel.app",
    altUrls: {
      vercel: "https://44-tool-github-desktop-guide.vercel.app",
      render: "https://four4-tool-github-desktop-guide.onrender.com",
    },
    repoUrl: "https://github.com/mk-knight23/44-tool-github-desktop-guide",
    status: "live",
  },
]

/**
 * Starter Projects (45-60)
 * Boilerplate templates for rapid development
 */
const starterProjects: Project[] = [
  {
    id: "starter-react-vercel",
    number: 45,
    name: "React Vercel",
    category: "starter",
    description: "Production-ready React 19 template with Vercel deployment, TypeScript, and Tailwind CSS.",
    techStack: ["React 19", "Vite", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://45-starter-react-vercel.vercel.app",
    altUrls: {
      vercel: "https://45-starter-react-vercel.vercel.app",
      cloudflare: "https://45-starter-react-vercel.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/45-starter-react-vercel",
    status: "live",
    audit: {
      buildStatus: "success",
      screenshotVerified: true,
      linesOfCode: 5432,
      deploymentCount: 2,
    },
  },
  {
    id: "starter-ionic-react",
    number: 46,
    name: "Ionic React",
    category: "starter",
    description: "Cross-platform mobile app starter with Ionic Framework, React, and Capacitor.",
    techStack: ["Ionic", "React", "Capacitor", "TypeScript"],
    liveUrl: "https://46-starter-ionic-react.vercel.app",
    altUrls: {
      vercel: "https://46-starter-ionic-react.vercel.app",
      cloudflare: "https://46-starter-ionic-react.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/46-starter-ionic-react",
    status: "live",
  },
  {
    id: "starter-django",
    number: 47,
    name: "Django",
    category: "starter",
    description: "Full-stack Python starter with Django REST Framework, PostgreSQL, and Docker setup.",
    techStack: ["Django", "Python", "PostgreSQL", "Docker"],
    liveUrl: "https://47-starter-django.vercel.app",
    altUrls: {
      vercel: "https://47-starter-django.vercel.app",
      cloudflare: "https://47-starter-django.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/47-starter-django",
    status: "live",
  },
  {
    id: "starter-flask",
    number: 48,
    name: "Flask",
    category: "starter",
    description: "Lightweight Python web framework starter with REST API, SQLAlchemy, and JWT auth.",
    techStack: ["Flask", "Python", "SQLAlchemy", "JWT"],
    liveUrl: "https://48-starter-flask.vercel.app",
    altUrls: {
      vercel: "https://48-starter-flask.vercel.app",
      cloudflare: "https://48-starter-flask.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/48-starter-flask",
    status: "live",
  },
  {
    id: "starter-jamstack-blog",
    number: 49,
    name: "Jamstack Blog",
    category: "starter",
    description: "Static blog generator with JAMstack architecture, markdown content, and CDN deployment.",
    techStack: ["Vue 3", "Vite-SSG", "TypeScript", "Markdown"],
    liveUrl: "https://49-starter-jamstack-blog.vercel.app",
    altUrls: {
      vercel: "https://49-starter-jamstack-blog.vercel.app",
      cloudflare: "https://49-starter-jamstack-blog.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/49-starter-jamstack-blog",
    status: "live",
  },
  {
    id: "starter-react-boilerplate",
    number: 50,
    name: "React Boilerplate",
    category: "starter",
    description: "Comprehensive React 19 boilerplate with routing, state management, and testing setup.",
    techStack: ["React 19", "Vite", "TypeScript", "Vitest"],
    liveUrl: "https://50-starter-react-boilerplate.vercel.app",
    altUrls: {
      vercel: "https://50-starter-react-boilerplate.vercel.app",
      cloudflare: "https://50-starter-react-boilerplate.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/50-starter-react-boilerplate",
    status: "live",
  },
  {
    id: "starter-codesandbox",
    number: 51,
    name: "CodeSandbox",
    category: "starter",
    description: "Pre-configured CodeSandbox template for rapid prototyping and collaborative development.",
    techStack: ["React", "Vite", "TypeScript", "CodeSandbox"],
    liveUrl: "https://51-starter-codesandbox.vercel.app",
    altUrls: {
      vercel: "https://51-starter-codesandbox.vercel.app",
      cloudflare: "https://51-starter-codesandbox.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/51-starter-codesandbox",
    status: "live",
  },
  {
    id: "starter-hugo-blog",
    number: 52,
    name: "Hugo Blog",
    category: "starter",
    description: "Fast static site generator with Hugo, markdown content, and theme customization.",
    techStack: ["Hugo", "Markdown", "Go", "Netlify"],
    liveUrl: "https://52-starter-hugo-blog.vercel.app",
    altUrls: {
      vercel: "https://52-starter-hugo-blog.vercel.app",
      cloudflare: "https://52-starter-hugo-blog.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/52-starter-hugo-blog",
    status: "live",
  },
  {
    id: "starter-docusaurus-docs",
    number: 53,
    name: "Docusaurus/Angular",
    category: "starter",
    description: "Documentation site starter with Docusaurus, MDX content, and search integration.",
    techStack: ["Angular 19", "TypeScript", "RxJS", "Angular CLI"],
    liveUrl: "https://53-starter-docusaurus-docs.vercel.app",
    altUrls: {
      vercel: "https://53-starter-docusaurus-docs.vercel.app",
      cloudflare: "https://53-starter-docusaurus-docs.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/53-starter-docusaurus-docs",
    status: "live",
  },
  {
    id: "starter-gatsby-blog",
    number: 54,
    name: "Gatsby/Vue Blog",
    category: "starter",
    description: "Modern static blog with Vue 3, Vite-SSG, and optimized image handling.",
    techStack: ["Vue 3", "Vite", "TypeScript", "Vite-SSG"],
    liveUrl: "https://54-starter-gatsby-blog.vercel.app",
    altUrls: {
      vercel: "https://54-starter-gatsby-blog.vercel.app",
      cloudflare: "https://54-starter-gatsby-blog.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/54-starter-gatsby-blog",
    status: "live",
  },
  {
    id: "starter-angular-web",
    number: 55,
    name: "Angular Web",
    category: "starter",
    description: "Enterprise Angular 19 application template with routing, forms, and HTTP client setup.",
    techStack: ["Angular 19", "TypeScript", "RxJS", "Angular CLI"],
    liveUrl: "https://55-starter-angular-web.vercel.app",
    altUrls: {
      vercel: "https://55-starter-angular-web.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/55-starter-angular-web",
    status: "live",
  },
  {
    id: "starter-electron-desktop",
    number: 56,
    name: "Electron Desktop",
    category: "starter",
    description: "Cross-platform desktop application template with Electron, React, and native integrations.",
    techStack: ["Electron", "React", "TypeScript", "electron-builder"],
    liveUrl: "https://56-starter-electron-desktop.vercel.app",
    altUrls: {
      vercel: "https://56-starter-electron-desktop.vercel.app",
      cloudflare: "https://56-starter-electron-desktop.pages.dev",
    },
    repoUrl: "https://github.com/mk-knight23/56-starter-electron-desktop",
    status: "live",
  },
  {
    id: "starter-python-practice",
    number: 57,
    name: "Python Practice",
    category: "starter",
    description: "Python learning environment with exercises, examples, and interactive coding challenges.",
    techStack: ["Python", "HTML", "CSS", "JavaScript"],
    liveUrl: "https://57-starter-python-practice.vercel.app",
    altUrls: {
      vercel: "https://57-starter-python-practice.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/57-starter-python-practice",
    status: "live",
  },
  {
    id: "starter-python-examples",
    number: 58,
    name: "Python Examples",
    category: "starter",
    description: "Comprehensive Python code examples covering algorithms, data structures, and best practices.",
    techStack: ["React", "Python", "TypeScript", "FastAPI"],
    liveUrl: "https://58-starter-python-examples.vercel.app",
    altUrls: {
      vercel: "https://58-starter-python-examples.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/58-starter-python-examples",
    status: "live",
  },
  {
    id: "starter-repo-demo",
    number: 59,
    name: "Repo Demo",
    category: "starter",
    description: "Demo repository showcasing best practices, Git workflows, and collaboration patterns.",
    techStack: ["Vue 3", "Vite", "TypeScript", "Git"],
    liveUrl: "https://59-starter-repo-demo.vercel.app",
    altUrls: {
      vercel: "https://59-starter-repo-demo.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/59-starter-repo-demo",
    status: "live",
  },
  {
    id: "starter-cadwork-internship",
    number: 60,
    name: "Cadwork Internship",
    category: "starter",
    description: "Professional internship project showcasing real-world development experience and skills.",
    techStack: ["Angular 19", "TypeScript", "RxJS", "NgRx"],
    liveUrl: "https://60-starter-cadwork-internship.vercel.app",
    altUrls: {
      vercel: "https://60-starter-cadwork-internship.vercel.app",
    },
    repoUrl: "https://github.com/mk-knight23/60-starter-cadwork-internship",
    status: "live",
  },
]

/**
 * All 60 projects combined
 */
export const projects: Project[] = [
  ...portfolioProjects,
  ...webProjects,
  ...gameProjects,
  ...toolProjects,
  ...starterProjects,
]

/**
 * Get project by number
 */
export function getProjectByNumber(number: number): Project | undefined {
  return projects.find((p) => p.number === number)
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category)
}

/**
 * Get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/**
 * Category information for the showcase
 */
export const categoryInfo = {
  portfolio: {
    emoji: "💼",
    title: "Portfolio",
    subtitle: "Professional portfolio websites",
    count: portfolioProjects.length,
  },
  web: {
    emoji: "🌐",
    title: "Web Apps",
    subtitle: "Interactive web applications",
    count: webProjects.length,
  },
  game: {
    emoji: "🎮",
    title: "Games",
    subtitle: "Browser-based games",
    count: gameProjects.length,
  },
  tool: {
    emoji: "🛠️",
    title: "Tools",
    subtitle: "Developer utilities",
    count: toolProjects.length,
  },
  starter: {
    emoji: "🚀",
    title: "Starters",
    subtitle: "Boilerplate templates",
    count: starterProjects.length,
  },
}

/**
 * Category keys for type-safe category selection
 */
export const categoryKeys = ["portfolio", "web", "game", "tool", "starter"] as const

export type CategoryKey = (typeof categoryKeys)[number]
