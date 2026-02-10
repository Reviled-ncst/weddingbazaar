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
import { FiHeart, FiLogOut, FiSettings, FiGrid, FiChevronDown, FiSearch, FiPlay, FiStar, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';

const publicLinks = [
  { name: 'Browse Vendors', subtitle: '12+ categories', href: '/vendors', icon: FiSearch },
  { name: 'Style Quiz', subtitle: 'Find your match', href: '/quiz', icon: FiPlay },
  { name: 'Top Rated', subtitle: 'Verified pros', href: '/top-rated', icon: FiStar, featured: true },
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
      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        {publicLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavbarItem key={link.href}>
              <Link
                href={link.href}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  link.featured
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/10 border border-pink-500/50 hover:border-pink-400'
                    : 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  link.featured
                    ? 'bg-gradient-to-br from-pink-500 to-pink-600'
                    : 'bg-pink-500/20'
                }`}>
                  <Icon className={`text-sm ${link.featured ? 'text-white' : 'text-pink-400'}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white leading-tight">{link.name}</span>
                  <span className="text-[10px] text-white/50">{link.subtitle}</span>
                </div>
                <FiArrowRight className={`text-xs ml-1 transition-transform group-hover:translate-x-0.5 ${
                  link.featured ? 'text-pink-400' : 'text-white/30'
                }`} />
              </Link>
            </NavbarItem>
          );
        })}
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
                <Button variant="light" className="text-white/70 font-medium hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl px-5">
                  Log In
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-5 rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-2">
                  Get Started
                  <FiArrowRight className="text-sm" />
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6 bg-slate-900/98 backdrop-blur-xl">
        {publicLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavbarMenuItem key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-4 py-4 px-4 rounded-xl transition-all ${
                  link.featured
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/10 border border-pink-500/50'
                    : 'bg-white/5 border border-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  link.featured
                    ? 'bg-gradient-to-br from-pink-500 to-pink-600'
                    : 'bg-pink-500/20'
                }`}>
                  <Icon className={`text-base ${link.featured ? 'text-white' : 'text-pink-400'}`} />
                </div>
                <div className="flex-1">
                  <span className="text-base font-medium text-white block">{link.name}</span>
                  <span className="text-xs text-white/50">{link.subtitle}</span>
                </div>
                <FiArrowRight className={`${link.featured ? 'text-pink-400' : 'text-white/30'}`} />
              </Link>
            </NavbarMenuItem>
          );
        })}
        {!isAuthenticated && (
          <>
            <NavbarMenuItem className="mt-6 pt-6 border-t border-white/10">
              <Link
                href="/login"
                className="flex items-center justify-center py-3 text-base text-white/70 font-medium rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="mt-3">
              <Link
                href="/register"
                className="flex items-center justify-center py-3 text-base text-white font-semibold bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg shadow-pink-500/30"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
                <FiArrowRight className="ml-2" />
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroNavbar>
  );
}
