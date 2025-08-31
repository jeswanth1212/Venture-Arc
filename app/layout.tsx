import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Audiowide } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import ScrollToTop from "@/components/scroll-to-top";
import { FlickeringGrid } from "@/components/ui/flickering-grid-hero";
import Loader from "@/components/ui/loader";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

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
});

const xeroda = localFont({
  src: "../public/font/Xeroda.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-xeroda",
});

export const metadata: Metadata = {
  title: "VentureArc Hackathon 2025",
  description: "The Social Innovation Tech Championship by CSED-VIT Chennai",
  generator: 'v0.app',
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${displayFont.variable} ${xeroda.variable} antialiased`}>
      <head>
        <link rel="preload" href="/font/Blanka-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/font/Xeroda.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/DrawSVGPlugin.min.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/MotionPathPlugin.min.js" defer></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Force scroll to top on page refresh
            history.scrollRestoration = 'manual';
            window.addEventListener('load', () => {
              window.scrollTo(0, 0);
              // Fallback: hide after window load if app-ready wasn't fired
              const el = document.getElementById('splash-loader');
              if (el) {
                setTimeout(() => {
                  if (!el) return;
                  el.style.transition = 'opacity 250ms ease';
                  el.style.opacity = '0';
                  setTimeout(() => el.remove(), 260);
                }, 2000);
              }
            });
            window.addEventListener('beforeunload', () => {
              document.documentElement.scrollTop = 0;
            });
            // Hide splash when app signals ready (after Three.js renders)
            window.addEventListener('app-ready', () => {
              const el = document.getElementById('splash-loader');
              if (el) {
                el.style.transition = 'opacity 250ms ease';
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 260);
              }
            }, { once: true });
          `
        }} />
      </head>
      <body suppressHydrationWarning className="min-h-dvh bg-black text-white">
        {/* Splash loader for initial hard refresh */}
        <div id="splash-loader" className="fixed inset-0 z-[70] flex items-center justify-center bg-black">
          <Loader />
        </div>
        {/* Global background grid (excluded from hero by hero's own background) */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <FlickeringGrid
            className="[mask-image:radial-gradient(1400px_circle_at_center,white,transparent)]"
            color="#7C3AED"
            maxOpacity={0.12}
            flickerChance={0.12}
            squareSize={4}
            gridGap={4}
          />
        </div>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScrollProvider>
            <ScrollToTop />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
