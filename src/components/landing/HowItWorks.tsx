'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiMessageSquare, FiCalendar, FiHeart, FiArrowRight } from 'react-icons/fi';

const steps = [
  {
    number: '01',
    icon: FiSearch,
    title: 'Discover',
    description: 'Browse our curated collection of verified wedding vendors across all categories.',
    color: 'from-pink-400 to-rose-500',
  },
  {
    number: '02',
    icon: FiMessageSquare,
    title: 'Connect',
    description: 'Send inquiries, ask questions, and receive personalized quotes directly.',
    color: 'from-rose-400 to-pink-500',
  },
  {
    number: '03',
    icon: FiCalendar,
    title: 'Book',
    description: 'Compare options side-by-side and secure your vendors with ease.',
    color: 'from-pink-500 to-rose-400',
  },
  {
    number: '04',
    icon: FiHeart,
    title: 'Celebrate',
    description: 'Enjoy your perfectly planned day with your dream wedding team.',
    color: 'from-rose-500 to-pink-400',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-gradient-to-b from-pink-50/50 via-white to-pink-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pink-500 text-xs uppercase tracking-[0.4em] mb-3 font-medium"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-light text-gray-900 mb-4"
          >
            How It <span className="font-medium text-pink-500">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-md mx-auto"
          >
            Four simple steps to your perfect wedding
          </motion.p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
            {/* Connecting arrows */}
            <div className="hidden md:flex absolute top-20 left-[20%] right-[20%] justify-between items-center px-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <FiArrowRight className="text-pink-300 text-xl" />
                </motion.div>
              ))}
            </div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center relative group"
                >
                  {/* Icon Circle */}
                  <div className="relative inline-block mb-8">
                    {/* Outer ring */}
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${step.color} shadow-lg shadow-pink-200/50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-4xl text-white" />
                    </div>
                    
                    {/* Number badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-medium tracking-wider">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
