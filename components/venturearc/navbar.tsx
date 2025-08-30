"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"

const nav = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#prizes", label: "Prizes" },
  { href: "#timeline", label: "Timeline" },
  { href: "#highlights", label: "Highlights" },
  { href: "#organisers", label: "Organisers" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faqs", label: "FAQs" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const navRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  // Subtle follow-the-cursor motion (from Shivan navbar)
  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const maxTranslate = 6
      const translateX = ((x - centerX) / centerX) * maxTranslate
      const translateY = ((y - centerY) / centerY) * maxTranslate
      el.style.transform = `translate(${translateX}px, ${translateY}px)`
    }

    const handleMouseLeave = () => {
      el.style.transform = ""
    }

    if (typeof window !== 'undefined') {
      el.addEventListener("mousemove", handleMouseMove)
      el.addEventListener("mouseleave", handleMouseLeave)
    }
    return () => {
      if (typeof window !== 'undefined') {
        el.removeEventListener("mousemove", handleMouseMove)
        el.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <>
      {/* Desktop floating glass navbar */}
      <nav className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          ref={navRef}
          className="glass-nav flex items-center gap-1 px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 shadow-lg transition-colors overflow-x-auto no-scrollbar rounded-full"
        >
          {nav.map((item, index) => (
            <div key={item.href} className="flex items-center">
              <a
                href={item.href}
                className="px-3 py-2 text-xs sm:text-sm text-white/90 hover:text-white transition-colors"
              >
                {item.label}
              </a>
              {index < nav.length - 1 ? (
                <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block" />
              ) : null}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile standard header with menu */}
      <header className="md:hidden fixed inset-x-0 top-0 z-50 bg-[#0b0b0f]/35 backdrop-blur-md supports-[backdrop-filter]:bg-[#0b0b0f]/25 border-b border-white/10">
        <div className="h-16 px-4 flex items-center justify-between">
          {/* Empty brand slot per request */}
          <div />
          <button
            aria-label="Toggle menu"
            className="p-2 text-white"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav className="px-4 pb-3 grid grid-cols-2 gap-2 border-t border-white/10">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}
