"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/modals/WaitlistModal";

const heroImages = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2532",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070"
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-apex-black text-white flex items-center pt-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center relative z-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 pt-12 pb-24 lg:py-32 pr-0 lg:pr-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            Accelerate your decisions with world-class B2B intelligence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base lg:text-lg text-gray-300 mb-8 max-w-lg"
          >
            Connect instantly with a curated network of elite industry experts to validate strategies and gain a critical market edge.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button 
              onClick={() => setIsWaitlistModalOpen(true)}
              className="bg-apex-blue hover:bg-apex-blue-hover text-white text-base lg:text-lg px-8 py-6 rounded-none font-medium transition-all duration-300"
            >
              Get started
            </Button>
          </motion.div>
        </div>

        {/* Right Image Layout */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] relative mt-12 lg:mt-0 hidden md:block">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] h-[80%] z-10 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={heroImages[currentImage]}
                alt="Professional business interaction"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center shadow-2xl"
              />
            </AnimatePresence>
          </motion.div>
          
          {/* Subtle abstract lines/patterns */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="absolute top-12 left-12 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2029')] bg-cover mix-blend-overlay rounded-full blur-3xl z-0"
          />
        </div>
      </div>

      <WaitlistModal 
        open={isWaitlistModalOpen} 
        onOpenChange={setIsWaitlistModalOpen} 
      />
    </section>
  );
}
