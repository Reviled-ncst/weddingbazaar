'use client';

import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiUsers, FiHeart, FiAward, FiMapPin } from 'react-icons/fi';

const stats = [
  { 
    icon: FiUsers, 
    value: 500, 
    suffix: '+', 
    label: 'Verified Vendors',
    description: 'Trusted professionals'
  },
  { 
    icon: FiHeart, 
    value: 2000, 
    suffix: '+', 
    label: 'Happy Couples',
    description: 'Dreams realized'
  },
  { 
    icon: FiAward, 
    value: 98, 
    suffix: '%', 
    label: 'Satisfaction Rate',
    description: 'Five-star service'
  },
  { 
    icon: FiMapPin, 
    value: 50, 
    suffix: '+', 
    label: 'Cities Covered',
    description: 'Nationwide reach'
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-pink-500/20 via-transparent to-pink-500/20" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-pink-400 text-xs uppercase tracking-[0.4em] mb-4 font-medium"
          >
            Our Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-white"
          >
            Trusted by <span className="text-pink-400 font-medium">Thousands</span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                {/* Icon Circle */}
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-2xl text-pink-400" />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <p className="text-4xl md:text-5xl font-light text-white mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white font-medium mb-1">{stat.label}</p>
              <p className="text-white/50 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
