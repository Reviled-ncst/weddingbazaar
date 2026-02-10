'use client';

import { Card, CardBody, Avatar } from '@heroui/react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

// Static testimonials - in production, these would come from Firestore
const testimonials = [
  {
    id: '1',
    name: 'Maria & Juan',
    location: 'Manila',
    avatar: '/testimonials/couple1.jpg',
    rating: 5,
    text: 'Wedding Bazaar made planning our wedding so much easier! We found our dream venue and photographer within a week. The comparison tool was incredibly helpful.',
    vendor: 'Booked 5 vendors',
  },
  {
    id: '2',
    name: 'Anna & Miguel',
    location: 'Cebu',
    avatar: '/testimonials/couple2.jpg',
    rating: 5,
    text: 'We were overwhelmed with wedding planning until we discovered this platform. The vendor reviews are genuine, and the booking process is seamless.',
    vendor: 'Booked 8 vendors',
  },
  {
    id: '3',
    name: 'Sarah & David',
    location: 'Davao',
    avatar: '/testimonials/couple3.jpg',
    rating: 5,
    text: 'The style quiz helped us narrow down exactly what we wanted. Every vendor we booked through Wedding Bazaar exceeded our expectations!',
    vendor: 'Booked 6 vendors',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-rose-500 font-medium text-sm uppercase tracking-wider"
          >
            Love Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4"
          >
            What Couples Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of happy couples who found their perfect wedding vendors
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <CardBody className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={testimonial.name}
                      size="md"
                      className="bg-rose-100 text-rose-600"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location} • {testimonial.vendor}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
