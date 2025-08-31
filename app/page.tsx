"use client"

import type React from "react"
import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
import { motion } from "framer-motion"

export default function Page() {
  // Initialize GSAP ScrollTrigger to ensure it's available globally
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger on window resize to fix any layout issues
    const handleResize = () => {
      ScrollTrigger.refresh(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      <main className="relative min-h-screen">
        <Navbar />
        {/* Add top padding on mobile so hero starts below the mobile header */}
        <div className="pt-16 md:pt-0">
          <Hero />
        </div>

        <Section id="about" title="ABOUT">
          <About />
        </Section>

        {/* Tracks section without additional wrapper */}
        <div id="tracks" className="scroll-mt-24">
          <Tracks />
        </div>

        <Section id="prizes" title="PRIZES & JUDGING">
          <PrizesJudging />
        </Section>

        {/* Timeline section without the Section wrapper */}
        <div id="timeline" className="scroll-mt-24">
          <Timeline />
        </div>

        <Section id="highlights" title="HIGHLIGHTS">
          <Highlights />
        </Section>

        <Section id="organisers" title="ORGANIZERS">
          <Organisers />
        </Section>

        <Section id="sponsors" title="SPONSORS & PARTNERS">
          <Sponsors />
        </Section>

        <Section id="faqs" title="FAQs">
          <FAQs />
        </Section>
      </main>
      <Footer />
    </>
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
  // Don't add animation wrapper for the About section since it handles its own animations
  if (id === "about" || id === "highlights" || id === "organisers" || id === "sponsors" || id === "faqs" || id === "contact") {
    return (
      <section id={id} className="scroll-mt-24">
        {children}
      </section>
    )
  }
  
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-24">
      <motion.div
        className="container mx-auto max-w-5xl px-4"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-white relative inline-block">
            <span className="relative z-10 px-3">{title}</span>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-fuchsia-500/10 via-cyan-500/10 to-fuchsia-500/10 blur-lg -z-10 rounded-lg"></div>
        </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mx-auto mt-3"></div>
        </div>
        {children}
      </motion.div>
    </section>
  )
}
