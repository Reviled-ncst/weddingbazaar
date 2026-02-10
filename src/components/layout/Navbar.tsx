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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg shadow-pink-100/20 border-b border-pink-100' 
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
      }`}
      maxWidth="xl"
    >
      {/* Logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-pink-500"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center shadow-md shadow-pink-200/50 group-hover:shadow-lg group-hover:shadow-pink-200/70 transition-all duration-300 group-hover:scale-105">
              <FiHeart className="text-white text-lg" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xl text-gray-900 tracking-tight leading-none">
                Wedding<span className="text-pink-500">Bazaar</span>
              </span>
              <span className="text-[10px] text-pink-400 uppercase tracking-widest font-medium hidden sm:block">Philippines</span>
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
              className={`px-4 py-2 rounded-full text-sm tracking-wide transition-all duration-200 ${
                pathname === link.href
                  ? 'bg-pink-50 text-pink-600 font-medium'
                  : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500 font-medium'
              }`}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Auth Section */}
      <NavbarContent justify="end" className="gap-2">
        {isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-pink-50 transition-colors">
                <Avatar
                  className="ring-2 ring-pink-200"
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
                <p className="font-medium text-gray-500 text-xs">Signed in as</p>
                <p className="font-semibold text-pink-500">
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
                <Button variant="light" className="text-gray-600 font-medium hover:text-pink-500 hover:bg-pink-50">
                  Log In
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-6 shadow-md shadow-pink-200/50 hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-300">
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
              className={`w-full block py-3 text-lg font-medium rounded-xl px-4 transition-colors ${
                pathname === link.href 
                  ? 'text-pink-500 bg-pink-50' 
                  : 'text-gray-700 hover:bg-pink-50 hover:text-pink-500'
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
                className="w-full block py-3 text-lg text-gray-600 font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                href="/register"
                className="w-full block py-3 text-lg text-white font-semibold px-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl text-center"
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
