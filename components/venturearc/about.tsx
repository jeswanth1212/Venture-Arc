export function About() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] text-white mb-4">
          Innovation <span className="text-fuchsia-400">Meets</span> Impact
        </h2>
        <p className="text-white/85 leading-relaxed font-[family-name:var(--font-xeroda)]">
          VentureArc is India’s premier platform where technology transforms society. Organized by CSED-VIT Chennai, it
          brings together students, startups, industry leaders, VCs, and government partners to co-create deployable
          solutions for urgent social challenges. With expert mentorship, investor networking, and funding opportunities,
          VentureArc is the ultimate launchpad where innovation meets impact.
        </p>
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 aspect-video" />
    </div>
  )
}
