'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiSearch, FiPlay, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900/50" />

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-20 w-96 h-96 border border-pink-500/20 rounded-full hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-40 right-40 w-64 h-64 border border-pink-500/30 rounded-full hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="absolute bottom-40 left-20 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl hidden lg:block"
      />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-pink-400 text-xs uppercase tracking-[0.2em] font-medium">The Philippines&apos; Premier Wedding Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-[1.1]"
            >
              Your Dream
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                Wedding
              </span>
              <br />
              <span className="text-white/90">Starts Here</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed"
            >
              Discover and book the finest wedding vendors. From breathtaking venues 
              to world-class photographers, we connect you with excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/vendors">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-7 text-sm font-semibold tracking-wide shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
                  startContent={<FiSearch className="text-lg" />}
                >
                  Explore Vendors
                </Button>
              </Link>
              <Link href="/quiz">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-pink-500/50 px-8 py-7 text-sm font-medium tracking-wide backdrop-blur-sm transition-all duration-300"
                  startContent={<FiPlay className="text-lg" />}
                >
                  Take Style Quiz
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Vendors</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">2,000+</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Weddings</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-bold text-pink-400">4.9</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">Rating</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex flex-col gap-5"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <FiSearch className="text-pink-400 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Browse Categories</h3>
                  <p className="text-white/50 text-sm">12+ vendor categories</p>
                </div>
                <FiArrowRight className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 group cursor-pointer ml-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <FiPlay className="text-pink-400 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Style Quiz</h3>
                  <p className="text-white/50 text-sm">Find your perfect match</p>
                </div>
                <FiArrowRight className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/10 backdrop-blur-md border border-pink-500/30 rounded-2xl p-6 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">★</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">Top Rated Vendors</h3>
                  <p className="text-white/60 text-sm">Verified professionals only</p>
                </div>
                <FiArrowRight className="text-pink-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiChevronDown className="text-pink-400 text-xl" />
        </motion.div>
      </motion.div>
    </section>
  );
}
