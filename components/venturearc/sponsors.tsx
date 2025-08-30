export function Sponsors() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
        <h3 className="text-xl font-[family-name:var(--font-display)] mb-3">Call for Sponsors</h3>
        <div className="font-[family-name:var(--font-xeroda)] text-white/85 space-y-2">
          <p>VentureArc is supported by corporates, VCs, and government organizations who share our vision of driving innovation for social good.</p>
          <ul className="list-disc list-inside text-white/80">
            <li>Brand visibility across print, media, and event material</li>
            <li>Exclusive chance to frame problem statements and pilot solutions</li>
            <li>Access to India’s brightest innovators and startup talent</li>
            <li>Networking with VCs, corporates, and policy leaders</li>
          </ul>
          <p className="mt-3">📩 Contact: partnerships@venturearc.in</p>
        </div>
        <div className="mt-4">
          <a
            href="mailto:partnerships@venturearc.in"
            className="inline-block rounded-md px-4 py-2 bg-fuchsia-600 text-white hover:bg-fuchsia-500 transition-colors"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
        <p className="text-white/60 text-sm">Sponsor logos will appear here.</p>
      </div>
    </div>
  )
}
