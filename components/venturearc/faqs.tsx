const faqs = [
  { q: "Who can participate?", a: "Students, startups, innovators." },
  { q: "Team size?", a: "2–5 members." },
  { q: "Is participation free?", a: "Yes." },
  { q: "Do we need a prototype?", a: "Yes, digital submission required." },
  { q: "Is mentorship provided?", a: "Yes, for finalists." },
]

export function FAQs() {
  return (
    <div className="grid gap-4">
      {faqs.map((f) => (
        <div key={f.q} className="rounded-xl border border-white/10 bg-white/[0.06] p-5">
          <h3 className="font-[family-name:var(--font-display)] text-white">{f.q}</h3>
          <p className="text-white/85 mt-1 font-[family-name:var(--font-xeroda)]">{f.a}</p>
        </div>
      ))}
    </div>
  )
}
