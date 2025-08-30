import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Audiowide } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

/**
 * Display font slot for the hero heading.
 * Currently uses Audiowide as a placeholder. To use BLANKA, add an @font-face in globals.css
 * and replace this with a local font or simply keep this variable name and swap the family there.
 */
const displayFont = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
})

const xeroda = localFont({
  src: "../public/font/Xeroda.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-xeroda",
})

export const metadata: Metadata = {
  title: "VentureArc Hackathon 2025",
  description: "The Social Innovation Tech Championship by CSED-VIT Chennai",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${displayFont.variable} ${xeroda.variable} antialiased scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-dvh bg-[#0b0b0f] text-white">{children}</body>
    </html>
  )
}
