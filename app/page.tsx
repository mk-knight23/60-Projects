import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectShowcase } from "@/components/project-showcase"
import { plans } from "@/lib/plans"

/**
 * Landing page for 60 Projects Ecosystem
 * A curated collection of 60 real-world projects demonstrating production-level engineering
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">60 Production-Ready Projects</span>
              </div>

              {/* Main headline with rotating text */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
                Build Real Skills
                <br />
                <span className="text-rotate inline-block">
                  <span className="justify-items-center">
                    <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">With Real Projects</span>
                    <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">Not Toy Demos</span>
                    <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">Production Code</span>
                  </span>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-base-content/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                A curated ecosystem of 60 real-world projects covering AI, SaaS, web apps, games, tools, and developer utilities—demonstrate end-to-end product building, not just demos.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Link href="/pricing" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25 group">
                  <span>Get Full Access</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="#showcase" className="btn btn-ghost btn-lg gap-2 group">
                  <span>Browse Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Project Showcase - Moved to top for visibility */}
        <ProjectShowcase />

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-200/50 border border-base-content/5">
              <div className="stat place-items-center py-8 px-12">
                <div className="stat-figure text-primary">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="stat-title text-base">Projects</div>
                <div className="stat-value text-primary text-5xl">60</div>
                <div className="stat-desc text-sm">Production-ready apps</div>
              </div>
              <div className="stat place-items-center py-8 px-12">
                <div className="stat-figure text-secondary">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="stat-title text-base">Tech Stack</div>
                <div className="stat-value text-secondary text-5xl">Modern</div>
                <div className="stat-desc text-sm">Next.js, FastAPI, LangGraph</div>
              </div>
              <div className="stat place-items-center py-8 px-12">
                <div className="stat-figure text-accent">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="stat-title text-base">End-to-End</div>
                <div className="stat-value text-accent text-5xl">100%</div>
                <div className="stat-desc text-sm">From UI to deployment</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Bento Grid */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-primary badge-outline mb-4">Why 60 Projects</span>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Not Just Another
                <br />
                <span className="text-base-content/40">Tutorial Collection</span>
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {/* Large feature card */}
              <div className="md:col-span-2 card bg-linear-to-br from-primary/10 via-base-200 to-base-200 border border-base-content/5 overflow-hidden group hover:border-primary/30 transition-colors">
                <div className="card-body p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-primary/20 rounded-2xl">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="badge badge-ghost">Core Focus</span>
                  </div>
                  <h3 className="card-title text-2xl mb-2">End-to-End Projects</h3>
                  <p className="text-base-content/60 mb-6">Every project goes from concept to deployment. You&apos;ll see the complete journey—UI/UX, backend logic, database design, authentication, testing, and production deployment. No halfway demos.</p>
                  <div className="bg-base-300/50 rounded-xl p-6 text-center">
                    <p className="text-base-content/40 font-mono text-sm">frontend → backend → database → auth → deploy → docs</p>
                  </div>
                </div>
              </div>

              {/* Tall feature card */}
              <div className="md:row-span-2 card bg-linear-to-b from-secondary/10 via-base-200 to-base-200 border border-base-content/5 overflow-hidden group hover:border-secondary/30 transition-colors">
                <div className="card-body p-8 h-full flex flex-col">
                  <div className="p-3 bg-secondary/20 rounded-2xl w-fit mb-6">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="card-title text-2xl mb-2">Modern Tech Stack</h3>
                  <p className="text-base-content/60 mb-8">Industry-standard technologies that companies actually use today. No outdated frameworks or theoretical examples.</p>
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-3">
                      {["Next.js 16 (App Router)", "FastAPI & Python", "Supabase & PostgreSQL", "LangGraph AI Agents", "Stripe Payments", "Multi-LLM Integration"].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Small feature cards */}
              <div className="card bg-base-200 border border-base-content/5 hover:border-accent/30 transition-colors group">
                <div className="card-body p-6">
                  <div className="p-3 bg-accent/20 rounded-2xl w-fit mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Ecosystem Approach</h3>
                  <p className="text-base-content/60 text-sm">Projects work independently yet cohesively. Build portfolios, SaaS apps, games, tools, and CLI extensions.</p>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-content/5 hover:border-warning/30 transition-colors group">
                <div className="card-body p-6">
                  <div className="p-3 bg-warning/20 rounded-2xl w-fit mb-4">
                    <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Production-Level Quality</h3>
                  <p className="text-base-content/60 text-sm">Real error handling, security best practices, testing, deployment configs, and documentation. Not toy code.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 lg:py-32 bg-base-200/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-accent badge-outline mb-4">Compare</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Real Projects vs Tutorials
              </h2>
              <p className="text-base-content/60 text-lg">Why production-ready projects build better engineers</p>
            </div>

            {/* Desktop table - hidden on mobile */}
            <div className="hidden md:block overflow-x-auto max-w-4xl mx-auto">
              <table className="table table-lg">
                <thead>
                  <tr>
                    <th className="text-base-content/60">Feature</th>
                    <th className="text-center">
                      <span className="text-primary font-bold">60 Projects</span>
                    </th>
                    <th className="text-center text-base-content/40">YouTube Tutorials</th>
                    <th className="text-center text-base-content/40">Coding Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "End-to-end development", us: true, a: false, b: false },
                    { feature: "Production deployment", us: true, a: false, b: false },
                    { feature: "Real-world error handling", us: true, a: false, b: true },
                    { feature: "Modern tech stack", us: true, a: true, b: false },
                    { feature: "AI & LLM integration", us: true, a: false, b: false },
                    { feature: "Payment processing", us: true, a: false, b: false },
                    { feature: "Authentication & security", us: true, a: false, b: true },
                    { feature: "Database design & scaling", us: true, a: false, b: false },
                    { feature: "Testing & documentation", us: true, a: false, b: false },
                  ].map((row, i) => (
                    <tr key={i} className="hover">
                      <td className="font-medium">{row.feature}</td>
                      <td className="text-center">
                        {row.us ? (
                          <svg className="w-6 h-6 text-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-base-content/20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </td>
                      <td className="text-center">
                        {row.a ? (
                          <svg className="w-6 h-6 text-base-content/30 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-base-content/20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </td>
                      <td className="text-center">
                        {row.b ? (
                          <svg className="w-6 h-6 text-base-content/30 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-base-content/20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card layout - shown only on mobile */}
            <div className="md:hidden space-y-3 max-w-lg mx-auto">
              {[
                { feature: "End-to-end development", us: true, a: false, b: false },
                { feature: "Production deployment", us: true, a: false, b: false },
                { feature: "Real-world error handling", us: true, a: false, b: true },
                { feature: "Modern tech stack", us: true, a: true, b: false },
                { feature: "AI & LLM integration", us: true, a: false, b: false },
              ].map((row, i) => (
                <div key={i} className="card bg-base-100 border border-base-content/5">
                  <div className="card-body p-4">
                    <h3 className="font-semibold text-base mb-3">{row.feature}</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-primary font-medium">60 Projects</span>
                        {row.us ? (
                          <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-base-content/20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-base-content/40">Tutorials</span>
                        {row.a ? (
                          <svg className="w-5 h-5 text-base-content/30" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-base-content/20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-base-content/40">Courses</span>
                        {row.b ? (
                          <svg className="w-5 h-5 text-base-content/30" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-base-content/20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--p)/0.1),transparent_50%)]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="badge badge-secondary badge-outline mb-4">How It Works</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Start Building Real Skills
              </h2>
              <p className="text-base-content/60 text-lg">Three steps to production-level expertise</p>
            </div>

            <div className="flex justify-center">
              <ul className="steps steps-vertical lg:steps-horizontal steps-lg">
                <li className="step step-primary" data-content="1">
                  <div className="text-left lg:text-center mt-6 lg:mt-10 lg:px-8">
                    <h3 className="font-bold text-xl mb-2">Browse Projects</h3>
                    <p className="text-base text-base-content/60">Explore 60 production-ready projects across AI, SaaS, web apps, games, tools, and utilities. Find what matches your goals.</p>
                  </div>
                </li>
                <li className="step step-primary" data-content="2">
                  <div className="text-left lg:text-center mt-6 lg:mt-10 lg:px-8">
                    <h3 className="font-bold text-xl mb-2">Build & Learn</h3>
                    <p className="text-base text-base-content/60">Follow complete codebases from concept to deployment. Learn modern tech stack, best practices, and real-world patterns.</p>
                  </div>
                </li>
                <li className="step step-primary" data-content="3">
                  <div className="text-left lg:text-center mt-6 lg:mt-10 lg:px-8">
                    <h3 className="font-bold text-xl mb-2">Launch Your Career</h3>
                    <p className="text-base text-base-content/60">Deploy real projects, build a portfolio that stands out, and demonstrate production-level skills to employers and clients.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-accent badge-outline mb-4">Success Stories</span>
              <h2 className="text-4xl md:text-5xl font-black">
                Engineers Who Built Real Skills
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <TestimonialCard
                quote="Built 3 projects from the ecosystem. Landed a senior frontend role at a fintech startup. The production code experience was invaluable."
                author="Sarah Chen"
                role="Senior Frontend Engineer"
                highlight
              />
              <TestimonialCard
                quote="Finally found resources that show complete apps, not snippets. The AI agent projects helped me transition from web dev to AI engineering."
                author="Marcus Rodriguez"
                role="AI Engineer"
              />
              <TestimonialCard
                quote="Used the SaaS projects to build my own MVP. Got my first paying customers in 2 months. Real code beats tutorials every time."
                author="Emily Watson"
                role="Indie Founder"
              />
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-24 lg:py-32 bg-base-200/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-info badge-outline mb-4">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Invest in Your Engineering Career
              </h2>
              <p className="text-base-content/60 text-lg">One-time access to all 60 projects. Lifetime updates included.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto items-stretch">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`card flex-1 ${plan.popular
                    ? "bg-primary text-primary-content scale-105 shadow-xl shadow-primary/20"
                    : "bg-base-100 border border-base-content/10"
                    }`}
                >
                  <div className="card-body">
                    <div className={plan.popular ? "flex justify-between items-start" : ""}>
                      <div>
                        <h3 className="font-bold text-xl">{plan.name}</h3>
                        <p className={`text-sm ${plan.popular ? "text-primary-content/70" : "text-base-content/60"}`}>
                          {plan.description}
                        </p>
                      </div>
                      {plan.popular && <span className="badge badge-secondary">Popular</span>}
                    </div>
                    <div className="my-4">
                      <span className="text-4xl font-black">${plan.price}</span>
                      <span className={plan.popular ? "text-primary-content/70" : "text-base-content/60"}>/month</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <svg className={`w-4 h-4 ${plan.popular ? "" : "text-success"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.ctaLink}
                      className={`btn btn-block ${plan.popular
                        ? "bg-white text-primary hover:bg-white/90 border-0"
                        : "btn-ghost"
                        }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 lg:py-32 bg-base-200/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-warning badge-outline mb-4">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Common Questions
              </h2>
              <p className="text-base-content/60 text-lg">Everything you need to know</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "What makes these projects different from free tutorials?", a: "Unlike tutorials that show isolated features, every project here is a complete production-ready application. You get full codebases with authentication, payments, database design, error handling, testing, deployment configs, and documentation. This is how real apps are built." },
                { q: "What tech stack do the projects use?", a: "We use modern, industry-standard technologies: Next.js 16 (App Router), FastAPI & Python for backends, Supabase for database, LangGraph for AI agents, Stripe for payments, and multi-LLM integration (OpenAI, Claude, etc.). No outdated frameworks." },
                { q: "Can I use these projects for my portfolio?", a: "Absolutely! That's the whole point. These are production-ready projects you can deploy, customize, and showcase to employers or clients. Many engineers have landed jobs by demonstrating skills learned from this ecosystem." },
                { q: "Do I need to be an experienced developer?", a: "Intermediate familiarity with JavaScript/TypeScript and Python helps, but each project includes complete documentation and explanations. You'll learn by building real applications, not just reading code." },
                { q: "Are there plans for enterprise or teams?", a: "Yes! We offer team and enterprise licenses with volume discounts. These are perfect for companies looking to accelerate engineer onboarding or standardize development practices." },
              ].map((faq, i) => (
                <div key={i} className="collapse collapse-arrow bg-base-100 border border-base-content/5">
                  <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
                  <div className="collapse-title text-lg font-semibold">
                    {faq.q}
                  </div>
                  <div className="collapse-content">
                    <p className="text-base-content/70 pt-2">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-base-content/60 mb-4">Still have questions?</p>
              <Link href="/docs" className="btn btn-outline">View Documentation</Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-accent" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight">
                Stop Building Demos.
                <br />
                Start Building Careers.
              </h2>
              <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
                Join engineers who are building real skills with production-ready projects. 60 complete applications. One ecosystem. Unlimited potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing" className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 shadow-xl gap-2 group">
                  <span>Get Full Access</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/pricing" className="btn btn-lg btn-ghost text-white border-white/20 hover:bg-white/10 hover:border-white/30">
                  View Pricing
                </Link>
              </div>
              <p className="text-white/60 text-sm mt-8">
                Instant access • Lifetime updates • 60 production projects
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
  highlight = false
}: {
  quote: string
  author: string
  role: string
  highlight?: boolean
}) {
  return (
    <div className={`card ${highlight ? 'bg-primary text-primary-content' : 'bg-base-200'} border ${highlight ? 'border-primary' : 'border-base-content/5'}`}>
      <div className="card-body">
        <div className={`flex gap-1 mb-4 ${highlight ? 'text-warning' : 'text-warning'}`}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className={`mb-6 ${highlight ? 'text-primary-content' : 'text-base-content/80'}`}>
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className={`${highlight ? 'bg-primary-content/20' : 'bg-base-300'} rounded-full w-10 h-10 flex items-center justify-center`}>
              <span className={`text-lg font-medium ${highlight ? 'text-primary-content' : 'text-base-content/60'}`}>
                {author.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className={`text-sm ${highlight ? 'text-primary-content/70' : 'text-base-content/60'}`}>{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
