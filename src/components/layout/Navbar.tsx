'use client';

import { useState, useEffect } from 'react';
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
import { FiHeart, FiUser, FiLogOut, FiSettings, FiGrid, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';

const publicLinks = [
  { name: 'Browse Vendors', href: '/vendors' },
  { name: 'Categories', href: '/categories' },
  { name: 'How It Works', href: '/#how-it-works' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, profile, isAuthenticated, logout, isCouple, isProvider, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isProvider) return '/provider/dashboard';
    if (isCouple) return '/couple/dashboard';
    return '/';
  };

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-xl shadow-black/20 border-b border-white/10' 
          : 'bg-transparent border-b border-transparent'
      }`}
      maxWidth="xl"
    >
      {/* Logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-pink-400"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-105">
              <FiHeart className="text-white text-lg" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white tracking-tight leading-none">
                Wedding<span className="text-pink-400">Bazaar</span>
              </span>
              <span className="text-[10px] text-pink-400/70 uppercase tracking-widest font-medium hidden sm:block">Philippines</span>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-1" justify="center">
        {publicLinks.map((link) => (
          <NavbarItem key={link.href} isActive={pathname === link.href}>
            <Link
              href={link.href}
              className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                pathname === link.href
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                  : 'text-white/80 hover:text-pink-400 hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Auth Section */}
      <NavbarContent justify="end" className="gap-3">
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
            <NavbarItem className="hidden sm:flex">
              <Link href="/login">
                <Button variant="light" className="text-white/80 font-medium hover:text-pink-400 hover:bg-white/5">
                  Log In
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-6 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
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
              className={`w-full block py-3 text-lg font-medium rounded-xl px-4 transition-colors ${
                pathname === link.href 
                  ? 'text-pink-400 bg-pink-500/10' 
                  : 'text-white/80 hover:bg-white/5 hover:text-pink-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {!isAuthenticated && (
          <>
            <NavbarMenuItem className="mt-4">
              <Link
                href="/login"
                className="w-full block py-3 text-lg text-white/70 font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                href="/register"
                className="w-full block py-3 text-lg text-white font-semibold px-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroNavbar>
  );
}
