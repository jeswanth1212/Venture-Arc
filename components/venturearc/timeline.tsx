"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineEvents = [
  {
    step: "Step 1",
    title: "Grand Launch",
    description: "Problem statements released",
  },
  {
    step: "Step 2",
    title: "Prelims & Screening",
    description: "Digital submissions & blind review",
  },
  {
    step: "Step 3",
    title: "Mentorship & Field Testing",
    description: "Finalists + milestones",
  },
  {
    step: "Step 4",
    title: "Grand Finale (Tech FaceOff)",
    description: "Expo, demos, investor pitches",
  },
];

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const timelineRefs = useRef<HTMLDivElement[]>([]);
  const dotRefs = useRef<SVGCircleElement[]>([]);
  const anchorRefs = useRef<HTMLDivElement[]>([]);
  const createdTriggersRef = useRef<ScrollTrigger[]>([]);
  const createdTimelinesRef = useRef<gsap.core.Timeline[]>([]);
  const segmentLengthsRef = useRef<number[]>([]);
  const cumLengthsRef = useRef<number[]>([]);
  const totalLengthRef = useRef<number>(0);
  const revealStatesRef = useRef<boolean[]>([]);
  const tickerUpdateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Make sure page always starts from top on refresh
    if (typeof window !== "undefined") {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Only run in browser environment
    if (typeof window !== "undefined") {
      // Optional plugins if available globally (e.g. via CDN)
      const DrawSVGPlugin = (window as any).DrawSVGPlugin;
      const MotionPathPlugin = (window as any).MotionPathPlugin;
      
      if (DrawSVGPlugin) {
        gsap.registerPlugin(DrawSVGPlugin);
      }
      
      if (MotionPathPlugin) {
        gsap.registerPlugin(MotionPathPlugin);
      }
    }

    // Initialize timeline items and dots
    timelineRefs.current.forEach((item) => {
      if (item) {
        gsap.set(item, { 
          opacity: 0,
          y: 50,
          scale: 0.8
        });
      }
    });
    
    dotRefs.current.forEach((dot) => {
      if (dot) {
        gsap.set(dot, { 
          opacity: 0,
          scale: 0,
          transformOrigin: "50% 50%"
        });
      }
    });

    const svg = svgRef.current;
    if (!svg || pathRefs.current.length === 0 || !sectionRef.current) return;

    const computeAndPosition = () => {
      const svgRect = svg.getBoundingClientRect();

      const anchors = anchorRefs.current;
      // If any anchor is missing, skip until next refresh/resize
      if (anchors.some((a) => !a)) return;
      const solidAnchors = anchors as HTMLDivElement[];

      // Compute the anchor dot centers relative to the SVG
      const anchorPoints = solidAnchors.map((anchor) => {
        const r = anchor.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - svgRect.left,
          y: r.top + r.height / 2 - svgRect.top,
        };
      });

      // Position SVG dots and update connector paths
      anchorPoints.forEach((pt, index) => {
        const dot = dotRefs.current[index];
        if (dot) {
          dot.setAttribute("cx", String(pt.x));
          dot.setAttribute("cy", String(pt.y));
        }
      });

      for (let i = 0; i < anchorPoints.length - 1; i++) {
        const start = anchorPoints[i];
        const end = anchorPoints[i + 1];
        const midY = (start.y + end.y) / 2;
        const width = svgRect.width;
        const controlOffsetX = Math.max(80, Math.min(220, width * 0.18));

        const isStartLeft = start.x < width / 2;
        const isEndLeft = end.x < width / 2;

        const c1x = isStartLeft ? start.x + controlOffsetX : start.x - controlOffsetX;
        const c2x = isEndLeft ? end.x + controlOffsetX : end.x - controlOffsetX;

        const d = `M ${start.x},${start.y} C ${c1x},${midY} ${c2x},${midY} ${end.x},${end.y}`;
        const path = pathRefs.current[i];
        if (path) {
          path.setAttribute("d", d);
        }
      }
    };

    const clearCreated = () => {
      createdTriggersRef.current.forEach((t) => t.kill());
      createdTriggersRef.current = [];
      createdTimelinesRef.current.forEach((tl) => tl.kill());
      createdTimelinesRef.current = [];
      if (tickerUpdateRef.current) {
        gsap.ticker.remove(tickerUpdateRef.current);
        tickerUpdateRef.current = null;
      }
    };
        
    const recomputeLengthsAndInitDashes = () => {
      const lengths: number[] = [];
      pathRefs.current.forEach((p) => {
        if (!p) return;
        const L = p.getTotalLength();
        lengths.push(L);
        gsap.set(p, { strokeDasharray: `${L} ${L}`, strokeDashoffset: L, opacity: 1 });
      });
      segmentLengthsRef.current = lengths;
      const cum: number[] = [];
      let acc = 0;
      for (let i = 0; i < lengths.length; i++) {
        acc += lengths[i];
        cum.push(acc);
      }
      cumLengthsRef.current = cum;
      totalLengthRef.current = acc;
      revealStatesRef.current = new Array(dotRefs.current.length).fill(false);
    };

    const animateVisibility = (el: Element | null | undefined, show: boolean) => {
      if (!el) return;
      gsap.to(el, { opacity: show ? 1 : 0, scale: show ? 1 : 0, y: show ? 0 : "+=0", duration: 0.25, ease: show ? "back.out(1.6)" : "power1.in" });
    };

    const setOffsetsForProgress = (progress: number) => {
      const total = totalLengthRef.current;
      if (total <= 0) return;
      const target = progress * total;
      const lengths = segmentLengthsRef.current;
      const cum = cumLengthsRef.current;

      for (let i = 0; i < lengths.length; i++) {
        const segStart = i === 0 ? 0 : cum[i - 1];
        const segEnd = cum[i];
        const path = pathRefs.current[i];
        if (!path) continue;

        if (target <= segStart) {
          gsap.set(path, { strokeDashoffset: lengths[i] });
        } else if (target >= segEnd) {
          gsap.set(path, { strokeDashoffset: 0 });
        } else {
          const drawn = target - segStart;
          gsap.set(path, { strokeDashoffset: Math.max(0, lengths[i] - drawn) });
        }
      }

      // Reveal logic: first dot/card and then each subsequent when its segment completes
      // First elements
      const showFirst = progress > 0.01;
      if (revealStatesRef.current[0] !== showFirst) {
        revealStatesRef.current[0] = showFirst;
        animateVisibility(dotRefs.current[0], showFirst);
        animateVisibility(timelineRefs.current[0], showFirst);
      }

      // Subsequent
      for (let i = 0; i < lengths.length; i++) {
        const segEnd = cum[i];
        const revealSlack = Math.max(1, lengths[i] * 0.2); // reveal when within last 20% of segment
        const shouldShow = target >= segEnd - revealSlack;
        const idx = i + 1; // reveal next dot/card
        if (revealStatesRef.current[idx] !== shouldShow) {
          revealStatesRef.current[idx] = shouldShow;
          animateVisibility(dotRefs.current[idx], shouldShow);
          animateVisibility(timelineRefs.current[idx], shouldShow);
        }
      }
    };

    const initAnimation = () => {
      // Ensure geometry is ready before animating
      computeAndPosition();
      recomputeLengthsAndInitDashes();

      // Clear any previously created triggers/timelines/tickers from this component only
      clearCreated();

      // GSAP ticker-driven progress tied to scroll within this section
      const update = () => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const viewportH = window.innerHeight || 0;
        // Advance completion earlier: start when top hits 90%, finish when bottom hits 50%
        const startY = 0.9 * viewportH;
        const endTop = 0.5 * viewportH - rect.height;
        const denom = Math.max(1, startY - endTop);
        const raw = (startY - rect.top) / denom;
        const clamped = Math.max(0, Math.min(1, raw));
        // Force final revelation slightly before section exit
        const adjusted = (rect.bottom <= viewportH * 0.9 || clamped > 0.92) ? 1 : clamped;
        setOffsetsForProgress(adjusted);
      };
      tickerUpdateRef.current = update;
      gsap.ticker.add(update);
      update();
    };

    // Initial compute + animation after layout
    // Slight delay to ensure fonts/images/layout are settled
    const initId = window.setTimeout(() => {
      computeAndPosition();
      initAnimation();
      // Also update once after a slight delay to catch late layout shifts
      setTimeout(() => tickerUpdateRef.current && tickerUpdateRef.current(), 150);
    }, 200);

    // On window resize, recompute and refresh
    const handleResize = () => {
      computeAndPosition();
      recomputeLengthsAndInitDashes();
      if (tickerUpdateRef.current) tickerUpdateRef.current();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(initId);
      clearCreated();
      window.removeEventListener("resize", handleResize);
      if (typeof window !== "undefined") {
        window.onbeforeunload = null;
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative py-32 px-0 overflow-visible w-full"
      id="timeline-section"
    >
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-xeroda)] text-3xl md:text-4xl lg:text-5xl text-white">
        Timeline
      </h2>
        <div className="w-40 h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent mx-auto mt-3"></div>
      </div>
      
      <div className="relative min-h-[1000px] w-full">
        {/* SVG Path for the curved timeline */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg 
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d946ef" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Path segments that connect each timeline point */}
            {timelineEvents.slice(0, -1).map((_, index) => (
                <path
                  key={index}
                  ref={el => {
                    if (el) pathRefs.current[index] = el;
                  }}
                d="M0,0"
                className="fill-none"
                  stroke="url(#timeline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
            ))}
            
            {/* Connection dots at each timeline point (SVG layer, positioned dynamically) */}
            {timelineEvents.map((_, index) => (
                <circle 
                  key={index}
                  ref={el => {
                    if (el) dotRefs.current[index] = el;
                  }}
                cx={0}
                cy={0}
                  r="5" 
                  fill="url(#timeline-gradient)" 
                  filter="url(#glow)"
                  className="opacity-0"
                />
            ))}
          </svg>
        </div>

        {/* Timeline content */}
        <div className="relative z-10 space-y-48 md:space-y-64 max-w-7xl mx-auto px-4">
          {timelineEvents.map((event, index) => {
            // Alternate between left and right
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                ref={el => {
                  if (el) timelineRefs.current[index] = el;
                }}
                className={`flex flex-col ${
                  isEven
                    ? "ml-0 md:ml-4 items-start" 
                    : "mr-0 md:mr-4 items-end"
                } w-full md:w-1/3 relative opacity-0 timeline-event-${index} ${
                  isEven ? "md:ml-[10%]" : "md:ml-[55%]"
                }`}
                style={{
                  marginTop: index === 0 ? '100px' : '250px' // Fixed spacing for timeline items
                }}
              >
                {/* Connection point on the card (used as anchor for SVG path) */}
                <div 
                  ref={el => {
                    if (el) anchorRefs.current[index] = el;
                  }}
                  className={`absolute top-1/2 ${
                    isEven 
                      ? "left-0 -left-2" 
                      : "right-0 -right-2"
                  } w-4 h-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 transform -translate-y-1/2 shadow-glow`}
                />
                
                <div className={`bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-xl transform transition-all duration-500 ${isEven ? 'md:ml-8' : 'md:mr-8'}`}>
                  <h3 className="font-[family-name:var(--font-xeroda)] text-white mb-1 text-2xl px-2">
                    {event.step}
                  </h3>
                  <h4 className="font-[family-name:var(--font-xeroda)] text-white/90 mb-3 text-xl px-2">
                    {event.title}
                  </h4>
                  <p className="text-white/85 libertinus-sans-regular text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
