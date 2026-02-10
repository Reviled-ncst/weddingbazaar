'use client';

import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { FiSearch, FiMessageSquare, FiCalendar, FiHeart } from 'react-icons/fi';

const steps = [
  {
    number: '01',
    icon: FiSearch,
    title: 'Browse & Discover',
    description:
      'Explore hundreds of verified vendors across all wedding categories. Filter by location, budget, and style.',
  },
  {
    number: '02',
    icon: FiMessageSquare,
    title: 'Connect & Inquire',
    description:
      'Send inquiries to your favorite vendors, ask questions, and request quotes directly through our platform.',
  },
  {
    number: '03',
    icon: FiCalendar,
    title: 'Compare & Book',
    description:
      'Compare vendors side-by-side, check availability, and book your wedding team with secure payments.',
  },
  {
    number: '04',
    icon: FiHeart,
    title: 'Plan & Celebrate',
    description:
      'Use our planning tools to stay organized and coordinate with your vendors. Then enjoy your perfect day!',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-rose-500 font-medium text-sm uppercase tracking-wider"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Planning your wedding has never been easier. Follow these simple steps to find and book your dream team.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border border-gray-100 hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-rose-100 rounded-xl">
                        <Icon className="text-2xl text-rose-500" />
                      </div>
                      <span className="text-4xl font-bold text-gray-100">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
