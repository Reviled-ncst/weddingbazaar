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
import { useAuthModal } from '@/context/AuthModalContext';

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
  const { openLogin, openRegister } = useAuthModal();

  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isProvider) return '/provider/dashboard';
    if (isCouple) return '/couple/dashboard';
    return '/';
  };

  return (
    <>
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 z-[60]" />
      
      <HeroNavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="fixed top-2 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 h-20"
        maxWidth="xl"
        height="5rem"
      >
        {/* Logo */}
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden text-pink-400"
          />
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-105">
                <FiHeart className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight leading-none">
                  Wedding Bazaar
                </span>
                <span className="text-xs text-pink-400 font-medium hidden sm:block">Your Perfect Day Awaits</span>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation - Dark container for contrast */}
        <NavbarContent className="hidden sm:flex" justify="center">
          <div className="flex items-center gap-1 bg-slate-800/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg shadow-black/20 border border-slate-700/50">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-white bg-pink-500 shadow-md shadow-pink-500/30'
                    : 'text-white/70 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </NavbarContent>

        {/* Auth Section */}
        <NavbarContent justify="end" className="gap-3">
          {/* Search Icon */}
          <NavbarItem className="hidden sm:flex">
            <button className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-pink-400 hover:bg-white/10 transition-colors">
              <FiSearch className="text-xl" />
            </button>
          </NavbarItem>

          {isAuthenticated ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-colors">
                  <Avatar
                    className="ring-2 ring-pink-500/50"
                    color="secondary"
                    name={profile?.displayName || user?.email || 'User'}
                    size="sm"
                    src={profile?.photoURL || undefined}
                  />
                  <FiChevronDown className="text-white/60 text-sm" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu" variant="flat" className="w-56 bg-slate-800 border border-white/10">
                <DropdownItem key="profile" className="h-14 gap-2" textValue="profile">
                  <p className="font-medium text-white/50 text-xs">Signed in as</p>
                  <p className="font-semibold text-pink-400">
                    {profile?.displayName || user?.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard"
                  startContent={<FiGrid className="text-pink-400" />}
                  href={getDashboardLink()}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="favorites"
                  startContent={<FiHeart className="text-pink-400" />}
                  href="/couple/favorites"
                  className={isCouple ? '' : 'hidden'}
                >
                  My Favorites
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<FiSettings className="text-pink-400" />}
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
                <button 
                  onClick={openLogin}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-pink-400 hover:bg-white/10 transition-colors"
                >
                  <FiUser className="text-xl" />
                </button>
              </NavbarItem>
              <NavbarItem>
                <Button 
                  onPress={openRegister}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-7 py-2.5 text-base rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
                >
                  Get Started
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="pt-6 bg-slate-900">
          {publicLinks.map((link) => (
            <NavbarMenuItem key={link.href}>
              <Link
                href={link.href}
                className={`block py-3 text-lg font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-pink-400'
                    : 'text-white/80 hover:text-pink-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </NavbarMenuItem>
          ))}
          {!isAuthenticated && (
            <>
              <NavbarMenuItem className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openLogin();
                  }}
                  className="w-full block py-3 text-lg text-white/70 font-medium text-left"
                >
                  Log In
                </button>
              </NavbarMenuItem>
              <NavbarMenuItem className="mt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openRegister();
                  }}
                  className="w-full block py-3 text-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-pink-600 rounded-full text-center"
                >
                  Get Started
                </button>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </HeroNavbar>
    </>
  );
}
