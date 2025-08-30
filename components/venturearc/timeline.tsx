const steps = [
  "Grand Launch – Problem statements released",
  "Prelims & Screening – digital submissions & blind review",
  "Mentorship & Field Testing – finalists + milestones",
  "Grand Finale (Tech FaceOff) – expo, demos, investor pitches",
]

export function Timeline() {
  return (
    <div className="overflow-x-auto">
      <ol className="relative flex gap-10 border-t border-white/10 pt-6">
        {steps.map((s, i) => (
          <li key={s} className="relative min-w-[240px]">
            <span aria-hidden className="absolute -top-3 left-0 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600" />
            <h4 className="font-[family-name:var(--font-display)] text-white mb-1">Step {i + 1}</h4>
            <p className="text-white/85 font-[family-name:var(--font-xeroda)] text-sm">{s}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
