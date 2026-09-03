"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "ApexIntel consistently delivers exceptional experts who provide nuanced, highly relevant insights that are critical to our investment process.",
    author: "Managing Director",
    company: "Global Private Equity Firm",
  },
  {
    quote: "The speed and precision with which ApexIntel connects us to the right voices has fundamentally changed how we approach market entry strategies.",
    author: "Head of Strategy",
    company: "Fortune 500 Technology Company",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-apex-cream text-apex-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-8">
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-apex-blue/40">
                  <path d="M11.6667 32C5.22335 32 0 26.7766 0 20.3333C0 14.1554 4.80164 9.07185 10.875 8.71881L11.6667 8.66667V0L16.2905 1.54133C17.0706 1.80137 17.6534 2.40428 17.8937 3.17646L18 3.55556V20.3333C18 26.7766 12.7766 32 6.33333 32H11.6667ZM33.6667 32C27.2234 32 22 26.7766 22 20.3333C22 14.1554 26.8016 9.07185 32.875 8.71881L33.6667 8.66667V0L38.2905 1.54133C39.0706 1.80137 39.6534 2.40428 39.8937 3.17646L40 3.55556V20.3333C40 26.7766 34.7766 32 28.3333 32H33.6667Z" fill="currentColor"/>
                </svg>
              </div>
              <p className="font-heading text-2xl md:text-3xl leading-snug mb-8 flex-grow">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-apex-black">{testimonial.author}</p>
                <p className="text-sm text-apex-gray-text">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
