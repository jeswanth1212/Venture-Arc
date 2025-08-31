"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Gavel, Star, Trophy, Medal } from "lucide-react";
import { GlassCard, GlassCardGroup } from "@/components/ui/glass-card";

const judgingCriteria = [
  {
    icon: Gavel,
    title: "Expert Jury Panel",
    desc: "70% of evaluation by industry professionals, VCs, government officials, and technical leaders."
  },
  {
    icon: Star,
    title: "Audience Voting",
    desc: "30% live audience voting through a secure event application."
  }
];

const prizes = [
  {
    index: "01",
    icon: Trophy,
    title: "1st Prize",
    desc: "Coming Soon - Cash prize, mentorship, and incubation opportunity",
    value: "Coming Soon"
  },
  {
    index: "02",
    icon: Medal,
    title: "2nd Prize",
    desc: "Coming Soon - Cash prize and acceleration support",
    value: "Coming Soon"
  },
  {
    index: "03",
    icon: Star,
    title: "Special Awards",
    desc: "Coming Soon - Best Innovation, Social Impact, Women-led Team, and more",
    value: "Coming Soon"
  }
];

export function PrizesJudging() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prizesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!prizesRef.current) return;
    
    // Create staggered animation for prize cards
    const prizeCards = prizesRef.current.querySelectorAll('.prize-card');
    
    gsap.fromTo(prizeCards, 
      { 
        y: 100, 
        opacity: 0,
        rotateY: -15
      },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: prizesRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Create floating animation for prize amounts
    prizeCards.forEach((card) => {
      const prizeAmount = card.querySelector('.prize-amount');
      if (prizeAmount) {
        gsap.to(prizeAmount, {
          y: -10,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    });
    
    // Clean up animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === prizesRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <div className="space-y-16" ref={sectionRef}>
      {/* Judging Criteria Section */}
      <div className="relative overflow-hidden">
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h3 className="font-[family-name:var(--font-xeroda)] text-4xl text-center text-white mb-2">
              JUDGING CRITERIA
            </h3>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mx-auto"></div>
          </div>
          
          <GlassCardGroup className="md:grid-cols-2">
            {judgingCriteria.map((item, i) => (
              <GlassCard 
                key={item.title}
                variant={i === 0 ? "highlight" : "default"}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-fuchsia-500/10">
                      <item.icon className="h-7 w-7 text-fuchsia-400" />
                    </div>
                    <h4 className="font-[family-name:var(--font-xeroda)] text-2xl text-white">{item.title}</h4>
                  </div>
                  
                  <p className="text-white/85 libertinus-sans-regular leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* Percentage visualization */}
                  <div className="mt-6">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-400"
                        style={{ width: i === 0 ? '70%' : '30%' }}
                      ></div>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-fuchsia-400 font-bold text-xl">{i === 0 ? '70%' : '30%'}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </GlassCardGroup>
          
          {/* Additional judging info */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <p className="text-white/70 text-center text-sm">
              Real-time leaderboard & blind audit system ensuring complete transparency.
              <br />Final decisions by the jury panel are binding and non-contestable.
            </p>
          </div>
        </div>
      </div>

      {/* Prize Cards */}
      <div ref={prizesRef} className="relative">
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h3 className="font-[family-name:var(--font-xeroda)] text-4xl text-center text-white mb-2">
              PRIZES & AWARDS
            </h3>
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-3"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {prizes.map((prize, i) => (
              <div 
                key={prize.title}
                className="prize-card relative transform-gpu transition-all duration-500 hover:scale-[1.02]"
              >
                <GlassCard variant={i === 0 ? "accent" : i === 1 ? "highlight" : "default"}>
                  <div className="p-8 pt-16 text-center">
                    {/* Prize position number */}
                    <div className="absolute top-0 left-0">
                      <div className="relative">
                        <span className="font-[family-name:var(--font-display)] text-7xl text-black/10 filter blur-[2px] select-none">{prize.index}</span>
                        <span className="font-[family-name:var(--font-display)] text-7xl text-white/60 select-none absolute top-0 left-0">{prize.index}</span>
                      </div>
                    </div>
                    
                    {/* Prize icon */}
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-amber-500/10 mb-4 border border-amber-500/20">
                      <prize.icon className={`h-10 w-10 ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-slate-300' : 'text-fuchsia-400'}`} />
                    </div>
                    
                    {/* Prize title */}
                    <h4 className="font-[family-name:var(--font-xeroda)] text-2xl text-white mb-2">{prize.title}</h4>
                    
                    {/* Prize description */}
                    <p className="text-white/85 libertinus-sans-regular text-sm">
                      {prize.desc}
                    </p>
                    
                    {/* Prize amount */}
                    <div className="mt-8 prize-amount">
                      <div className="text-3xl font-[family-name:var(--font-display)] text-amber-400">
                        {prize.value}
                      </div>
                      {/* <div className="text-xs text-white/50 mt-1">+ Startup Resources</div> */}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-white/70 libertinus-sans-regular">
              Winners will be announced during the closing ceremony. <br />
              <span className="text-amber-400">Total prize pool - Coming Soon</span>
            </p>
          </div>
          
          {/* Additional prize info */}
          {/* <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <p className="text-white/70 text-center text-sm">
              Winners also receive exclusive investor networking opportunities, media features, and partnership possibilities.
              <br />Additional prizes may be announced closer to the event date.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
