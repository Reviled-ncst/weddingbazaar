'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import { FiHeart, FiLogOut, FiSettings, FiGrid, FiChevronDown, FiSearch, FiUser } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';

const publicLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Vendors', href: '/vendors' },
  { name: 'Testimonials', href: '/#testimonials' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, profile, isAuthenticated, logout, isCouple, isProvider, isAdmin } = useAuth();

  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isProvider) return '/provider/dashboard';
    if (isCouple) return '/couple/dashboard';
    return '/';
  };

  return (
    <>
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 z-[60]" />
      
      <HeroNavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="fixed top-1.5 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-100"
        maxWidth="xl"
      >
        {/* Logo */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden text-gray-600"
          />
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:shadow-pink-500/40 transition-all duration-300">
                <FiHeart className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 tracking-tight leading-none">
                  Wedding Bazaar
                </span>
                <span className="text-xs text-pink-500 font-medium hidden sm:block">Your Perfect Day Awaits</span>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation - Simple text links */}
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          {publicLinks.map((link) => (
            <NavbarItem key={link.href}>
              <Link
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-pink-500'
                    : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500 rounded-full" />
                )}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Auth Section */}
        <NavbarContent justify="end" className="gap-2">
          {/* Search Icon */}
          <NavbarItem className="hidden sm:flex">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors">
              <FiSearch className="text-lg" />
            </button>
          </NavbarItem>

          {isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex items-center gap-2 px-2 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Avatar
                    className="ring-2 ring-pink-500/30"
                    color="secondary"
                    name={profile?.displayName || user?.email || 'User'}
                    size="sm"
                    src={profile?.photoURL || undefined}
                  />
                  <FiChevronDown className="text-gray-400 text-sm" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu" variant="flat" className="w-56">
                <DropdownItem key="profile" className="h-14 gap-2" textValue="profile">
                  <p className="font-medium text-gray-400 text-xs">Signed in as</p>
                  <p className="font-semibold text-gray-900">
                    {profile?.displayName || user?.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  startContent={<FiGrid className="text-pink-500" />}
                  href={getDashboardLink()}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="favorites"
                  startContent={<FiHeart className="text-pink-500" />}
                  href="/couple/favorites"
                  className={isCouple ? '' : 'hidden'}
                >
                  My Favorites
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<FiSettings className="text-pink-500" />}
                  href={`/${profile?.role || 'couple'}/settings`}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<FiLogOut className="text-lg" />}
                  onPress={logout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              {/* User Icon */}
              <NavbarItem className="hidden sm:flex">
                <Link href="/login">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-colors">
                    <FiUser className="text-lg" />
                  </button>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-6 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="pt-6 bg-white">
          {publicLinks.map((link) => (
            <NavbarMenuItem key={link.href}>
              <Link
                href={link.href}
                className={`block py-3 text-lg font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-pink-500'
                    : 'text-gray-700 hover:text-pink-500'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </NavbarMenuItem>
          ))}
          {!isAuthenticated && (
            <>
              <NavbarMenuItem className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  href="/login"
                  className="block py-3 text-lg text-gray-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="mt-2">
                <Link
                  href="/register"
                  className="block py-3 text-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-pink-600 rounded-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </HeroNavbar>
    </>
  );
}
