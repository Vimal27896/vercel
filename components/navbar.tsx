"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Activity, ChevronRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const navItems = [{ href: "/", label: "Overview" }, { href: "/dashboard", label: "Dashboard" }, { href: "/about", label: "Methodology" }]
  return <nav className="border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl"><div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8"><Link href="/" className="flex items-center gap-3"><span className="rounded-lg bg-cyan-400/10 p-2 text-cyan-300"><Shield className="h-5 w-5" /></span><span className="text-sm font-semibold tracking-tight text-white">LANDSLIDE <span className="text-cyan-300">SHIELD</span></span></Link><div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.03] p-1 md:flex">{navItems.map((item)=><Link key={item.href} href={item.href} className={cn("rounded-full px-4 py-2 text-xs font-medium transition-colors",pathname===item.href?"bg-white/10 text-white":"text-slate-400 hover:text-white")}>{item.label}</Link>)}</div><div className="flex items-center gap-3"><div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><Activity className="h-3.5 w-3.5 text-emerald-300" /> Systems nominal</div><Button asChild size="sm" className="rounded-lg bg-cyan-400 text-xs font-semibold text-slate-950 hover:bg-cyan-300"><Link href="/upload">Analyze <ChevronRight className="ml-1 h-3.5 w-3.5" /></Link></Button></div></div></nav>
}
