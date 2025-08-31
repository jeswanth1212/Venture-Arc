"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);

    if (!headingRef.current || !textRef.current || !sectionRef.current || !imageRef.current || 
        !badgeRef.current || !dividerRef.current) return;

    // Split the heading and paragraph text
    const headingSplit = new SplitType(headingRef.current, {
      types: "words,chars",
      tagName: "span"
    });

    const textSplit = new SplitType(textRef.current, {
      types: "lines,words",
      tagName: "span"
    });

    // Create master timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Changed from 60% to 80% to trigger earlier
        end: "center 40%", // Changed from 20% to 40% 
        scrub: 0.7,
      }
    });

    // Badge animation
    masterTl.fromTo(badgeRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3
    }, 0);

    // Heading animation - word by word with emphasis
    if (headingSplit.words) {
      const words = headingSplit.words;
      words.forEach((word, index) => {
        const delay = index * 0.1;
        
        masterTl.fromTo(word, 
          {
            opacity: 0,
            y: 40,
            rotateX: 30,
            transformOrigin: "0% 50% -20px"
          }, 
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "power2.out"
          }, 
          delay
        );
      });
    }

    // Divider line
    masterTl.fromTo(dividerRef.current, {
      scaleX: 0,
      transformOrigin: "left"
    }, {
      scaleX: 1,
      duration: 0.5,
      ease: "power1.inOut"
    }, 0.7);

    // Text lines staggered reveal
    if (textSplit.lines) {
      textSplit.lines.forEach((line, index) => {
        const wordsInLine = line.querySelectorAll('.word');
        
        masterTl.fromTo(wordsInLine, 
          {
            opacity: 0,
            y: 30
          }, 
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.7,
            ease: "power1.out"
          }, 
          0.8 + (index * 0.15)
        );
      });
    }

    // Image animation - separate from text for contrast
    masterTl.fromTo(imageRef.current, 
      {
        opacity: 0,
        x: 70,
        scale: 0.9
      }, 
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, 
      0.5
    );

    // Reset animations when section is out of view
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onLeaveBack: () => {
        masterTl.progress(0);
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 md:py-40 relative overflow-hidden" // Increased padding
      id="about-section" // Added ID for easier targeting
    >
      {/* Decorative background removed for uniform pitch black */}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div 
              ref={badgeRef}
              className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white font-medium text-sm tracking-wide"
            >
              About VentureArc
            </div>
            <h2 
              ref={headingRef} 
              className="text-5xl md:text-6xl lg:text-6xl font-[family-name:var(--font-xeroda)] text-white leading-tight"
            >
              Innovation Meets Impact
            </h2>
            <div ref={dividerRef} className="w-24 h-0.5 bg-white/30"></div>
            <p 
              ref={textRef} 
              className="text-white/85 leading-relaxed font-[family-name:var(--font-xeroda)] text-lg md:text-xl"
            >
              VentureArc is India's premier platform where technology transforms society. Organized by CSED-VIT Chennai, it
              brings together students, startups, industry leaders, VCs, and government partners to co-create deployable
              solutions for urgent social challenges. With expert mentorship, investor networking, and funding opportunities,
              VentureArc is the ultimate launchpad where innovation meets impact.
            </p>
          </div>
          <div 
            ref={imageRef} 
            className="rounded-2xl relative group"
          >
            <div className="absolute -inset-0.5 bg-white/5 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition duration-700"></div>
            <div className="rounded-2xl overflow-hidden relative bg-black border border-white/10 aspect-video p-8 flex items-center justify-center transform group-hover:scale-[0.99] transition-transform duration-500">
              <div className="text-center space-y-8">
                <div className="text-5xl md:text-6xl font-[family-name:var(--font-display)] text-white tracking-wider">2025</div>
                <div className="space-y-4">
                  <div className="w-20 h-0.5 bg-fuchsia-400/30 mx-auto"></div>
                  <p className="text-white/90 text-xl font-medium">Transforming ideas into ventures</p>
                  <p className="text-white/70">that change the world</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
