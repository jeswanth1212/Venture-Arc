import { Navbar } from "@/components/venturearc/navbar"
import { Hero } from "@/components/venturearc/hero"
import { About } from "@/components/venturearc/about"
import { Tracks } from "@/components/venturearc/tracks"
import { PrizesJudging } from "@/components/venturearc/prizes-judging"
import { Timeline } from "@/components/venturearc/timeline"
import { Highlights } from "@/components/venturearc/highlights"
import { Organisers } from "@/components/venturearc/organisers"
import { Sponsors } from "@/components/venturearc/sponsors"
import { FAQs } from "@/components/venturearc/faqs"
import { Footer } from "@/components/venturearc/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <section id="hero">
          <Hero />
        </section>
        <div id="content-with-bg" className="relative">
          <section id="about">
            <About />
          </section>
          <section id="tracks">
            <Tracks />
          </section>
          <section id="prizes">
            <PrizesJudging />
          </section>
          <section id="timeline">
            <Timeline />
          </section>
          <section id="highlights">
            <Highlights />
          </section>
          <section id="organisers">
            <Organisers />
          </section>
          <section id="sponsors">
            <Sponsors />
          </section>
          <section id="faqs">
            <FAQs />
          </section>
          <section id="contact">
            <Footer />
          </section>
        </div>
      </main>
    </>
  )
}


