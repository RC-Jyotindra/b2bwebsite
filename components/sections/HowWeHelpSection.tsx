"use client";

import { motion } from "framer-motion";
import { Phone, FileText, BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Expert Calls & Meetings",
    description: "Direct, private conversations to gather bespoke insights to inform and validate hypotheses.",
    icon: Phone,
    image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&q=80&w=2069",
  },
  {
    title: "Expert Content",
    description: "Access original and unblinded senior-level expert transcripts on-demand, wherever you work.",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "Research",
    description: "Quantitative and qualitative surveys that capture global views, technical depth, and professional opinions at scale.",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
  },
  {
    title: "Events",
    description: "In-person or virtual events to connect with and hear from leading, senior experts to better understand market shifts.",
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070",
  },
];

export default function HowWeHelpSection() {
  return (
    <section id="how-we-help" className="py-24 bg-apex-cream text-apex-black relative">
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="mb-24 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-medium mb-6"
          >
            How we help
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-apex-gray-text mb-8"
          >
            Go beyond what's widely known with the power of expert perspective. Answer your most complex and critical questions and gain a strategic edge.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button className="bg-apex-blue hover:bg-apex-blue-hover text-white rounded-none px-6 py-6 text-base">
              Learn more
            </Button>
          </motion.div>
        </div>

        {/* The Stacking Cards Container */}
        <div className="flex flex-col gap-12 pb-24 relative">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.title}
                className="sticky shadow-2xl rounded-none overflow-hidden border border-gray-200 bg-white"
                style={{ 
                  top: `calc(15vh + ${index * 32}px)`,
                  zIndex: 10 + index 
                }}
              >
                <div className={cn(
                  "flex flex-col h-[500px] lg:h-[600px] w-full",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}>
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-12 lg:pt-16 flex flex-col justify-start bg-white">
                    <div className="bg-apex-blue/10 w-16 h-16 rounded-none flex items-center justify-center mb-8 shrink-0">
                      <service.icon className="w-8 h-8 text-apex-blue" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-3xl lg:text-4xl font-medium mb-6 text-apex-black">
                      {service.title}
                    </h3>
                    <p className="text-apex-gray-text text-lg lg:text-xl leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="w-full lg:w-1/2 h-full relative overflow-hidden group">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
