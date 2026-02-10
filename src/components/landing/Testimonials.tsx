'use client';

import { Avatar } from '@heroui/react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { RiDoubleQuotesL } from 'react-icons/ri';

const testimonials = [
  {
    id: '1',
    name: 'Maria & Juan Santos',
    location: 'Manila',
    rating: 5,
    text: 'Wedding Bazaar made planning our wedding an absolute dream. We found our perfect venue and an incredible photographer within days. The platform is elegant and so easy to use.',
    vendor: '5 vendors booked',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Anna & Miguel Cruz',
    location: 'Cebu',
    rating: 5,
    text: 'We were overwhelmed until we discovered Wedding Bazaar. The vendor reviews are genuine, the comparison tools are invaluable, and our wedding day was flawless.',
    vendor: '8 vendors booked',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'Sarah & David Reyes',
    location: 'Davao',
    rating: 5,
    text: 'The style quiz matched us with vendors who truly understood our vision. Every single one exceeded our expectations. We cannot recommend this platform enough.',
    vendor: '6 vendors booked',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 border border-pink-500/10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-pink-500/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
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
            className="text-pink-400 text-xs uppercase tracking-[0.4em] mb-3 font-medium"
          >
            Love Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-light text-white mb-4"
          >
            What Couples <span className="font-medium text-pink-300">Say</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:border-pink-500/30 transition-all duration-500 relative overflow-hidden">
                {/* Quote Icon */}
                <RiDoubleQuotesL className="absolute top-6 right-6 text-4xl text-pink-500/20" />
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:to-transparent transition-all duration-500 rounded-3xl" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-6 relative">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-pink-400 fill-pink-400 text-sm" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/80 mb-8 leading-relaxed font-light relative">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10 relative">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-500/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <span className="text-[8px] text-white">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-pink-300/60 text-sm">
                      {testimonial.location} · {testimonial.vendor}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-8 border-t border-white/10"
        >
          <div className="text-center">
            <p className="text-2xl font-light text-white">4.9/5</p>
            <p className="text-white/50 text-xs uppercase tracking-wider">Average Rating</p>
          </div>
          <div className="w-px h-8 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-light text-white">2,500+</p>
            <p className="text-white/50 text-xs uppercase tracking-wider">Reviews</p>
          </div>
          <div className="w-px h-8 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-light text-white">98%</p>
            <p className="text-white/50 text-xs uppercase tracking-wider">Would Recommend</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
