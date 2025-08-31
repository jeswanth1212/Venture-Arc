export function Contact() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Reach out details */}
      <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 md:p-8 space-y-4">
        <h3 className="font-[family-name:var(--font-xeroda)] text-2xl text-white">Get in touch</h3>
        <p className="text-white/70 font-[family-name:var(--font-xeroda)]">
          We’d love to hear from you. Reach out for partnerships, speaking, or general queries.
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-white/85">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M4 4h16v16H4z" opacity="0"/><path d="M4 4l8 8 8-8"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
            <div>
              <span className="mr-2">Email:</span>
              <a href="mailto:partnerships@venturearc.in" className="text-fuchsia-300 hover:underline">partnerships@venturearc.in</a>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/85">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a1 1 0 0 1 1 .75l1 3.49a1 1 0 0 1-.27 1L8.91 9.59a16 16 0 0 0 6 6l2.35-1.87a1 1 0 0 1 1-.27l3.49 1a1 1 0 0 1 .75 1Z"/></svg>
            <div>
              <span className="mr-2">Phone:</span>
              <a href="tel:+911234567890" className="text-fuchsia-300 hover:underline">+91-1234567890</a>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/85">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M3 12l2-2 4 4 8-8 4 4-12 12L3 12z"/></svg>
            <div>
              <span className="mr-2">Website:</span>
              <a href="https://www.venturearc.in" target="_blank" rel="noreferrer" className="text-fuchsia-300 hover:underline">www.venturearc.in</a>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/85">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            <div>
              <span className="mr-2">LinkedIn:</span>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-fuchsia-300 hover:underline">VentureArc Official</a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick message / CTA */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-fuchsia-900/20 via-violet-900/20 to-fuchsia-900/20 p-6 md:p-8">
        <h3 className="font-[family-name:var(--font-xeroda)] text-2xl text-white mb-3">Quick message</h3>
        <p className="text-white/75 font-[family-name:var(--font-xeroda)] mb-5">Prefer email? Use the button below to compose one instantly.</p>
        <div className="grid gap-3">
          <input placeholder="Your name" className="w-full rounded-md bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none" />
          <input placeholder="Your email" className="w-full rounded-md bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none" />
          <input placeholder="Subject" className="w-full rounded-md bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none" />
          <textarea rows={4} placeholder="Message" className="w-full rounded-md bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none" />
        </div>
        <a
          href="mailto:partnerships@venturearc.in?subject=VentureArc%20Inquiry"
          className="mt-5 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-fuchsia-600 to-violet-600 px-5 py-2.5 font-[family-name:var(--font-display)] text-white hover:from-fuchsia-500 hover:to-violet-500 transition-colors"
        >
          Compose Email
        </a>
      </div>
    </div>
  )
}
