export function PrizesJudging() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
        <h3 className="text-xl font-[family-name:var(--font-display)] mb-4">Judging Criteria</h3>
        <ul className="space-y-2 text-white/85 font-[family-name:var(--font-xeroda)]">
          <li>✓ 70% Expert Jury – corporates, VCs, government, technical leaders</li>
          <li>✓ 30% Live Audience Voting – via secure event app</li>
          <li>✓ Real-time leaderboard & blind audit for transparency</li>
        </ul>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
        <h3 className="text-xl font-[family-name:var(--font-display)] mb-4">Prizes (Coming Soon 🚀)</h3>
        <ul className="space-y-2 text-white/85 font-[family-name:var(--font-xeroda)]">
          <li>🥇 1st Prize – Coming Soon</li>
          <li>🥈 2nd Prize – Coming Soon</li>
          <li>🥉 3rd Prize – Coming Soon</li>
          <li>⭐ Special Awards: Best Innovation, Social Impact, Women-led Team</li>
        </ul>
      </div>
    </div>
  )
}
