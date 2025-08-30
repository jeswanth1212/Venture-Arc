export function Organisers() {
  return (
    <div className="grid gap-6 md:grid-cols-2 items-start">
      <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
        <h3 className="text-xl font-[family-name:var(--font-display)] mb-2">VIT Chennai</h3>
        <p className="text-white/85 font-[family-name:var(--font-xeroda)]">
          NAAC A++ accreditation, top NIRF rankings (10th in Universities, 11th in Engineering), renowned for research,
          innovation, and entrepreneurship.
        </p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
        <h3 className="text-xl font-[family-name:var(--font-display)] mb-2">CSED</h3>
        <p className="text-white/85 font-[family-name:var(--font-xeroda)]">
          Student-driven community blending social impact with entrepreneurship. Empowering innovators, leaders, and
          changemakers.
        </p>
      </div>
    </div>
  )
}
