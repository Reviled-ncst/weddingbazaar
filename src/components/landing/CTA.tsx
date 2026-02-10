'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBriefcase } from 'react-icons/fi';

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-rose-500 to-amber-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* For Couples */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Planning?
            </h2>
            <p className="text-rose-100 mb-6 text-lg">
              Create your free account and start discovering amazing vendors for your special day.
            </p>
            <Link href="/register?role=couple">
              <Button
                size="lg"
                className="bg-white text-rose-500 hover:bg-rose-50 px-8"
                endContent={<FiArrowRight />}
              >
                Get Started Free
              </Button>
            </Link>
          </motion.div>

          {/* For Vendors */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left md:border-l md:border-white/20 md:pl-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm mb-4">
              <FiBriefcase />
              <span>For Businesses</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Are You a Vendor?
            </h2>
            <p className="text-rose-100 mb-6 text-lg">
              Join our platform and connect with thousands of couples looking for services like yours.
            </p>
            <Link href="/register?role=provider">
              <Button
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-white/10 px-8"
                endContent={<FiArrowRight />}
              >
                List Your Business
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
