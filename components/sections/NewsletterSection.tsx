"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  return (
    <section className="py-24 bg-apex-blue text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2029')] opacity-10 mix-blend-overlay bg-cover bg-center" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-medium mb-4">
              Stay ahead of the curve
            </h2>
            <p className="text-lg text-white/80 max-w-xl">
              Subscribe to our newsletter to receive weekly insights from industry leaders and updates on the latest market trends.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <form className="flex flex-col sm:flex-row gap-0 w-full shadow-2xl" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Work email address"
                className="px-6 py-4 flex-grow bg-white text-apex-black outline-none border-none placeholder:text-gray-400 min-w-0"
                required
              />
              <Button type="submit" className="bg-apex-black hover:bg-gray-900 text-white rounded-none px-8 py-7 h-auto">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-white/60 mt-4">
              By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
