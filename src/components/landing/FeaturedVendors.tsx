'use client';

import { motion } from 'framer-motion';
import { FiStar, FiArrowRight, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
import { Button } from '@heroui/react';

const vendors = [
  {
    id: 1,
    name: 'Elegant Events Manila',
    category: 'Event Coordinator',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 127,
    featured: true,
  },
  {
    id: 2,
    name: 'Blooms & Petals',
    category: 'Florist',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    reviews: 89,
    featured: false,
  },
  {
    id: 3,
    name: 'Lens Stories Studio',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 156,
    featured: true,
  },
  {
    id: 4,
    name: 'Grand Pavilion',
    category: 'Venue',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 203,
    featured: false,
  },
];

export function FeaturedVendors() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-60" />

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
            Handpicked For You
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
          >
            Featured <span className="font-medium text-pink-500">Vendors</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto"
          />
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${vendor.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Featured Badge */}
                  {vendor.featured && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-medium">
                      Featured
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-gray-600">
                    <FiHeart className="text-lg" />
                  </button>

                  {/* Category */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white/80 text-xs uppercase tracking-wider">{vendor.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-pink-500 transition-colors duration-300">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-pink-400">
                      <FiStar className="fill-current" />
                      <span className="font-medium text-gray-900">{vendor.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({vendor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/vendors">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-sm font-medium tracking-wider uppercase"
              endContent={<FiArrowRight />}
            >
              View All Vendors
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
