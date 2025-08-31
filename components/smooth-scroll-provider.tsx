"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize smooth scrolling
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    
    // Connect Lenis scroll to GSAP ScrollTrigger
    lenisRef.current.on("scroll", (e: any) => {
      ScrollTrigger.update();
      // Dispatch a custom scroll event that our timeline animation will listen for
      window.dispatchEvent(new CustomEvent('scroll'));
    });
    
    // Set up the animation frame loop
    gsap.ticker.add((time) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time * 1000);
      }
    });
    
    // Manually refresh ScrollTrigger after Lenis is initialized
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    
    // Clean up on unmount
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      
      gsap.ticker.remove((time) => {
        if (lenisRef.current) {
          lenisRef.current.raf(time * 1000);
        }
      });
    };
  }, []);
  
  return <>{children}</>;
} 