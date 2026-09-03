"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ForExpertsSection() {
  return (
    <section id="for-experts" className="py-24 bg-apex-white text-apex-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-apex-cream -z-10" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-medium mb-6">
                Become an ApexIntel Expert
              </h2>
              <p className="text-lg text-apex-gray-text mb-8">
                Join our network of over 1 million professionals. Share your expertise, shape the future of business, and get compensated for your unique insights.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Set your own consulting rate",
                  "Choose when and how you engage",
                  "Expand your professional network",
                  "Influence critical business decisions"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-apex-blue" />
                    <span className="font-medium text-apex-black">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-apex-blue hover:bg-apex-blue-hover text-white px-8 py-6 rounded-none text-base">
                  Apply to join
                </Button>
                <Button variant="outline" className="border-apex-border hover:bg-apex-cream text-apex-black px-8 py-6 rounded-none text-base">
                  Learn more
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 relative h-[500px] w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute inset-0"
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2069"
                alt="Expert speaking at conference"
                className="w-full h-full object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-apex-blue -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-apex-blue/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
