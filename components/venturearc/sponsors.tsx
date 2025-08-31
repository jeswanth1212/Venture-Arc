"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink, Sparkles } from "lucide-react";

const sponsorTiers = [
  {
    tier: "PLATINUM",
    sponsors: [
      { name: "TechCorp", logo: "/placeholder-logo.svg" },
      { name: "InnoVentures", logo: "/placeholder-logo.svg" },
    ]
  },
  {
    tier: "GOLD",
    sponsors: [
      { name: "CloudScale", logo: "/placeholder-logo.svg" },
      { name: "DevMatrix", logo: "/placeholder-logo.svg" },
      { name: "FutureLabs", logo: "/placeholder-logo.svg" },
    ]
  },
  {
    tier: "SILVER",
    sponsors: [
      { name: "Quantum Systems", logo: "/placeholder-logo.svg" },
      { name: "ByteWorks", logo: "/placeholder-logo.svg" },
      { name: "TechNova", logo: "/placeholder-logo.svg" },
      { name: "DataSphere", logo: "/placeholder-logo.svg" },
    ]
  }
];

const partners = [
  { name: "Ministry of Electronics & IT", logo: "/placeholder-logo.svg", type: "Government Partner" },
  { name: "NASSCOM", logo: "/placeholder-logo.svg", type: "Industry Partner" },
  { name: "Digital India", logo: "/placeholder-logo.svg", type: "Strategic Partner" },
];

export function Sponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Create floating animation for sponsor logos
    if (sponsorsRef.current) {
      const sponsorTierContainers = sponsorsRef.current.querySelectorAll('.sponsor-tier');
      
      sponsorTierContainers.forEach((tierContainer, i) => {
        gsap.fromTo(tierContainer,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sponsorsRef.current,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        const logos = tierContainer.querySelectorAll('.sponsor-logo');
        logos.forEach((logo) => {
          // Random float animation
          gsap.to(logo, {
            y: "random(-8, 8)",
            duration: "random(1.5, 2.5)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        });
      });
    }
    
    // Create reveal animation for partners
    if (partnersRef.current) {
      const partnerLogos = partnersRef.current.querySelectorAll('.partner-card');
      
      gsap.fromTo(partnerLogos,
        {
          opacity: 0,
          scale: 0.9,
          rotateY: 25
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sponsorsRef.current || trigger.vars.trigger === partnersRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <div className="relative" ref={sectionRef}>
      
      {/* Sponsors section */}
      <div className="mb-20 p-10">
        {/* Section title with 3D effect */}
        <div className="text-center mb-16 px-6">
          <div className="inline-block relative">
            <div className="mb-2">
              <span className="font-[family-name:var(--font-xeroda)] text-5xl text-black/10 absolute top-0 left-0 filter blur-[3px]">SPONSORS</span>
              <span className="font-[family-name:var(--font-xeroda)] text-5xl text-white relative px-2 py-1">SPONSORS</span>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 mt-2"></div>
          </div>
          
          {/* <p className="text-white/70 font-[family-name:var(--font-xeroda)] max-w-2xl mx-auto mt-6">
            We're proud to partner with these forward-thinking organizations who share our vision of 
            driving innovation and social impact through technology.
          </p> */}
        </div>
        
        {/* Tiered sponsors grid */}
        {/* <div ref={sponsorsRef} className="max-w-6xl mx-auto space-y-16">
          {sponsorTiers.map((tier) => (
            <div key={tier.tier} className="sponsor-tier"> */}
              {/* Tier header */}
              {/* <div className="flex items-center justify-center mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                <div className="px-4 py-2 mx-2 bg-gradient-to-r from-amber-900/20 to-amber-700/20 rounded-full border border-amber-500/20">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-amber-400">
                    {tier.tier}
                  </h3>
                </div>
                <div className="h-px w-12 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
              </div> */}
              
              {/* Sponsor logos */}
              {/* <div className={`grid ${tier.tier === 'PLATINUM' ? 'md:grid-cols-2' : tier.tier === 'GOLD' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6`}>
                {tier.sponsors.map((sponsor) => (
                  <div 
                    key={sponsor.name}
                    className="sponsor-logo relative backdrop-blur-sm bg-white/[0.05] rounded-xl border border-white/10 overflow-hidden p-6 flex flex-col items-center justify-center transform-gpu transition-transform hover:scale-105"
                  > */}
                    {/* Sponsor logo */}
                    {/* <div className="relative h-24 w-full flex items-center justify-center">
                      <img 
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    </div> */}
                    
                    {/* Sponsor name */}
                    {/* <div className="mt-4 text-center">
                      <h4 className="font-[family-name:var(--font-display)] text-lg text-white">{sponsor.name}</h4>
                    </div>
                     */}
                    {/* Accent border glow */}
                    {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      
      {/* Partners section */}
      {/* <div> */}
        {/* Section title */}
        {/* <div className="text-center mb-16">
          <div className="inline-block relative">
            <div className="mb-2">
              <Award className="h-8 w-8 text-violet-400/50 mx-auto mb-3" />
              <span className="font-[family-name:var(--font-display)] text-4xl text-black/10 absolute top-0 left-0 filter blur-[3px]">STRATEGIC PARTNERS</span>
              <span className="font-[family-name:var(--font-display)] text-4xl text-white relative">STRATEGIC PARTNERS</span>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-violet-500/50 via-indigo-500/50 to-violet-500/50 mt-2"></div>
          </div>
        </div> */}
        
        {/* Partners grid */}
        {/* <div ref={partnersRef} className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div 
                key={partner.name}
                className="partner-card relative backdrop-blur-sm bg-white/[0.05] rounded-xl border border-white/10 overflow-hidden transform-gpu preserve-3d"
              >
                <div className="p-8 flex flex-col items-center"> */}
                  {/* Partner logo */}
                  {/* <div className="h-24 w-full flex items-center justify-center mb-6">
                    <img 
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-16 max-w-full object-contain"
                    />
                  </div> */}
                  
                  {/* Partner details */}
                  {/* <h4 className="font-[family-name:var(--font-display)] text-xl text-white text-center mb-2">{partner.name}</h4>
                  <div className="px-3 py-1.5 bg-violet-500/10 rounded-full text-sm font-[family-name:var(--font-xeroda)] text-violet-300">
                    {partner.type}
                  </div>
                </div> */}
                
                {/* Decorative accent */}
                {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"></div>
              </div>
            ))}
          </div>
        </div> */}
        
        {/* Become a sponsor CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block relative px-8 py-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
            <h3 className="font-[family-name:var(--font-xeroda)] text-2xl text-white mb-4">
              INTERESTED IN SPONSORSHIP?
            </h3>
            <p className="text-white/70 font-[family-name:var(--font-xeroda)] max-w-2xl mx-auto mb-6">
              Showcase your brand to top tech talent and innovators. Download our sponsorship prospectus 
              to learn about exclusive benefits and opportunities.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-violet-500 rounded-lg font-[family-name:var(--font-xeroda)] text-white text-sm transition-all hover:opacity-90"
            >
              SPONSORSHIP PACKAGE
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
