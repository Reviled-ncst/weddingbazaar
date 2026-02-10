'use client';

import Link from 'next/link';
import { FiHeart, FiFacebook, FiInstagram, FiTwitter, FiMail } from 'react-icons/fi';

const footerLinks = {
  forCouples: [
    { name: 'Find Vendors', href: '/vendors' },
    { name: 'Wedding Checklist', href: '/couple/checklist' },
    { name: 'Budget Planner', href: '/couple/budget' },
    { name: 'Style Quiz', href: '/quiz' },
  ],
  forVendors: [
    { name: 'List Your Business', href: '/register?role=provider' },
    { name: 'Vendor Dashboard', href: '/provider/dashboard' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Success Stories', href: '/vendor-success' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: FiFacebook, href: 'https://facebook.com/weddingbazaarph' },
  { name: 'Instagram', icon: FiInstagram, href: 'https://instagram.com/weddingbazaarph' },
  { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/weddingbazaarph' },
  { name: 'Email', icon: FiMail, href: 'mailto:hello@weddingbazaar.ph' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <FiHeart className="text-rose-500 text-2xl" />
              <span className="font-bold text-xl text-white">
                Wedding<span className="text-rose-500">Bazaar</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              The Philippines&apos; premier wedding planning platform connecting couples with trusted vendors.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-rose-500 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* For Couples */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Couples</h3>
            <ul className="space-y-2">
              {footerLinks.forCouples.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-rose-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Vendors</h3>
            <ul className="space-y-2">
              {footerLinks.forVendors.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-rose-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-rose-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-rose-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Wedding Bazaar. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <FiHeart className="text-rose-500" /> in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
