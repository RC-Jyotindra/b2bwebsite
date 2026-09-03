"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
const features = [
  {
    id: "01",
    title: "Unparalleled quality and depth of network",
    description: "Our teams precisely match you to hard-to-reach voices and authoritative perspectives that make the difference when stakes are high.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2532"
  },
  {
    id: "02",
    title: "AI-powered precision matching",
    description: "Our proprietary AI technology analyzes millions of data points to connect you with the exact expertise required for your specific challenge in hours, not weeks.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "03",
    title: "Enterprise-grade compliance framework",
    description: "Operate with confidence. Our industry-leading compliance framework is trusted by the world's most demanding financial institutions and corporations.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function WhyApexIntel() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });



  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveFeature(0);
    else if (latest < 0.66) setActiveFeature(1);
    else setActiveFeature(2);
  });

  return (
    <section ref={sectionRef} className="bg-apex-cream text-apex-black relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-24">
        <div className="container mx-auto px-6 md:px-12 w-full">
          <h2 className="font-heading text-4xl md:text-5xl font-medium mb-12 lg:mb-24 max-w-2xl">
            Why leading companies choose ApexIntel
          </h2>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left Column - Navigation */}
            <div className="lg:w-1/3 flex flex-col gap-12">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="flex gap-6 cursor-pointer group"
                  onClick={() => {
                    // Optional: You could scroll the window to the exact point for this feature, 
                    // but for simplicity we just let the scroll drive it.
                  }}
                >
                  <div className={`text-sm font-semibold transition-colors duration-300 ${activeFeature === index ? 'text-apex-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {feature.id}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-medium mb-4 transition-colors duration-300 ${activeFeature === index ? 'text-apex-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                      {feature.title}
                    </h3>
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-apex-gray-text text-sm overflow-hidden"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Images */}
            <div className="lg:w-2/3 relative h-[350px] md:h-[500px] lg:h-[600px] w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeFeature}
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover shadow-2xl"
                />
              </AnimatePresence>

              {/* Decorative Blue Square */}
              <motion.div 
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-apex-blue z-20 hidden md:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
