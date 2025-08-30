import { Mic2, Gavel, Wrench, Cpu, Users } from "lucide-react"

const highlights = [
  { icon: Mic2, title: "Expert Talks & Panel Discussions" },
  { icon: Gavel, title: "Lion’s Den (Shark Tank style pitches)" },
  { icon: Wrench, title: "Workshops by Sponsors" },
  { icon: Cpu, title: "Tech FaceOff: Live Demo Battles" },
  { icon: Users, title: "Networking Mixers & Talent Connect" },
]

export function Highlights() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((h) => (
        <li key={h.title} className="rounded-xl border border-white/10 bg-white/[0.06] p-5 transition-transform hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <h.icon aria-hidden className="h-6 w-6 text-violet-400" />
            <span className="font-[family-name:var(--font-display)] text-white">{h.title}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
