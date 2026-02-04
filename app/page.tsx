import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { plans } from "@/lib/plans"

/**
 * Landing page template
 * 
 * Customize this for your product:
 * - Replace all placeholder text with your own copy
 * - Update the hero visual for your product
 * - Change feature cards to match your offering
 * - Add real testimonials
 * - Adjust pricing to your tiers
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
                <span className="text-sm font-medium text-primary">[Your announcement here]</span>
              </div>

              {/* Main headline with rotating text */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
                Your main headline
                <br />
                <span className="text-rotate inline-block">
                  <span className="justify-items-center">
                    <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">[Rotating text 1]</span>
                    <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">[Rotating text 2]</span>
                    <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">[Rotating text 3]</span>
                  </span>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-base-content/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                A compelling description of your product and the main benefit it provides to your customers. Keep it short and focused.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                <Link href="/login" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25 group">
                  <span>[Primary CTA]</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="#demo" className="btn btn-ghost btn-lg gap-2 group">
                  <span>[Secondary CTA]</span>
                </Link>
              </div>

              {/* Hero visual - Stack of cards with phone mockup */}
              <div className="relative max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                  {/* Desktop mockup */}
                  <div className="relative flex-1 max-w-2xl">
                    {/* Background cards for depth */}
                    <div className="absolute -left-4 -right-4 top-8 bottom-0 bg-base-300/50 rounded-3xl transform rotate-2 border border-base-content/5" />
                    <div className="absolute -left-2 -right-2 top-4 bottom-0 bg-base-200/50 rounded-3xl transform -rotate-1 border border-base-content/5" />

                    {/* Main visual area */}
                    <div className="relative bg-base-200 rounded-3xl border border-base-content/10 shadow-2xl overflow-hidden">
                      <div className="aspect-video flex items-center justify-center bg-linear-to-br from-base-200 to-base-300 p-8">
                        <div className="text-center">
                          <div className="text-5xl mb-4">🖥️</div>
                          <p className="text-base-content/40 text-base font-medium">[Desktop screenshot]</p>
                          <p className="text-base-content/30 text-sm mt-2">Replace with your product image</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone mockup */}
                  <div className="relative lg:-ml-20 lg:mt-12 z-10">
                    <div className="mockup-phone border-primary">
                      <div className="mockup-phone-camera"></div>
                      <div className="mockup-phone-display">
                        <div className="flex items-center justify-center h-full bg-linear-to-br from-base-200 to-base-300">
                          <div className="text-center p-4">
                            <div className="text-3xl mb-2">📱</div>
                            <p className="text-base-content/40 text-xs">[Mobile view]</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof - Animated Logo Marquee */}
        <section className="py-16 border-y border-base-content/5 bg-base-200/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <p className="text-center text-base-content/40 text-sm mb-8 uppercase tracking-wider font-medium">
              [Trusted by X teams/customers]
            </p>
          </div>
          {/* Infinite scroll marquee */}
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-16 px-8">
                  {["Logo 1", "Logo 2", "Logo 3", "Logo 4", "Logo 5", "Logo 6", "Logo 7", "Logo 8"].map((name, i) => (
                    <span key={i} className="text-2xl font-bold text-base-content/20 hover:text-base-content/40 transition-colors cursor-default">
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-200/50 border border-base-content/5">
              <div className="stat place-items-center py-8 px-12">
                <div className="stat-figure text-primary">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="stat-title text-base">[Metric 1]</div>
                <div className="stat-value text-primary text-5xl">XX+</div>
                <div className="stat-desc text-sm">[Description]</div>
              </div>
              <div className="stat place-items-center py-8 px-12">
                <div className="stat-figure text-secondary">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="stat-title text-base">[Metric 2]</div>
                <div className="stat-value text-secondary text-5xl">XX%</div>
                <div className="stat-desc text-sm">[Description]</div>
              </div>
              <div className="stat place-items-center py-8 px-12">
                <div className="stat-figure text-accent">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="stat-title text-base">[Metric 3]</div>
                <div className="stat-value text-accent text-5xl">XX</div>
                <div className="stat-desc text-sm">[Description]</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Bento Grid */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-primary badge-outline mb-4">Features</span>
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                [Section headline]
                <br />
                <span className="text-base-content/40">[Subheadline]</span>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="badge badge-ghost">[Badge]</span>
                  </div>
                  <h3 className="card-title text-2xl mb-2">[Feature 1 Title]</h3>
                  <p className="text-base-content/60 mb-6">[Feature 1 description. Explain the benefit to users and why this feature matters.]</p>
                  <div className="bg-base-300/50 rounded-xl p-6 text-center">
                    <p className="text-base-content/40">[Feature visual/demo placeholder]</p>
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
                  <h3 className="card-title text-2xl mb-2">[Feature 2 Title]</h3>
                  <p className="text-base-content/60 mb-8">[Feature 2 description. Explain the benefit to users.]</p>
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="space-y-3">
                      {["[Benefit point 1]", "[Benefit point 2]", "[Benefit point 3]", "[Benefit point 4]", "[Benefit point 5]"].map((item, i) => (
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
                  <h3 className="font-bold text-lg">[Feature 3 Title]</h3>
                  <p className="text-base-content/60 text-sm">[Short feature description]</p>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-content/5 hover:border-warning/30 transition-colors group">
                <div className="card-body p-6">
                  <div className="p-3 bg-warning/20 rounded-2xl w-fit mb-4">
                    <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">[Feature 4 Title]</h3>
                  <p className="text-base-content/60 text-sm">[Short feature description]</p>
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
                [Comparison headline]
              </h2>
              <p className="text-base-content/60 text-lg">[Why choose us over alternatives]</p>
            </div>

            {/* Desktop table - hidden on mobile */}
            <div className="hidden md:block overflow-x-auto max-w-4xl mx-auto">
              <table className="table table-lg">
                <thead>
                  <tr>
                    <th className="text-base-content/60">[Feature]</th>
                    <th className="text-center">
                      <span className="text-primary font-bold">[Your Product]</span>
                    </th>
                    <th className="text-center text-base-content/40">[Competitor A]</th>
                    <th className="text-center text-base-content/40">[Competitor B]</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "[Feature 1]", us: true, a: true, b: false },
                    { feature: "[Feature 2]", us: true, a: false, b: true },
                    { feature: "[Feature 3]", us: true, a: false, b: false },
                    { feature: "[Feature 4]", us: true, a: true, b: true },
                    { feature: "[Feature 5]", us: true, a: false, b: false },
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
                { feature: "[Feature 1]", us: true, a: true, b: false },
                { feature: "[Feature 2]", us: true, a: false, b: true },
                { feature: "[Feature 3]", us: true, a: false, b: false },
                { feature: "[Feature 4]", us: true, a: true, b: true },
                { feature: "[Feature 5]", us: true, a: false, b: false },
              ].map((row, i) => (
                <div key={i} className="card bg-base-100 border border-base-content/5">
                  <div className="card-body p-4">
                    <h3 className="font-semibold text-base mb-3">{row.feature}</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-primary font-medium">[You]</span>
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
                        <span className="text-xs text-base-content/40">[A]</span>
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
                        <span className="text-xs text-base-content/40">[B]</span>
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
                [Process headline]
              </h2>
              <p className="text-base-content/60 text-lg">[Process subheadline]</p>
            </div>

            <div className="flex justify-center">
              <ul className="steps steps-vertical lg:steps-horizontal steps-lg">
                <li className="step step-primary" data-content="1">
                  <div className="text-left lg:text-center mt-6 lg:mt-10 lg:px-8">
                    <h3 className="font-bold text-xl mb-2">[Step 1]</h3>
                    <p className="text-base text-base-content/60">[Step 1 description]</p>
                  </div>
                </li>
                <li className="step step-primary" data-content="2">
                  <div className="text-left lg:text-center mt-6 lg:mt-10 lg:px-8">
                    <h3 className="font-bold text-xl mb-2">[Step 2]</h3>
                    <p className="text-base text-base-content/60">[Step 2 description]</p>
                  </div>
                </li>
                <li className="step step-primary" data-content="3">
                  <div className="text-left lg:text-center mt-6 lg:mt-10 lg:px-8">
                    <h3 className="font-bold text-xl mb-2">[Step 3]</h3>
                    <p className="text-base text-base-content/60">[Step 3 description]</p>
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
              <span className="badge badge-accent badge-outline mb-4">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-black">
                [Testimonials headline]
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <TestimonialCard
                quote="[Customer quote about how your product helped them. Make it specific and believable.]"
                author="[Name]"
                role="[Role, Company]"
                highlight
              />
              <TestimonialCard
                quote="[Another customer quote. Focus on results and outcomes they achieved.]"
                author="[Name]"
                role="[Role, Company]"
              />
              <TestimonialCard
                quote="[Third customer quote. Highlight a different benefit or use case.]"
                author="[Name]"
                role="[Role, Company]"
              />
            </div>

            {/* Rating summary */}
            <div className="text-center mt-12">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-warning fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-base-content/60">
                <span className="font-bold text-base-content">[X.X/5]</span> from [X] reviews
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-24 lg:py-32 bg-base-200/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-info badge-outline mb-4">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                [Pricing headline]
              </h2>
              <p className="text-base-content/60 text-lg">[Pricing subheadline]</p>
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

        {/* Integrations */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-secondary badge-outline mb-4">Integrations</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                [Integrations headline]
              </h2>
              <p className="text-base-content/60 text-lg">[Works with your favorite tools]</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="card bg-base-200/50 border border-base-content/5 hover:border-primary/30 hover:bg-base-200 transition-all group">
                  <div className="card-body items-center justify-center p-6">
                    <div className="w-12 h-12 rounded-xl bg-base-300 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <span className="text-xl text-base-content/40 group-hover:text-primary transition-colors">⬡</span>
                    </div>
                    <span className="text-xs text-base-content/40 mt-2">[App {i + 1}]</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-base-content/40 mt-8">
              [And XX+ more integrations]
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 lg:py-32 bg-base-200/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge badge-warning badge-outline mb-4">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                [FAQ headline]
              </h2>
              <p className="text-base-content/60 text-lg">[FAQ subheadline]</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "[Question 1 goes here?]", a: "[Answer 1 - Provide a clear, helpful response to address this common question from potential customers.]" },
                { q: "[Question 2 goes here?]", a: "[Answer 2 - Provide a clear, helpful response to address this common question from potential customers.]" },
                { q: "[Question 3 goes here?]", a: "[Answer 3 - Provide a clear, helpful response to address this common question from potential customers.]" },
                { q: "[Question 4 goes here?]", a: "[Answer 4 - Provide a clear, helpful response to address this common question from potential customers.]" },
                { q: "[Question 5 goes here?]", a: "[Answer 5 - Provide a clear, helpful response to address this common question from potential customers.]" },
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
              <p className="text-base-content/60 mb-4">[Still have questions?]</p>
              <Link href="/docs" className="btn btn-outline">[Contact Support]</Link>
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
                [Final CTA headline]
              </h2>
              <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
                [Final CTA description. Create urgency or reinforce value.]
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login" className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 shadow-xl gap-2 group">
                  <span>[Primary CTA]</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/docs" className="btn btn-lg btn-ghost text-white border-white/20 hover:bg-white/10 hover:border-white/30">
                  [Secondary CTA]
                </Link>
              </div>
              <p className="text-white/60 text-sm mt-8">
                [Trust signals: No credit card required • Free tier • etc.]
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
