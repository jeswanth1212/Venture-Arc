"use client";

import { useEffect, useRef, useState } from "react";
import { Banknote, Factory, Stethoscope, Trees } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  { 
    index: "01",
    icon: Banknote, 
    title: "FinTech for Social Good", 
    desc: "Building inclusive financial solutions that empower underserved communities. Focus on digital literacy, accessible banking platforms, microfinance innovations, and transparent financial tools for economic empowerment.",
    image: "/images/fintech.png"
  },
  { 
    index: "02",
    icon: Factory, 
    title: "Smart Cities & Urban Sustainability", 
    desc: "Creating the cities of tomorrow with intelligent infrastructure and eco-friendly solutions. Develop renewable energy systems, smart mobility platforms, sustainable urban planning tools, and green infrastructure technologies.",
    image: "/images/urban.png"
  },
  { 
    index: "03",
    icon: Stethoscope, 
    title: "AI-Enabled Healthcare", 
    desc: "Revolutionizing healthcare access and quality through artificial intelligence. Innovate with rural telemedicine, diagnostic AI solutions, accessible telehealth platforms, and breakthrough medical technologies for all communities.",
    image: "/images/healthcare.png"
  },
  { 
    index: "04",
    icon: Trees, 
    title: "GreenTech & Climate Innovation", 
    desc: "Pioneering technologies that protect our planet and build a sustainable future. Focus on renewable energy systems, agriculture technology, environmental protection solutions, and circular economy innovations.",
    image: "/images/greentech.png"
  },
];

export function Tracks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const accents = ["from-fuchsia-500", "from-cyan-400", "from-emerald-500", "from-amber-400"];
  
  // Handle navigation to a specific panel
  const navigateToPanel = (index: number) => {
    if (!sectionRef.current) return;
    
    setActiveIndex(index);
    
    // Calculate the scroll position needed to activate the selected panel
    const sectionStart = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const totalScrollDistance = sectionHeight * items.length;
    const scrollPosition = sectionStart + (totalScrollDistance * (index / items.length));
    
    // Animate to the scroll position
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === "undefined") return;
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Ensure our refs are populated
    if (!sectionRef.current || !trackContainerRef.current || !panelsRef.current) return;
    
    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });
    
    // Calculate the width of a single panel
    const panelWidth = window.innerWidth;
    const totalWidth = panelWidth * items.length;
    
    // Set initial panel container width
    gsap.set(panelsRef.current, {
      width: totalWidth,
    });
    
    // Set up the ScrollTrigger for horizontal scrolling
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * items.length}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const progress = self.progress;
        const rawIndex = progress * items.length;
        const currentIndex = Math.min(Math.floor(rawIndex), items.length - 1);
        
        // Update indicators
        if (currentIndex !== activeIndex) {
          setActiveIndex(currentIndex);
        }
        
        // Calculate horizontal scroll position
        if (panelsRef.current) {
          const x = -progress * (totalWidth - panelWidth);
          gsap.set(panelsRef.current, { x });
          
          // Add parallax effect to each panel
          const panels = panelsRef.current.querySelectorAll('.track-panel');
          panels.forEach((panel, i) => {
            const distFromActive = i - (rawIndex);
            const parallaxEl = panel.querySelector('.track-parallax');
            const shadowEl = panel.querySelector('.track-index-shadow');
            
            // Parallax background
            if (parallaxEl) {
              gsap.set(parallaxEl, {
                x: distFromActive * -30,
              });
            }
            
            // 3D text shadow effect
            if (shadowEl) {
              gsap.set(shadowEl, {
                x: -3 + Math.abs(distFromActive) * 2,
                y: -3 + Math.abs(distFromActive) * 1.5
              });
            }
          });
        }
      }
    });
    
    // Handle resize for responsive behavior
    const handleResize = () => {
      if (panelsRef.current) {
        const newPanelWidth = window.innerWidth;
        const newTotalWidth = newPanelWidth * items.length;
        
        gsap.set(panelsRef.current, {
          width: newTotalWidth,
        });
        
        // Refresh ScrollTrigger to update calculations
        ScrollTrigger.refresh();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      scrollTrigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex]);

  return (
    <div 
      ref={sectionRef} 
      className="tracks-section relative w-full overflow-hidden h-screen"
      id="innovation-tracks"
    >
      {/* Decorative background removed for uniform pitch black */}
      
      {/* Section title */}
      <div className="absolute top-0 left-0 w-full py-8 px-4 z-20 pointer-events-none text-center">
        <div className="container mx-auto">
          <h2 className="font-[family-name:var(--font-xeroda)] text-4xl md:text-5xl text-white relative inline-block">
            <span className="relative z-10 px-2">INNOVATION TRACKS</span>
          </h2>
          <div className="w-40 h-1 bg-white/30 mx-auto mt-3"></div>
        </div>
      </div>
      
      {/* Track navigation indicators */}
      <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 z-20">
        {items.map((_, i) => (
          <button 
            key={i} 
            onClick={() => navigateToPanel(i)}
            className={`track-indicator w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
            aria-label={`View track ${i + 1}`}
          ></button>
        ))}
      </div>
      
      {/* Track container for horizontal scrolling */}
      <div 
        ref={trackContainerRef} 
        className="absolute inset-0 overflow-hidden"
      >
        {/* Horizontal scrolling container */}
        <div 
          ref={panelsRef} 
          className="panels-container absolute top-0 left-0 h-full flex will-change-transform"
        >
          {items.map((track, i) => (
            <div 
              key={track.title}
              className="track-panel w-screen h-full flex items-center flex-shrink-0 px-4 md:px-8"
            >
              <div className="w-full h-full max-w-7xl mx-auto flex items-center py-20 md:py-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
                  {/* Track image with 3D effect */}
                  <div className="md:col-span-7 relative rounded-xl overflow-hidden h-[30vh] md:h-[60vh] shadow-2xl">
                    {/* 3D Index Number - Top Left */}
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 select-none">
                      <div className="relative">
                        <span className="track-index-shadow absolute top-0 left-0 font-[family-name:var(--font-display)] text-6xl md:text-9xl lg:text-[14rem] text-black/10 blur-[3px]">{track.index}</span>
                        <span className="track-index relative font-[family-name:var(--font-display)] text-6xl md:text-9xl lg:text-[14rem] text-white/80">{track.index}</span>
                      </div>
                    </div>
                    
                    {/* Background image with parallax */}
                    <div className="absolute inset-0 track-parallax">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 mix-blend-multiply z-10"></div>
                      <div className={`absolute inset-0 bg-gradient-to-tr ${accents[i%accents.length]} to-transparent opacity-20 z-10`}></div>
                      <img 
                        src={track.image} 
                        alt={track.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    {/* Title with 3D effect - Top Right */}
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 text-right z-20 max-w-[60%]">
                      <div className="relative">
                        <h3 className="font-[family-name:var(--font-xeroda)] text-xl md:text-3xl lg:text-4xl text-black/10 filter blur-[2px]">{track.title}</h3>
                        <h3 className="font-[family-name:var(--font-xeroda)] text-xl md:text-3xl lg:text-4xl text-white absolute top-0 right-0">{track.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Track content */}
                  <div className="md:col-span-5 flex flex-col justify-center">
                    <div className="bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-xl border border-white/10">
                      {/* Track icon and title */}
                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <div className={`inline-grid place-items-center h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br ${accents[i%accents.length]} to-transparent`}>
                          <track.icon aria-hidden className="h-5 w-5 md:h-6 md:w-6 text-white" />
                        </div>
                        <h3 className="font-[family-name:var(--font-xeroda)] text-xl md:text-2xl lg:text-3xl text-white tracking-tight">
                          {track.title}
                        </h3>
                      </div>
                      
                      {/* Track description */}
                      <p className="text-white/90 font-[family-name:var(--font-xeroda)] text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
                        {track.desc}
                      </p>
                      
                      {/* Track indicators */}
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 font-[family-name:var(--font-xeroda)] text-xs md:text-sm text-white/90`}>
                          Track {i + 1} of {items.length}
                        </span>
                        
                        <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 text-white/70 font-[family-name:var(--font-xeroda)] text-xs md:text-sm">
                          Scroll to explore
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile-only pagination arrows */}
      <div className="absolute z-30 w-full bottom-24 px-4 flex justify-between pointer-events-none md:hidden">
        <button 
          onClick={() => navigateToPanel(Math.max(0, activeIndex - 1))}
          className={`h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center pointer-events-auto ${activeIndex === 0 ? 'opacity-30' : 'opacity-100'}`}
          disabled={activeIndex === 0}
          aria-label="Previous track"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        
        <button 
          onClick={() => navigateToPanel(Math.min(items.length - 1, activeIndex + 1))}
          className={`h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center pointer-events-auto ${activeIndex === items.length - 1 ? 'opacity-30' : 'opacity-100'}`}
          disabled={activeIndex === items.length - 1}
          aria-label="Next track"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      {/* Side gradient masks */}
      <div className="absolute left-0 top-0 h-full w-[5vw] z-10 bg-gradient-to-r from-[#0b0b0f] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-[5vw] z-10 bg-gradient-to-l from-[#0b0b0f] to-transparent pointer-events-none"></div>
    </div>
  );
}
