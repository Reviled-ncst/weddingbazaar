'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiHeart, FiBriefcase } from 'react-icons/fi';

export function CTA() {
  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-pink-400 text-xs uppercase tracking-[0.4em] mb-4 font-medium"
          >
            Get Started Today
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Ready to Begin Your <span className="text-pink-400">Journey</span>?
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* For Couples */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl group"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1974&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Corner decoration */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-pink-500/20 backdrop-blur-sm flex items-center justify-center">
              <FiHeart className="text-pink-300 text-xl" />
            </div>
            
            <div className="relative z-10 p-10 md:p-12 min-h-[450px] flex flex-col justify-end">
              <div className="w-16 h-px bg-pink-400 mb-6 group-hover:w-24 transition-all duration-300" />
              <p className="text-pink-300 text-xs uppercase tracking-[0.3em] mb-3 font-medium">For Couples</p>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
                Start Planning Your <br/><span className="font-medium text-pink-200">Dream Day</span>
              </h3>
              <p className="text-white/60 mb-8 font-light max-w-sm leading-relaxed">
                Create your free account and discover amazing vendors for your perfect wedding celebration.
              </p>
              <Link href="/register?role=couple">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-pink-50 px-8 py-6 font-medium w-fit text-sm uppercase tracking-wider"
                  endContent={<FiArrowRight />}
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* For Vendors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-3xl group"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/60 to-gray-900/30" />
            <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Corner decoration */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <FiBriefcase className="text-white/80 text-xl" />
            </div>
            
            <div className="relative z-10 p-10 md:p-12 min-h-[450px] flex flex-col justify-end">
              <div className="w-16 h-px bg-white/40 mb-6 group-hover:w-24 transition-all duration-300" />
              <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-3 font-medium">For Vendors</p>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
                Grow Your <br/><span className="font-medium">Business</span>
              </h3>
              <p className="text-white/50 mb-8 font-light max-w-sm leading-relaxed">
                Join our platform and connect with thousands of couples actively looking for your services.
              </p>
              <Link href="/register?role=provider">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-white/50 text-white hover:bg-white hover:text-gray-900 px-8 py-6 font-medium w-fit text-sm uppercase tracking-wider transition-all duration-300"
                  endContent={<FiArrowRight />}
                >
                  List Your Business
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
