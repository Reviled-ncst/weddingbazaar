'use client';

import Link from 'next/link';
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
  FiArrowRight,
} from 'react-icons/fi';
import { GiFlowerPot, GiCakeSlice, GiDress, GiDiamondRing } from 'react-icons/gi';

const categories = [
  { name: 'Venues', icon: FiHome, slug: 'venues', badge: 'Popular', count: 120 },
  { name: 'Photography', icon: FiCamera, slug: 'photography', badge: 'Popular', count: 85 },
  { name: 'Videography', icon: FiFilm, slug: 'videography', count: 42 },
  { name: 'Catering', icon: GiCakeSlice, slug: 'catering', badge: 'Popular', count: 67 },
  { name: 'Florists', icon: GiFlowerPot, slug: 'florists', count: 53 },
  { name: 'Music & DJ', icon: FiMusic, slug: 'music-entertainment', badge: 'New', count: 38 },
  { name: 'Bridal Wear', icon: GiDress, slug: 'bridal-wear', count: 45 },
  { name: 'Jewelry', icon: GiDiamondRing, slug: 'jewelry', count: 29 },
  { name: 'Makeup & Hair', icon: FiStar, slug: 'makeup-hair', badge: 'Popular', count: 71 },
  { name: 'Invitations', icon: FiEdit3, slug: 'invitations', badge: 'New', count: 24 },
  { name: 'Transportation', icon: FiTruck, slug: 'transportation', count: 18 },
  { name: 'Favors & Gifts', icon: FiGift, slug: 'favors-gifts', count: 31 },
];

export function Categories() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pink-400 text-xs uppercase tracking-[0.4em] mb-3 font-medium"
          >
            Explore Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Find Your <span className="text-pink-400">Perfect Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 max-w-md mx-auto"
          >
            Curated vendors for every aspect of your celebration
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <div className="group relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm">
                    {/* Badge */}
                    {category.badge && (
                      <div className={`absolute top-2 right-2 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                        category.badge === 'Popular' 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-emerald-500 text-white'
                      }`}>
                        {category.badge}
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-pink-500/30 transition-all duration-300">
                        <Icon className="text-2xl text-pink-400 group-hover:text-pink-300 transition-colors" />
                      </div>
                      <span className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors mb-1">
                        {category.name}
                      </span>
                      <span className="text-xs text-white/40">
                        {category.count} vendors
                      </span>
                    </div>
                    
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl bg-pink-500/0 group-hover:bg-pink-500/5 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-3 text-white/60 hover:text-pink-400 transition-colors group"
          >
            <span className="text-sm uppercase tracking-wider font-medium">View All Categories</span>
            <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 group-hover:bg-pink-400 transition-all" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
