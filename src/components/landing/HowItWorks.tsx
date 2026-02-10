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
    <section id="how-it-works" className="py-28 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pink-400 text-xs uppercase tracking-[0.4em] mb-3 font-medium"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            How It <span className="text-pink-400">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 max-w-md mx-auto"
          >
            Four simple steps to your perfect wedding
          </motion.p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-px bg-gradient-to-r from-pink-500/30 via-pink-500/50 to-pink-500/30" />
            
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
                    <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl shadow-pink-500/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-3xl text-white" />
                    </div>
                    
                    {/* Number badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-800 border border-white/20 text-white text-xs font-bold tracking-wider">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-[200px] mx-auto">
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
