"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mic2, Gavel, Wrench, Cpu, Users, Sparkles, Lightbulb } from "lucide-react";

const highlights = [
  { 
    icon: Mic2, 
    title: "Expert Talks & Panel Discussions",
    desc: "Learn from industry leaders, innovators, and policymakers shaping the future of social tech."
  },
  { 
    icon: Gavel, 
    title: "Lion's Den (Shark Tank style pitches)",
    desc: "Present your ideas to investors and industry experts in a high-stakes pitch competition."
  },
  { 
    icon: Wrench, 
    title: "Workshops by Sponsors",
    desc: "Hands-on sessions exploring cutting-edge technologies and development frameworks."
  },
  { 
    icon: Cpu, 
    title: "Tech FaceOff: Live Demo Battles",
    desc: "Showcase your technical prowess in fast-paced competitive demonstrations."
  },
  { 
    icon: Users, 
    title: "Networking Mixers & Talent Connect",
    desc: "Build valuable connections with peers, mentors, and potential employers or partners."
  },
  { 
    icon: Sparkles, 
    title: "Innovation Showcases",
    desc: "Explore exhibits of groundbreaking solutions from previous winners and industry partners."
  },
];

export function Highlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !highlightsRef.current) return;
    
    // Create card reveal animations with staggered effect
    const highlightCards = highlightsRef.current.querySelectorAll('.highlight-card');
    
    gsap.fromTo(highlightCards,
      {
        opacity: 0,
        y: 50,
        rotateX: 10
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: highlightsRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Create hover effects for cards
    highlightCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3
        });
        
        const icon = card.querySelector('.highlight-icon');
        if (icon) {
          gsap.to(icon, {
            rotate: 360,
            duration: 0.5
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
          duration: 0.3
        });
        
        const icon = card.querySelector('.highlight-icon');
        if (icon) {
          gsap.to(icon, {
            rotate: 0,
            duration: 0.5
          });
        }
      });
    });
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === highlightsRef.current) {
          trigger.kill();
        }
      });
      
      highlightCards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  return (
    <div className="relative" ref={sectionRef}>
      {/* Background aurora effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-cyan-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-fuchsia-900/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Title with 3D effect */}
      <div className="text-center mb-16">
        <div className="inline-block relative">
          <div className="mb-2">
            <span className="font-[family-name:var(--font-display)] text-5xl text-black/10 absolute top-0 left-0 filter blur-[3px]">EVENT HIGHLIGHTS</span>
            <span className="font-[family-name:var(--font-display)] text-5xl text-white relative">EVENT HIGHLIGHTS</span>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-cyan-500/50 via-indigo-500/50 to-cyan-500/50 mt-2"></div>
        </div>
        
        <p className="text-white/70 font-[family-name:var(--font-xeroda)] max-w-2xl mx-auto mt-6">
          VentureArc isn't just a hackathon - it's an immersive experience designed to inspire, 
          educate, and connect participants with the resources they need to succeed.
        </p>
      </div>
      
      {/* Hexagonal grid layout for highlights */}
      <div ref={highlightsRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <div 
              key={item.title}
              className="highlight-card relative backdrop-blur-sm bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-xl border border-white/10 overflow-hidden transform-gpu preserve-3d"
            >
              {/* Hexagonal border decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              
              <div className="p-6 relative">
                {/* Hexagonal icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="highlight-icon relative transition-all duration-300">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full"></div>
                    <div className="relative h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/30 to-indigo-500/20 border border-white/10">
                      <item.icon className="h-6 w-6 text-cyan-300" />
                    </div>
                  </div>
                  
                  {/* Highlight number */}
                  <span className="font-[family-name:var(--font-display)] text-4xl text-white/10">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                
                {/* Highlight content */}
                <h3 className="font-[family-name:var(--font-display)] text-xl text-white mb-3 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-white/70 font-[family-name:var(--font-xeroda)] text-sm leading-relaxed">
                  {item.desc}
                </p>
                
                {/* Bottom corner decoration */}
                <div className="absolute bottom-2 right-2 w-6 h-6 opacity-20">
                  <div className="absolute right-0 bottom-0 w-full h-px bg-gradient-to-l from-white to-transparent"></div>
                  <div className="absolute right-0 bottom-0 h-full w-px bg-gradient-to-t from-white to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured event callout */}
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8">
              <h3 className="font-[family-name:var(--font-display)] text-3xl text-white mb-4">
                KEYNOTE SPEAKERS
              </h3>
              <p className="text-white/80 font-[family-name:var(--font-xeroda)] leading-relaxed mb-6">
                Join us for inspiring keynotes from industry leaders and innovators who are shaping the future 
                of technology and social impact. Our carefully curated lineup features experts from 
                diverse backgrounds sharing invaluable insights.
              </p>
              <div className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg font-[family-name:var(--font-display)] text-sm">
                COMING SOON
              </div>
            </div>
            
            <div className="relative h-64 md:h-auto">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/40 to-black/20">
                <Lightbulb className="h-16 w-16 text-cyan-400/60" />
                <span className="absolute font-[family-name:var(--font-display)] text-6xl text-white/5 rotate-12">2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
