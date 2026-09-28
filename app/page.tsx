import Link from "next/link"
import { ArrowUpRight, BarChart3, CloudRain, MapPin, Radar, ShieldCheck, Sparkles, Waves, Wind } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

const stats = [
  ["94.8%", "model accuracy"],
  ["12.4k", "sites monitored"],
  ["18 min", "average lead time"],
]

const signals = [
  { icon: CloudRain, label: "Rainfall intensity", value: "68 mm/h", change: "+18%", tone: "cyan" },
  { icon: Waves, label: "Soil saturation", value: "74%", change: "+6%", tone: "violet" },
  { icon: Wind, label: "Slope movement", value: "0.8 mm", change: "stable", tone: "blue" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />
      <main>
        <section className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pt-24">
          <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /> LIVE TERRAIN INTELLIGENCE
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl">
              See risk before it <span className="neon-text">moves.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Landslide Shield turns satellite imagery, rainfall patterns, and terrain signals into clear, actionable early warnings for the places that matter most.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-xl bg-cyan-400 px-6 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,.25)] hover:bg-cyan-300">
                <Link href="/upload">Run a prediction <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-white/15 bg-white/[.03] px-6 text-white hover:bg-white/10 hover:text-white">
                <Link href="/dashboard">Open live dashboard</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
              {stats.map(([value, label]) => <div key={label}><div className="text-2xl font-semibold tracking-tight text-white">{value}</div><div className="mt-1 text-xs uppercase tracking-[.16em] text-slate-500">{label}</div></div>)}
            </div>
          </div>

          <div className="relative z-10 rounded-3xl border border-cyan-300/15 bg-[#0b1226]/85 p-3 shadow-[0_0_80px_rgba(14,165,233,.12)] backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#081024] p-5">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(56,189,248,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.18)_1px,transparent_1px)] [background-size:36px_36px]" />
              <div className="relative flex items-center justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-slate-500">Watchtower / 07</p><h2 className="mt-1 text-lg font-medium">Western Ghats sector</h2></div><div className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> monitored</div></div>
              <div className="relative my-6 flex h-56 items-center justify-center"><div className="absolute h-44 w-44 rounded-full border border-cyan-300/20 shadow-[0_0_45px_rgba(34,211,238,.2)]" /><div className="absolute h-28 w-28 rounded-full border border-cyan-300/30" /><div className="absolute h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_24px_8px_rgba(34,211,238,.8)]" /><div className="absolute h-48 w-px rotate-45 bg-gradient-to-b from-transparent via-cyan-300/70 to-transparent" /><div className="absolute h-48 w-px -rotate-45 bg-gradient-to-b from-transparent via-violet-400/50 to-transparent" /><MapPin className="absolute bottom-5 right-20 h-5 w-5 text-cyan-300" /><div className="absolute left-8 top-12 rounded-lg border border-cyan-300/20 bg-[#101c38]/90 px-3 py-2 text-xs text-cyan-100"><span className="block text-[10px] uppercase tracking-widest text-slate-500">risk index</span><b className="text-base">0.18 · low</b></div></div>
              <div className="grid grid-cols-3 gap-2">{signals.map(({ icon: Icon, label, value, change }) => <div key={label} className="rounded-xl border border-white/10 bg-white/[.035] p-3"><Icon className="mb-3 h-4 w-4 text-cyan-300" /><p className="text-[10px] leading-4 text-slate-500">{label}</p><div className="mt-1 text-sm font-medium">{value}</div><span className="text-[10px] text-cyan-300">{change}</span></div>)}</div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[.025] px-6 py-16 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Built for clarity</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">One shield. Every signal.</h2></div><Link href="/about" className="text-sm text-cyan-300 hover:text-cyan-200">Explore our approach <ArrowUpRight className="ml-1 inline h-4 w-4" /></Link></div><div className="grid gap-4 md:grid-cols-3">{[{icon: Radar, title:"Live observation", text:"Bring field data and satellite imagery into one calm, readable command center."},{icon: BarChart3, title:"Explainable intelligence", text:"Every risk score is supported by the environmental signals behind it."},{icon: ShieldCheck, title:"Decisive action", text:"Turn early warnings into clear next steps for teams and communities."}].map(({icon: Icon,title,text})=><div key={title} className="group rounded-2xl border border-white/10 bg-[#0b1226] p-6 transition-colors hover:border-cyan-300/40"><Icon className="h-6 w-6 text-cyan-300" /><h3 className="mt-8 text-lg font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}</div></div></section>
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 via-[#0d1730] to-violet-500/10 p-8 sm:p-12 md:flex-row md:items-center"><div><div className="mb-4 flex items-center gap-2 text-cyan-300"><Sparkles className="h-4 w-4" /><span className="eyebrow">Start with your terrain</span></div><h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">Make the next decision with more signal.</h2></div><Button asChild size="lg" className="rounded-xl bg-white text-slate-950 hover:bg-cyan-100"><Link href="/upload">Analyze an image <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div></section>
      </main>
    </div>
  )
}
