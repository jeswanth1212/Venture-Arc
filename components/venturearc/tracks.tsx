import { Banknote, Factory, Stethoscope, Trees } from "lucide-react"

const items = [
  { icon: Banknote, title: "FinTech for Social Good", desc: "Inclusion, literacy, banking accessibility, microfinance." },
  { icon: Factory, title: "Smart Cities & Urban Sustainability", desc: "Energy, mobility, infrastructure, green solutions." },
  { icon: Stethoscope, title: "AI-Enabled Healthcare", desc: "Rural health, AI diagnostics, telehealth, med innovation." },
  { icon: Trees, title: "GreenTech & Climate Innovation", desc: "Renewables, agri-tech, environment tech, circular economy." },
]

export function Tracks() {
  const accents = ["from-fuchsia-500","from-cyan-400","from-emerald-500","from-amber-400"]
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((t, i) => (
        <li
          key={t.title}
          className="group rounded-xl border border-white/10 bg-white/[0.06] p-5 transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 inline-grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br ${accents[i%accents.length]} to-transparent`}> 
              <t.icon aria-hidden className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-white">{t.title}</h3>
              <p className="text-sm text-white/80 mt-1 font-[family-name:var(--font-xeroda)]">{t.desc}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
