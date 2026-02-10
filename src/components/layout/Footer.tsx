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
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-300 flex items-center justify-center">
                <FiHeart className="text-white text-sm" />
              </div>
              <span className="font-light text-lg text-gray-900 tracking-tight">
                Wedding<span className="font-semibold text-pink-500">Bazaar</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 mb-6 font-light leading-relaxed">
              The Philippines&apos; premier wedding planning platform.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-pink-300 hover:text-pink-500 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* For Couples */}
          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">For Couples</h3>
            <ul className="space-y-3">
              {footerLinks.forCouples.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-pink-500 transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">For Vendors</h3>
            <ul className="space-y-3">
              {footerLinks.forVendors.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-pink-500 transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-pink-500 transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-pink-500 transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-light">
            © {new Date().getFullYear()} Wedding Bazaar. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-light flex items-center gap-1">
            Made with <FiHeart className="text-pink-400 text-xs" /> in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
