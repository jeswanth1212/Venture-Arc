"use client"

import type React from "react"

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
import { motion } from "framer-motion"

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      {/* Add top padding on mobile so hero starts below the mobile header */}
      <div className="pt-16 md:pt-0">
        <Hero />
      </div>

      <Section id="about" title="About">
        <About />
      </Section>

      <Section id="tracks" title="Tracks">
        <Tracks />
      </Section>

      <Section id="prizes" title="Prizes & Judging">
        <PrizesJudging />
      </Section>

      <Section id="timeline" title="Timeline">
        <Timeline />
      </Section>

      <Section id="highlights" title="Highlights">
        <Highlights />
      </Section>

      <Section id="organisers" title="Organisers">
        <Organisers />
      </Section>

      <Section id="sponsors" title="Sponsors & Partners">
        <Sponsors />
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQs />
      </Section>
    </main>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-24">
      <motion.div
        className="container mx-auto max-w-5xl px-4"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-pretty text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">{title}</span>
        </h2>
        {children}
      </motion.div>
    </section>
  )
}
