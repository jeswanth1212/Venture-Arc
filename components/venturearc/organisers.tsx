"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { School, UsersRound, Award } from "lucide-react";
import { GlassCard, GlassCardGroup } from "@/components/ui/glass-card";

const organisers = [
  {
    icon: School,
    name: "VIT Chennai",
    role: "Host Institution",
    desc: "NAAC A++ accreditation, top NIRF rankings (10th in Universities, 11th in Engineering), renowned for research, innovation, and entrepreneurship.",
    achievements: [
      "NAAC A++ accredited institution",
      "Ranked 10th in Universities category by NIRF",
      "Ranked 11th in Engineering by NIRF",
      "State-of-the-art research facilities"
    ],
    logo: "/images/vit.png"
  },
  {
    icon: UsersRound,
    name: "CSED",
    role: "Organizing Community",
    desc: "Student-driven community blending social impact with entrepreneurship. Empowering innovators, leaders, and changemakers.",
    achievements: [
      "Over 50+ events organized annually",
      "Network of 5000+ students",
      "Partnerships with 20+ industry leaders",
      "Alumni at top global companies and startups"
    ],
    logo: "/images/csed.png"
  }
];

export function Organisers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const organizersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!organizersRef.current) return;
    
    // Create staggered animation for organizer cards
    const organizerCards = organizersRef.current.querySelectorAll('.organizer-card');
    
    gsap.fromTo(organizerCards,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: organizersRef.current,
          start: "top 80%",
          end: "bottom 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === organizersRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <div className="relative" ref={sectionRef}>
      
      {/* Title */}
      <div className="text-center mb-12 px-6 p-10">
        <h2 className="font-[family-name:var(--font-xeroda)] text-5xl text-white relative inline-block">
          <span className="relative z-10 px-4 py-1.5">ORGANIZING TEAMS</span>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-lg -z-10 rounded-lg"></div>
        </h2>
        <div className="w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-3"></div>
        <p className="text-white/70 font-[family-name:var(--font-xeroda)] max-w-2xl mx-auto mt-6 px-6">
          VentureArc is proudly organized by VIT Chennai's premier student-led 
          entrepreneurship community in partnership with industry and government stakeholders.
        </p>
      </div>
      
      {/* Organizer cards */}
      <div ref={organizersRef} className="max-w-6xl mx-auto">
        <GlassCardGroup className="md:grid-cols-2">
          {organisers.map((org, i) => (
            <GlassCard 
              key={org.name}
              variant={i === 0 ? "accent" : "highlight"}
              className="organizer-card"
            >
              <div className="p-6 md:p-8 relative">
                {/* Background accent */}
                <div className={`absolute top-0 ${i === 0 ? 'right' : 'left'}-0 w-32 h-32 rounded-full bg-${i === 0 ? 'blue' : 'purple'}-500/5 blur-2xl`}></div>
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`rounded-lg p-2.5 ${i === 0 ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10' : 'bg-gradient-to-br from-purple-500/20 to-purple-600/10'}`}>
                      <org.icon aria-hidden className={`h-6 w-6 ${i === 0 ? 'text-blue-400' : 'text-purple-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-xeroda)] text-2xl text-white">
                        {org.name}
                      </h3>
                      <div className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/70 mt-1 inline-block">
                        {org.role}
                      </div>
                    </div>
                  </div>
                  
                  {/* Placeholder image area */}
                  <div className="w-full h-28 md:h-32 mb-6 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                    <img 
                      src={org.logo}
                      alt={`${org.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <p className="text-white/90 leading-relaxed mb-6 font-[family-name:var(--font-xeroda)]">
                    {org.desc}
                  </p>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
                    <h4 className="text-white/90 font-bold text-sm mb-3 tracking-wide">
                      Key Highlights
                    </h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {org.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 ${i === 0 ? 'bg-blue-400' : 'bg-purple-400'}`}></span>
                          <span className="text-white/80 leading-tight font-[family-name:var(--font-xeroda)]">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </GlassCardGroup>
      </div>
      
      {/* Partnership note */}
      <div className="text-center mt-12">
        <div className="inline-block max-w-xl p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-white/10">
              <UsersRound className="h-5 w-5 text-white/70" />
            </div>
            <p className="text-white/80 text-sm font-[family-name:var(--font-xeroda)]">
              Interested in becoming an organizing partner? Reach out to us at <a href="mailto:partnerships@venturearc.in" className="text-blue-400 hover:underline">partnerships@venturearc.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
