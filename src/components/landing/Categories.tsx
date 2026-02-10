'use client';

import Link from 'next/link';
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import {
  FiCamera,
  FiHome,
  FiMusic,
  FiFilm,
  FiStar,
  FiTruck,
  FiGift,
  FiEdit3,
} from 'react-icons/fi';
import { GiFlowerPot, GiCakeSlice, GiDress, GiDiamondRing } from 'react-icons/gi';

const categories = [
  { name: 'Venues', icon: FiHome, color: 'bg-rose-100 text-rose-600', slug: 'venues' },
  { name: 'Photography', icon: FiCamera, color: 'bg-amber-100 text-amber-600', slug: 'photography' },
  { name: 'Videography', icon: FiFilm, color: 'bg-purple-100 text-purple-600', slug: 'videography' },
  { name: 'Catering', icon: GiCakeSlice, color: 'bg-green-100 text-green-600', slug: 'catering' },
  { name: 'Florists', icon: GiFlowerPot, color: 'bg-pink-100 text-pink-600', slug: 'florists' },
  { name: 'Music & DJ', icon: FiMusic, color: 'bg-blue-100 text-blue-600', slug: 'music-entertainment' },
  { name: 'Bridal Wear', icon: GiDress, color: 'bg-indigo-100 text-indigo-600', slug: 'bridal-wear' },
  { name: 'Jewelry', icon: GiDiamondRing, color: 'bg-yellow-100 text-yellow-600', slug: 'jewelry' },
  { name: 'Makeup & Hair', icon: FiStar, color: 'bg-teal-100 text-teal-600', slug: 'makeup-hair' },
  { name: 'Invitations', icon: FiEdit3, color: 'bg-orange-100 text-orange-600', slug: 'invitations' },
  { name: 'Transportation', icon: FiTruck, color: 'bg-gray-100 text-gray-600', slug: 'transportation' },
  { name: 'Favors & Gifts', icon: FiGift, color: 'bg-red-100 text-red-600', slug: 'favors-gifts' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect vendors for every aspect of your wedding day
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.slug} variants={itemVariants}>
                <Link href={`/categories/${category.slug}`}>
                  <Card
                    isPressable
                    className="h-full hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <CardBody className="flex flex-col items-center justify-center p-6 gap-3">
                      <div className={`p-3 rounded-xl ${category.color}`}>
                        <Icon className="text-2xl" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm text-center">
                        {category.name}
                      </span>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="text-rose-500 hover:text-rose-600 font-medium inline-flex items-center gap-2"
          >
            View All Categories
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
