"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const industries = [
  { name: "Financial Services", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070" },
  { name: "Private Equity", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070" },
  { name: "Consulting Firms", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" },
  { name: "Law", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2070" },
  { name: "Corporations", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" },
  { name: "Technology", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-apex-white text-apex-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-medium mb-4">
              Built for your industry
            </h2>
            <p className="text-lg text-apex-gray-text max-w-2xl">
              We provide tailored solutions for professionals across diverse sectors, ensuring you get the exact expertise you need.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="#" className="flex items-center gap-2 text-apex-blue hover:text-apex-blue-hover font-medium transition-colors group">
              View all industries
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden h-[300px] cursor-pointer"
            >
              <div className="absolute inset-0 bg-apex-black/40 group-hover:bg-apex-black/20 transition-colors duration-500 z-10" />
              <img
                src={industry.image}
                alt={industry.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <h3 className="text-2xl font-medium text-white mb-4 group-hover:-translate-y-2 transition-transform duration-300">
                  {industry.name}
                </h3>
                <div className="w-0 h-[2px] bg-apex-blue group-hover:w-12 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
