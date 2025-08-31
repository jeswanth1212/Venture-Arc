"use client";

import { useState } from "react";
import { PlusCircle, MinusCircle, HelpCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { 
    q: "Who can participate?", 
    a: "VentureArc is open to all college students, startups, young innovators, and developers passionate about creating social impact through technology. We welcome diverse teams from across India and beyond."
  },
  { 
    q: "What's the team size requirement?", 
    a: "Teams should consist of 2–5 members. Cross-disciplinary teams with diverse skill sets are encouraged to foster holistic solution development."
  },
  { 
    q: "Is participation free?", 
    a: "Yes, there is no registration fee to participate in VentureArc. We believe in making innovation accessible to all passionate problem-solvers."
  },
  { 
    q: "Do we need a prototype?", 
    a: "Yes, a digital submission of your prototype or minimum viable product (MVP) is required for the final evaluation phase. However, you'll have mentorship and development time during the event."
  },
  { 
    q: "What kind of mentorship is provided?", 
    a: "Finalists receive personalized guidance from industry experts, technical mentors, and business advisors throughout the event to refine their solutions and business models."
  },
  { 
    q: "How are winners selected?", 
    a: "Projects are evaluated based on innovation, feasibility, scalability, social impact, and presentation quality by our expert panel and audience voting."
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title mb-8 flex flex-col items-center text-center">
          {/* <HelpCircle className="mb-2 h-6 w-6 text-violet-400" /> */}
          Frequently Asked Questions
        </h2>
        <div className="section-subtitle text-center max-w-3xl mx-auto">
          Have questions about VentureArc? Find answers to common queries below 
          or contact our team at support@venturearc.in
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-white/5 border border-white/10 rounded-lg transition-colors ${openIndex === index ? "bg-white/10" : ""}`}
          >
            <motion.div 
              className="cursor-pointer p-5"
              onClick={() => toggleFAQ(index)}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-lg tracking-tight">{faq.q}</h3>
                <motion.button 
                  aria-label={openIndex === index ? "Close" : "Open"} 
                  className="text-white/70 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {openIndex === index ? (
                    <MinusCircle className="h-5 w-5 text-violet-400" />
                  ) : (
                    <PlusCircle className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
              
              <AnimatePresence mode="wait">
                {openIndex === index && (
                  <motion.div
                    key={`faq-answer-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-white/85 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
      
      <div className="relative mt-16 max-w-2xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-violet-500/10 blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-violet-500/5 blur-xl"></div>
        
        <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
          <div className="p-6 flex items-start gap-4">
            <div className="rounded-full p-3 bg-violet-500/10 flex-shrink-0">
              <MessageCircle className="h-5 w-5 text-violet-400" />
            </div>
            
            <div>
              <h3 className="font-bold text-white text-lg mb-2">Still have questions?</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Our team is here to help! Reach out to us and we'll get back to you promptly with the information you need.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="mailto:info@venturearc.in" 
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 transition-colors rounded-lg text-white text-sm font-medium"
                >
                  Email Us
                </a>
                <a 
                  href="#" 
                  className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 transition-colors rounded-lg text-violet-300 text-sm font-medium"
                >
                  Discord Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
