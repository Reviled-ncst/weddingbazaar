'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiSearch, FiPlay, FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-pink-900/10" />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-20 w-64 h-64 border border-white/10 rounded-full hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-40 right-40 w-32 h-32 border border-pink-300/20 rounded-full hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="absolute bottom-40 right-32 w-48 h-48 border border-white/10 rounded-full hidden lg:block"
      />

      {/* Side Accent Bar */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 200 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-[1px] bg-gradient-to-b from-transparent via-pink-300/50 to-transparent hidden lg:block"
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            {/* Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-[1px] bg-gradient-to-r from-pink-400 to-transparent mb-8"
            />

            {/* Small Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-pink-200/80 text-xs uppercase tracking-[0.4em] mb-6 font-light"
            >
              The Philippines&apos; Premier Wedding Platform
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extralight text-white mb-8 leading-[1.05] tracking-tight"
            >
              Your Dream
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-medium bg-gradient-to-r from-pink-200 via-pink-100 to-white bg-clip-text text-transparent"
              >
                Wedding
              </motion.span>
              <br />
              <span className="text-white/90">Starts Here</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-white/60 mb-12 max-w-md font-light leading-relaxed tracking-wide"
            >
              Discover and book the finest wedding vendors. From breathtaking venues 
              to world-class photographers, we connect you with excellence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/vendors">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-pink-50 px-10 py-7 text-sm font-medium tracking-widest uppercase"
                  startContent={<FiSearch className="text-base" />}
                >
                  Explore
                </Button>
              </Link>
              <Link href="/quiz">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-white/30 text-white hover:bg-white/5 px-10 py-7 text-sm font-light tracking-widest uppercase backdrop-blur-sm"
                  startContent={<FiPlay className="text-base" />}
                >
                  Style Quiz
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="hidden lg:flex flex-col gap-6 items-end"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-xs">
              <p className="text-5xl font-light text-white mb-2">500+</p>
              <p className="text-white/50 text-xs uppercase tracking-[0.2em]">Verified Vendors</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-xs mr-12">
              <p className="text-5xl font-light text-white mb-2">2,000+</p>
              <p className="text-white/50 text-xs uppercase tracking-[0.2em]">Happy Couples</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-xs">
              <p className="text-5xl font-light text-white mb-2">4.9</p>
              <p className="text-white/50 text-xs uppercase tracking-[0.2em]">Average Rating</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiChevronDown className="text-white/40 text-xl" />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300/30 to-transparent" />
    </section>
  );
}
