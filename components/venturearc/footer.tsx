"use client";

import Link from "next/link";
import Image from "next/image";
import { Contact } from "./contact";

export function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 bg-gradient-to-b from-transparent to-black/30 relative overflow-hidden">
      {/* Accent gradient bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-500/40 via-violet-500/40 to-fuchsia-500/40"></div>
      {/* Subtle aurora */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-10 w-72 h-72 rounded-full bg-fuchsia-900/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-violet-900/10 blur-3xl"></div>
      </div>
      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-xeroda)] text-3xl md:text-4xl mb-8 text-center text-white">
            Contact Us
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mx-auto mb-8"></div>
          <Contact />
        </div>
        
        {/* Footer with logo */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-12 h-12 relative mr-3">
              <Image 
                src="/svg/logo.svg"
                alt="VentureArc Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-xeroda)] text-xl text-white">VentureArc</h3>
              <p className="text-white/60 text-xs">Social Innovation Tech Championship</p>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-8 text-sm text-white/60">
          © {new Date().getFullYear()} VentureArc • Built for the Social Innovation Tech Championship
        </div>
      </div>
    </footer>
  )
}
