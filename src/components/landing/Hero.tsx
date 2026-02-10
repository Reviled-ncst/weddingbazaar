'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiSearch, FiHeart, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-medium mb-8"
          >
            <FiHeart className="text-rose-500" />
            <span>The Philippines&apos; Premier Wedding Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Plan Your Dream{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
              Wedding
            </span>
            <br />
            With Trusted Vendors
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Connect with the best venues, photographers, caterers, and more.
            Compare prices, read reviews, and book your perfect wedding team.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/vendors">
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg"
                startContent={<FiSearch className="text-xl" />}
              >
                Find Vendors
              </Button>
            </Link>
            <Link href="/quiz">
              <Button
                size="lg"
                variant="bordered"
                className="border-rose-500 text-rose-500 hover:bg-rose-50 px-8 py-6 text-lg"
                startContent={<FiCalendar className="text-xl" />}
              >
                Take Style Quiz
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-16"
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">500+</p>
              <p className="text-gray-500 text-sm">Verified Vendors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">2,000+</p>
              <p className="text-gray-500 text-sm">Happy Couples</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">4.9</p>
              <p className="text-gray-500 text-sm">Average Rating</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
