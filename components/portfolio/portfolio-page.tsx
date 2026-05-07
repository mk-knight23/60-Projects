"use client"

import { useEffect, useRef, useState } from "react"
import s from "./portfolio.module.css"
import { projects as allProjects, categoryInfo, type Project, type ProjectCategory } from "@/lib/projects-data"

const CAT_EMOJI: Record<ProjectCategory, string> = {
  portfolio: "💼",
  web: "🌐",
  game: "🎮",
  tool: "🛠️",
  starter: "🚀",
}
const CAT_COLORS: Record<ProjectCategory, string> = {
  portfolio: "#6366f1",
  web: "#0ea5e9",
  game: "#f59e0b",
  tool: "#10b981",
  starter: "#ec4899",
}
const CAT_LABEL: Record<ProjectCategory, string> = {
  portfolio: "Portfolios",
  web: "Web Apps",
  game: "Games",
  tool: "Tools",
  starter: "Starters",
}

const CATEGORY_INFO: Record<ProjectCategory, { label: string; count: number }> = {
  portfolio: { label: CAT_LABEL.portfolio, count: categoryInfo.portfolio.count },
  web: { label: CAT_LABEL.web, count: categoryInfo.web.count },
  game: { label: CAT_LABEL.game, count: categoryInfo.game.count },
  tool: { label: CAT_LABEL.tool, count: categoryInfo.tool.count },
  starter: { label: CAT_LABEL.starter, count: categoryInfo.starter.count },
}

const Ico = {
  arrow: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  ),
  ext: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
  ),
  gh: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
  ),
  tw: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  li: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  ),
  mail: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  ),
  search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
  ),
}

// Deterministic pseudo-random heatmap (avoids SSR/CSR hydration mismatch).
// Computed once at module scope — same cells on server + client.
const HEATMAP_CELLS: number[] = (() => {
  let seed = 0x60601337
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return Array.from({ length: 52 * 7 }, () => {
    const r = rand()
    return r < 0.45 ? 0 : r < 0.65 ? 1 : r < 0.8 ? 2 : r < 0.92 ? 3 : 4
  })
})()

function Counter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          const start = Date.now()
          const tick = () => {
            const progress = Math.min((Date.now() - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setVal(Math.round(ease * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])
  return (
    <header className={s.header} style={{ boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none" }}>
      <div className={`${s.container} ${s.headerInner}`}>
        <a href="#" className={s.logo}>
          <div className={s.logoMark}>MK</div>
          Musharraf Kazi
        </a>
        <nav className={s.nav}>
          <a href="#mission">Mission</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#showcase">60 Projects</a>
          <a href="#skills">Stack</a>
          <a href="#about">About</a>
          <a href="/pricing">Pricing</a>
        </nav>
        <div className={s.navCta}>
          <a href="https://github.com/mk-knight23" target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} style={{ gap: 6 }}>
            <Ico.gh /> GitHub
          </a>
          <a href="#cta" className={`${s.btn} ${s.btnDark} ${s.btnSm}`}>Hire Me</a>
        </div>
      </div>
    </header>
  )
}

function Hero({ tagline }: { tagline: string }) {
  const lines = tagline.split("\n")
  return (
    <section className={s.hero}>
      <div className={s.heroNoise} />
      <div className={s.heroGridLines} />
      <div className={s.container}>
        <div className={s.heroInner}>
          <div className={s.heroEyebrow}>
            <div className={s.heroAvatar}>MK</div>
            <div className={s.heroNameTag}>
              <strong>Musharraf Kazi</strong>
              <span>AI Organization Architect · India</span>
            </div>
            <div style={{ marginLeft: 16 }}>
              <span className={s.heroStatus}>
                <span className={s.statusDot} />
                Available for opportunities
              </span>
            </div>
          </div>
          <h1 className={s.heroTitle}>
            {lines.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {i === lines.length - 1 ? <span style={{ color: "var(--text3)" }}>{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className={s.heroDesc}>
            AI Engineer & Indie Builder crafting production-grade ecosystems — 80+ shipped projects, 10+ AI products, and a vision to build organizations that run on intelligence.
          </p>
          <div className={s.heroActions}>
            <a href="#showcase" className={`${s.btn} ${s.btnDark} ${s.btnLg}`} style={{ gap: 8 }}>
              See 60 Projects <Ico.arrow />
            </a>
            <a href="#ecosystem" className={`${s.btn} ${s.btnOutlineDark} ${s.btnLg}`}>Explore Ecosystem</a>
            <a href="/pricing" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}>Pricing</a>
          </div>
          <div className={s.heroStatsRow}>
            {[
              { val: 80, suffix: "+", label: "Projects Shipped" },
              { val: 10, suffix: "+", label: "AI Products Built" },
              { val: 6, suffix: "+", label: "Years Experience" },
              { val: 5, suffix: "+", label: "Cloud Platforms" },
              { val: 30, suffix: "+", label: "LLM Integrations" },
            ].map((st) => (
              <div key={st.label}>
                <div className={s.heroStatVal}>
                  <Counter target={st.val} suffix={st.suffix} />
                </div>
                <div className={s.heroStatLbl}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ["Next.js 16", "React 19", "TypeScript", "FastAPI", "Python", "LangGraph", "LangChain", "Supabase", "PostgreSQL", "Stripe", "OpenAI", "Claude", "Three.js", "Docker", "Vercel", "Cloudflare", "Firebase", "Vue 3", "Angular 21", "Electron", "TailwindCSS", "Framer Motion"]
  const doubled = [...items, ...items]
  return (
    <div className={s.marqueeWrap}>
      <div className={s.marqueeTrack}>
        {doubled.map((item, i) => (
          <span className={s.marqueeItem} key={i}>
            <span className={s.marqueeSep} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function Mission() {
  const pills = [
    { icon: "🧠", text: "AI Organization Architect" },
    { icon: "⚡", text: "Systems over features" },
    { icon: "🎯", text: "Production-first, always" },
    { icon: "🔁", text: "Autonomous by design" },
  ]
  return (
    <section className={s.mission} id="mission">
      <div className={s.container}>
        <div className={s.sectionLabel}>Philosophy</div>
        <blockquote className={s.missionQuote}>
          &ldquo;I don&apos;t think in projects. I think in <em>systems</em>, platforms, and ecosystems. Every line of code I write is infrastructure for <em>something larger</em> — an AI-powered organization that doesn&apos;t need me to run it.&rdquo;
        </blockquote>
        <div className={s.missionMeta}>
          {pills.map((p) => (
            <div className={s.missionPill} key={p.text}>
              <span className={s.missionPillIcon}>{p.icon}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Ecosystem() {
  const ecosystems = [
    {
      num: "01",
      title: "VIBE Ecosystem",
      desc: "Primary focus — a multi-product AI platform competing with Cursor and Claude Code. CLI devtool, VS Code extension, AI web builder, and Vibe Chat, all on a monorepo architecture with production-first principles.",
      tags: ["VIBE CLI", "VS Code Extension", "Vibe Chat", "Vibe Web", "Multi-runtime"],
      status: "Building",
    },
    {
      num: "02",
      title: "AI-VIBE Ecosystem",
      desc: "10 shipped AI products — automation agents, multi-framework chat interfaces, CLI tools, and website builders. 30+ LLM integrations. Standardized security layers and multi-provider architecture across every product.",
      tags: ["10 Products", "30+ LLMs", "AI Automation", "AI Chat", "Website Builder"],
      status: "Live",
    },
    {
      num: "03",
      title: "AI-SDK Ecosystem",
      desc: "10 production SDK implementations across LangChain, LangGraph, CrewAI, AutoGen, Haystack, Semantic Kernel, OpenAI, Anthropic, Vercel AI, and LlamaIndex. Engineering depth signaling — zero dependencies between repos.",
      tags: ["LangGraph", "CrewAI", "AutoGen", "Semantic Kernel", "10 SDKs"],
      status: "Live",
    },
    {
      num: "04",
      title: "60 Projects Ecosystem",
      desc: "A curated portfolio of 60 production-ready projects across portfolios, web apps, games, tools, and starters. Every project is fully deployed on 5+ platforms with CI/CD, testing, and documentation. The proof of execution.",
      tags: ["60 Projects", "8 Portfolios", "16 Web Apps", "10 Games", "10 Tools", "16 Starters"],
      status: "Live",
    },
  ]
  return (
    <section className={s.ecosystem} id="ecosystem">
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <div className={s.sectionLabel}>Ecosystem Overview</div>
          <h2 className={s.sectionTitle}>
            Four Ecosystems.
            <br />
            <em>One Architecture.</em>
          </h2>
          <p className={s.sectionSub}>I don&apos;t build projects in isolation. Every product is part of a larger system designed to compound, automate, and scale.</p>
        </div>
        <div className={s.ecoGrid}>
          {ecosystems.map((e) => (
            <div className={s.ecoCard} key={e.num}>
              <div className={s.ecoNum}>{e.num}</div>
              <div className={s.ecoStatusBadge}>
                <span className={`${s.badge} ${e.status === "Building" ? s.badgeAccent : s.badgeLive}`}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", display: "inline-block", animation: e.status === "Live" ? "mkPulseDot 2s infinite" : undefined }} />
                  {e.status}
                </span>
              </div>
              <div className={s.ecoTitle}>{e.title}</div>
              <div className={s.ecoDesc}>{e.desc}</div>
              <div className={s.ecoTags}>
                {e.tags.map((t) => (
                  <span className={s.ecoTag} key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CurrentlyBuilding() {
  const items = [
    { title: "VIBE CLI", desc: "AI devtool CLI competing with Cursor CLI. 16+ tools, agent swarms, MCP integration, sub-100ms response target.", progress: 72, tag: "Primary" },
    { title: "VIBE Chat v2", desc: "Multi-LLM chat interface with edge-native runtime, real-time streaming, and embedded agent capabilities.", progress: 45, tag: "Active" },
    { title: "AI-VIBE Automation v3", desc: "Next-gen workflow automation engine. tRPC + Prisma + event-sourcing. n8n competitor, production-ready.", progress: 38, tag: "Active" },
  ]
  return (
    <section className={s.building}>
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <div className={s.sectionLabel}>Currently Building</div>
          <h2 className={s.sectionTitle}>
            What&apos;s in
            <br />
            <em>Progress Right Now</em>
          </h2>
        </div>
        <div className={s.buildGrid}>
          {items.map((item) => (
            <div className={s.buildCard} key={item.title}>
              <div className={s.buildCardHeader}>
                <div className={s.buildCardTitle}>{item.title}</div>
                <span className={`${s.badge} ${s.badgeNeutral}`}>{item.tag}</span>
              </div>
              <div className={s.buildCardDesc}>{item.desc}</div>
              <div className={s.buildProgress}>
                <div className={s.buildProgressFill} style={{ width: `${item.progress}%` }} />
              </div>
              <div className={s.buildProgressLabel}>
                <span>Progress</span>
                <span>{item.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const groups: { title: string; skills: [string, number][] }[] = [
    { title: "Frontend", skills: [["Next.js 16", 95], ["React 19", 95], ["TypeScript", 92], ["Tailwind CSS", 90], ["Vue 3", 82], ["Angular 21", 78]] },
    { title: "Backend & AI", skills: [["FastAPI", 88], ["LangGraph", 85], ["LangChain", 85], ["Python", 90], ["Node.js", 82], ["CrewAI", 75]] },
    { title: "Infrastructure", skills: [["Supabase", 88], ["Vercel", 92], ["Docker", 80], ["PostgreSQL", 82], ["Firebase", 85], ["Cloudflare", 78]] },
    { title: "AI / LLMs", skills: [["OpenAI API", 92], ["Claude API", 90], ["Multi-LLM Routing", 85], ["RAG Systems", 80], ["Prompt Eng.", 88], ["MCP Protocol", 78]] },
  ]
  return (
    <section className={s.skills} id="skills">
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <div className={s.sectionLabel}>Technical Stack</div>
          <h2 className={s.sectionTitle}>
            Full-Stack AI.
            <br />
            <em>Front to Deploy.</em>
          </h2>
          <p className={s.sectionSub}>6+ years across the entire product stack. Not a specialist — a systems engineer who ships end-to-end.</p>
        </div>
        <div className={s.skillsGrid}>
          {groups.map((g) => (
            <div className={s.skillGroup} key={g.title}>
              <div className={s.skillGroupTitle}>{g.title}</div>
              <ul className={s.skillList}>
                {g.skills.map(([name, pct]) => (
                  <li className={s.skillItem} key={name}>
                    <span>{name}</span>
                    <div className={s.skillBar}>
                      <div className={s.skillBarFill} style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const color = CAT_COLORS[project.category] || "#888"
  return (
    <div className={s.pcard}>
      <div className={s.pcardThumb}>
        <div className={s.pcardThumbLines} />
        <div className={s.pcardThumbIcon}>{CAT_EMOJI[project.category]}</div>
        <div className={s.pcardThumbNum}>#{String(project.number).padStart(2, "0")}</div>
        <div className={s.pcardThumbBar} style={{ background: color, opacity: 0.6 }} />
      </div>
      <div className={s.pcardBody}>
        {project.role && <div className={s.pcardRole}>{project.role}</div>}
        <div className={s.pcardTitle}>{project.name}</div>
        <div className={s.pcardDesc}>{project.description}</div>
        <div className={s.pcardTech}>
          {project.techStack.slice(0, 4).map((t) => (
            <span className={s.pcardTag} key={t}>{t}</span>
          ))}
          {project.techStack.length > 4 && <span className={s.pcardTag}>+{project.techStack.length - 4}</span>}
        </div>
        <div className={s.pcardActions}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${s.pcardBtn} ${s.pcardBtnPrimary}`}>
            <Ico.ext /> Live
          </a>
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={`${s.pcardBtn} ${s.pcardBtnGhost}`}>
            <Ico.gh /> Code
          </a>
        </div>
      </div>
    </div>
  )
}

function Showcase() {
  const [cat, setCat] = useState<string>("all")
  const [q, setQ] = useState("")
  const [showAll, setShowAll] = useState(false)
  const LIMIT = 12
  const filtered = allProjects.filter((p) => {
    const matchCat = cat === "all" || p.category === cat
    const lq = q.toLowerCase()
    const matchQ =
      !lq ||
      p.name.toLowerCase().includes(lq) ||
      p.description.toLowerCase().includes(lq) ||
      p.techStack.some((t) => t.toLowerCase().includes(lq))
    return matchCat && matchQ
  })
  const displayed = showAll ? filtered : filtered.slice(0, LIMIT)
  const cats = [
    { key: "all", label: "All", count: allProjects.length },
    ...Object.entries(CATEGORY_INFO).map(([k, v]) => ({ key: k, label: v.label, count: v.count })),
  ]
  return (
    <section className={s.showcase} id="showcase">
      <div className={s.containerWide}>
        <div className={s.sectionHeader}>
          <div className={s.sectionLabel}>60 Projects Ecosystem</div>
          <h2 className={s.sectionTitle}>
            Proof of Execution.
            <br />
            <em>60 Production Projects.</em>
          </h2>
          <p className={s.sectionSub}>Every project is live, deployed, and open source. Filter by category or search by technology stack.</p>
        </div>
        <div className={s.searchWrap}>
          <span className={s.searchIconEl}>
            <Ico.search />
          </span>
          <input
            className={s.searchInput}
            placeholder="Search projects, tech, category…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setShowAll(false)
            }}
          />
        </div>
        <div className={s.filterRow}>
          {cats.map((c) => (
            <button
              key={c.key}
              className={`${s.filterBtn} ${cat === c.key ? s.filterBtnActive : ""}`}
              onClick={() => {
                setCat(c.key)
                setShowAll(false)
              }}
            >
              {c.key !== "all" && CAT_EMOJI[c.key as ProjectCategory]} {c.label}
              <span className={s.filterCount}>{c.count}</span>
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "56px 0", color: "var(--text3)", fontFamily: "var(--mono)", fontSize: 13 }}>
            No results for &ldquo;{q}&rdquo;
          </div>
        ) : (
          <>
            <div className={s.projectsGrid}>
              {displayed.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            {!showAll && filtered.length > LIMIT && (
              <div className={s.showMoreWrap}>
                <button className={`${s.btn} ${s.btnOutlineDark} ${s.btnLg}`} onClick={() => setShowAll(true)}>
                  Show all {filtered.length} projects
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function GitHubSection() {
  const cells = HEATMAP_CELLS
  const levelColor = (l: number) => {
    if (l === 0) return "#eeeeed"
    return `rgba(10,10,10,${l * 0.25})`
  }
  const langs: [string, number][] = [
    ["TypeScript", 42],
    ["Python", 24],
    ["JavaScript", 16],
    ["HTML/CSS", 10],
    ["Go/Other", 8],
  ]
  const stats = [
    { val: 121, lbl: "Repositories", sub: "Public + private" },
    { val: 80, lbl: "Projects Shipped", sub: "Production-ready" },
    { val: "6+", lbl: "Years Building", sub: "Full-stack + AI" },
    { val: "10+", lbl: "AI Products", sub: "Across ecosystems" },
  ]
  return (
    <section className={s.githubSection} id="github">
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <div className={s.sectionLabel}>GitHub Activity</div>
          <h2 className={s.sectionTitle}>
            Consistent Builder.
            <br />
            <em>Every Single Day.</em>
          </h2>
        </div>
        <div className={s.githubGrid}>
          <div className={s.githubCard}>
            <div className={s.sectionLabel} style={{ marginBottom: 16 }}>Contribution Activity</div>
            <div className={s.contribGrid}>
              {cells.map((lvl, i) => (
                <div key={i} className={s.contribCell} style={{ background: levelColor(lvl) }} />
              ))}
            </div>
            <div className={s.contribLegend}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={s.contribSwatch} style={{ background: levelColor(l), border: "1px solid var(--border)" }} />
              ))}
              <span>More</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {stats.map((st) => (
                <div className={s.githubCard} key={st.lbl}>
                  <div className={s.githubStatBig}>{typeof st.val === "number" ? <Counter target={st.val} /> : st.val}</div>
                  <div className={s.githubStatLabel}>{st.lbl}</div>
                  <div className={s.githubStatSub}>{st.sub}</div>
                </div>
              ))}
            </div>
            <div className={s.githubCard}>
              <div className={s.sectionLabel} style={{ marginBottom: 16 }}>Languages</div>
              {langs.map(([name, pct]) => (
                <div className={s.langRow} key={name}>
                  <span style={{ fontSize: 13, fontWeight: 600, width: 90, flexShrink: 0 }}>{name}</span>
                  <div className={s.langBarWrap}>
                    <div className={s.langBarFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={s.langPct}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className={s.about} id="about">
      <div className={s.container}>
        <div className={s.aboutGrid}>
          <div className={s.aboutLeft}>
            <div className={s.aboutAvatarLarge}>MK</div>
            <div className={s.aboutName}>Musharraf Kazi</div>
            <div className={s.aboutRole}>AI Organization Architect</div>
            <div className={s.aboutLinks}>
              <a href="https://github.com/mk-knight23" target="_blank" rel="noopener noreferrer" className={s.aboutLink}>
                <Ico.gh /> mk-knight23
              </a>
              <a href="https://x.com/mk_knight_23" target="_blank" rel="noopener noreferrer" className={s.aboutLink}>
                <Ico.tw /> @mk_knight_23
              </a>
              <a href="https://www.linkedin.com/in/kazi-musharraf-1373271b8" target="_blank" rel="noopener noreferrer" className={s.aboutLink}>
                <Ico.li /> Kazi Musharraf
              </a>
              <a href="mailto:hello@60projects.dev" className={s.aboutLink}>
                <Ico.mail /> hello@60projects.dev
              </a>
            </div>
          </div>
          <div className={s.aboutRight}>
            <div className={s.sectionLabel} style={{ marginBottom: 20 }}>My Story</div>
            <p>
              I started as a developer who built things. Then I became an engineer who built <strong>systems</strong>. Now I&apos;m an AI Organization Architect — someone who designs entire product ecosystems that can operate, grow, and compound with minimal human intervention.
            </p>
            <p>
              Over 6+ years, I&apos;ve shipped <strong>80+ projects</strong> across every major web framework and backend stack. But the number doesn&apos;t matter — what matters is that each one taught me something about building production systems at scale: real auth, real payments, real error handling, real deployment.
            </p>
            <p>
              The 60 Projects ecosystem is my clearest proof of concept. <strong>60 complete, production-ready applications</strong> — from AI agents to games to SaaS starters — each deployed on 5+ cloud platforms, with CI/CD, documentation, and real use cases. Not tutorials. Products.
            </p>
            <p>
              My next chapter: building AI-powered organizations. The <strong>VIBE ecosystem</strong> — CLI, IDE extension, web builder, chat — is the foundation. The goal is an AI company that runs on intelligence more than headcount.
            </p>
            <p>
              I&apos;m based in India, targeting <strong>₹35–50 LPA AI Engineer roles</strong> while building toward $10K+ MRR. If you&apos;re looking for someone who thinks in systems, ships in production, and builds toward something larger — let&apos;s talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className={s.ctaSection} id="cta">
      <div className={s.container}>
        <div className={s.ctaInner}>
          <div className={s.ctaLabel}>Ready to work together?</div>
          <h2 className={s.ctaTitle}>
            Let&apos;s Build
            <br />
            <span className="dim" style={{ opacity: 0.3 }}>Something Real.</span>
          </h2>
          <p className={s.ctaDesc}>
            Whether you need a senior AI engineer, want access to 60 production projects, or want to discuss building intelligent systems — I&apos;m available.
          </p>
          <div className={s.ctaActions}>
            <a href="mailto:hello@60projects.dev" className={`${s.btn} ${s.btnWhite} ${s.btnLg}`} style={{ gap: 8 }}>
              <Ico.mail /> Get in Touch
            </a>
            <a href="/pricing" className={`${s.btn} ${s.btnOutlineWhite} ${s.btnLg}`} style={{ gap: 8 }}>
              View Pricing <Ico.arrow />
            </a>
          </div>
          <div className={s.ctaRow}>
            <a href="https://github.com/mk-knight23" target="_blank" rel="noopener noreferrer" className={s.ctaSocial}>
              <Ico.gh /> mk-knight23
            </a>
            <a href="https://x.com/mk_knight_23" target="_blank" rel="noopener noreferrer" className={s.ctaSocial}>
              <Ico.tw /> @mk_knight_23
            </a>
            <a href="https://www.linkedin.com/in/kazi-musharraf-1373271b8" target="_blank" rel="noopener noreferrer" className={s.ctaSocial}>
              <Ico.li /> Kazi Musharraf
            </a>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: "var(--mono)", marginLeft: "auto" }}>
              Open to ₹35–50 LPA · AI Engineer · India
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterMK() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerInner}>
          <span className={s.footerCopy}>© 2026 Musharraf Kazi · AI Organization Architect</span>
          <div className={s.footerLinks}>
            <a href="https://github.com/mk-knight23" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://60projects.dev" target="_blank" rel="noopener noreferrer">60projects.dev</a>
            <a href="mailto:hello@60projects.dev">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function PortfolioPage() {
  const tagline = "I Don't Just Build Projects,\nI Build Products."
  return (
    <div className={s.root}>
      <Header />
      <main>
        <Hero tagline={tagline} />
        <Marquee />
        <Mission />
        <Ecosystem />
        <CurrentlyBuilding />
        <Skills />
        <Showcase />
        <GitHubSection />
        <About />
        <CTA />
      </main>
      <FooterMK />
    </div>
  )
}
