export function Contact() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-white/10 bg-white/5 p-5 space-y-3">
        <h3 className="text-lg font-semibold">Get in touch</h3>
        <p className="text-white/80">
          Email:{" "}
          <a href="mailto:partnerships@venturearc.in" className="text-fuchsia-300 underline underline-offset-4">
            partnerships@venturearc.in
          </a>
        </p>
        <p className="text-white/80">
          Phone:{" "}
          <a href="tel:+911234567890" className="text-fuchsia-300 underline underline-offset-4">
            +91-1234567890
          </a>
        </p>
        <p className="text-white/80">
          Website:{" "}
          <a
            href="https://www.venturearc.in"
            target="_blank"
            rel="noreferrer"
            className="text-fuchsia-300 underline underline-offset-4"
          >
            www.venturearc.in
          </a>
        </p>
        <p className="text-white/80">
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-fuchsia-300 underline underline-offset-4"
          >
            VentureArc Official
          </a>
        </p>
      </div>

      <div className="rounded-lg border border-white/10 bg-gradient-to-r from-fuchsia-600/20 to-violet-600/20 p-5">
        <h3 className="text-lg font-semibold">Ready to register?</h3>
        <p className="text-white/80">
          Submit your team details and stay tuned for the prelims and mentorship schedule.
        </p>
        <a
          href="mailto:partnerships@venturearc.in?subject=VentureArc%20Hackathon%20Registration"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-fuchsia-600 to-violet-600 px-4 py-2 font-medium text-white hover:from-fuchsia-500 hover:to-violet-500 transition-colors"
        >
          Register Now
        </a>
      </div>
    </div>
  )
}
