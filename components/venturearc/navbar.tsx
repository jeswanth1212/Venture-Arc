"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { gsap } from "gsap"

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
  const feImageRef = useRef<SVGFEImageElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const navItemsRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [pillWidth, setPillWidth] = useState<number>(720)

  // Keep background effect based on scroll position; navbar remains fixed/visible
  useEffect(() => {
    const updateAtTop = () => {
      setAtTop(window.scrollY <= 50)
    }
    updateAtTop()
    window.addEventListener('scroll', updateAtTop, { passive: true })
    return () => window.removeEventListener('scroll', updateAtTop)
  }, [])

  // Setup liquid glass displacement filter for desktop nav
  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const buildDisplacementSvg = (width: number, height: number) => {
      const radius = Math.round(height / 2)
      const borderRatio = 0.07
      const alpha = 0.93
      const lightness = 50
      const blur = 11
      const border = Math.min(width, height) * (borderRatio * 0.5)
      return `
        <svg class="displacement-image" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#0000"/>
              <stop offset="100%" stop-color="red"/>
            </linearGradient>
            <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0000"/>
              <stop offset="100%" stop-color="blue"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
          <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red)" />
          <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode: difference" />
          <rect x="${border}" y="${Math.min(width, height) * (borderRatio * 0.5)}" width="${width - border * 2}" height="${height - border * 2}" rx="${radius}" fill="hsl(0 0% ${lightness}% / ${alpha})" style="filter:blur(${blur}px)" />
        </svg>
      `
    }

    const applyFilterTo = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect()
      const width = Math.max(140, Math.round(rect.width))
      const height = Math.max(40, Math.round(rect.height))
      const serialized = new XMLSerializer().serializeToString(new DOMParser().parseFromString(buildDisplacementSvg(width, height), 'image/svg+xml').documentElement)
      const dataUri = `data:image/svg+xml,${encodeURIComponent(serialized)}`

      const feImage = feImageRef.current
      if (feImage) {
        feImage.setAttribute('href', dataUri)
      }

      gsap.set('feDisplacementMap', { attr: { scale: -180 } })
      gsap.set('#va-redchannel', { attr: { scale: -180 } })
      gsap.set('#va-greenchannel', { attr: { scale: -170 } })
      gsap.set('#va-bluechannel', { attr: { scale: -160 } })
      gsap.set('feGaussianBlur', { attr: { stdDeviation: 0.7 } })

      try {
        const supportsUrlBackdrop = CSS && CSS.supports && CSS.supports('backdrop-filter: url(#test)')
        if (supportsUrlBackdrop) {
          target.style.backdropFilter = 'url(#va-glass-filter) saturate(1.5)'
        } else {
          target.style.backdropFilter = 'blur(10px) saturate(1.2)'
          ;(target.style as any).webkitBackdropFilter = 'blur(10px) saturate(1.2)'
        }
      } catch {
        target.style.backdropFilter = 'blur(10px) saturate(1.2)'
        ;(target.style as any).webkitBackdropFilter = 'blur(10px) saturate(1.2)'
      }
    }

    const applyForVisibleTargets = () => {
      if (navRef.current) applyFilterTo(navRef.current)
      if (open && mobileMenuRef.current) applyFilterTo(mobileMenuRef.current)
    }

    applyForVisibleTargets()
    window.addEventListener('resize', applyForVisibleTargets)
    return () => window.removeEventListener('resize', applyForVisibleTargets)
  }, [])

  // Recompute displacement when state changes that affect sizes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('resize'))
    }
  }, [atTop, open])

  // Measure nav items width for pill target and update on resize
  useEffect(() => {
    const measure = () => {
      const itemsEl = navItemsRef.current
      if (!itemsEl) return
      const sidePadding = 24 * 2 // md:px-6 on both sides
      const width = Math.ceil(itemsEl.getBoundingClientRect().width) + sidePadding
      setPillWidth(Math.max(520, width))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

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
      <nav className="navbar-container hidden md:block">
        <div
          ref={navRef}
          className={`glass-nav fixed z-50 shadow-lg overflow-hidden 
                    top-6 left-1/2 -translate-x-1/2 h-16 rounded-full px-4 md:px-6 bg-[#0b0b0f]/55 backdrop-blur-md border border-white/10 
                    flex items-center ${atTop ? 'justify-between' : 'justify-center'}`}
          style={{ width: atTop ? 'min(98vw, 1440px)' : `${pillWidth}px`, transition: 'width 500ms ease-in-out' }}
        >
          <div className={`shrink-0 transition-all duration-500 ${atTop ? 'opacity-100 w-auto mr-2' : 'opacity-0 w-0 overflow-hidden mr-0 pointer-events-none'}`}>
            <a href="#" className="flex items-center gap-2 font-[family-name:var(--font-xeroda)]">
              <img src="/images/logo.png" alt="Logo" className="h-7 w-auto" />
            </a>
          </div>

          <div ref={navItemsRef} className={`${atTop ? 'flex-1 flex items-center justify-center' : 'flex items-center'}`}>
            {nav.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <a
                  href={item.href}
                  className="px-3 py-2 text-xs sm:text-sm text-white/90 hover:text-white transition-colors font-[family-name:var(--font-xeroda)]"
                >
                  {item.label}
                </a>
                {index < nav.length - 1 ? (
                  <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block" />
                ) : null}
              </div>
            ))}
          </div>

          <div className={`shrink-0 transition-all duration-500 ${atTop ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0 overflow-hidden ml-0 pointer-events-none'}`}>
            <a
              href="#register"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm text-white/90 transition-colors font-[family-name:var(--font-xeroda)]"
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile fixed header with logo + menu */}
      <header className={`navbar-container md:hidden 
                        bg-[#0b0b0f]/80 backdrop-blur-md
                        fixed inset-x-0 top-0 z-50 border-b border-white/10`}>
        <div className="h-16 px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-[family-name:var(--font-xeroda)]">
            <img src="/images/logo.png" alt="Logo" className="h-7 w-auto" />
          </a>
          <button
            aria-label="Toggle menu"
            className="p-2 text-white"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav ref={mobileMenuRef} className="absolute top-full left-0 right-0 px-4 pb-3 pt-2 bg-[#0b0b0f]/75 backdrop-blur-md border-t border-white/10">
            <div className="flex flex-col">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-3 text-base text-white/90 hover:text-white border-b border-white/10 last:border-b-0 font-[family-name:var(--font-xeroda)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Inline SVG filter for liquid glass effect (Chromium-only) */}
      <svg aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="va-glass-filter" colorInterpolationFilters="sRGB">
            <feImage x="0" y="0" width="100%" height="100%" result="map" ref={feImageRef as any}></feImage>
            <feDisplacementMap in="SourceGraphic" in2="map" id="va-redchannel" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0" result="red" />
            <feDisplacementMap in="SourceGraphic" in2="map" id="va-greenchannel" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0" result="green" />
            <feDisplacementMap in="SourceGraphic" in2="map" id="va-bluechannel" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
    </>
  )
}
