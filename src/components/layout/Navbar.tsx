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
import { FiHeart, FiUser, FiLogOut, FiSettings, FiGrid } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';

const publicLinks = [
  { name: 'Browse Vendors', href: '/vendors' },
  { name: 'Categories', href: '/categories' },
  { name: 'How It Works', href: '/#how-it-works' },
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
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/95 backdrop-blur-md border-b border-pink-100/50 shadow-sm"
      maxWidth="xl"
    >
      {/* Logo */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-gray-700"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-300 flex items-center justify-center">
              <FiHeart className="text-white text-sm" />
            </div>
            <span className="font-light text-xl text-gray-900 tracking-tight">
              Wedding<span className="font-semibold text-pink-500">Bazaar</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {publicLinks.map((link) => (
          <NavbarItem key={link.href} isActive={pathname === link.href}>
            <Link
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === link.href
                  ? 'text-pink-500 font-medium'
                  : 'text-gray-600 hover:text-pink-500 font-light'
              }`}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Auth Section */}
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name={profile?.displayName || user?.email || 'User'}
                size="sm"
                src={profile?.photoURL || undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="profile">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-rose-500">
                  {profile?.displayName || user?.email}
                </p>
              </DropdownItem>
              <DropdownItem
                key="dashboard"
                startContent={<FiGrid className="text-lg" />}
                href={getDashboardLink()}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem
                key="favorites"
                startContent={<FiHeart className="text-lg" />}
                href="/couple/favorites"
                className={isCouple ? '' : 'hidden'}
              >
                My Favorites
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<FiSettings className="text-lg" />}
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
                <Button variant="light" className="text-gray-600 font-light">
                  Log In
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6">
                  Get Started
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6">
        {publicLinks.map((link) => (
          <NavbarMenuItem key={link.href}>
            <Link
              href={link.href}
              className={`w-full text-lg ${
                pathname === link.href ? 'text-rose-500' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {!isAuthenticated && (
          <>
            <NavbarMenuItem>
              <Link
                href="/login"
                className="w-full text-lg text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                href="/register"
                className="w-full text-lg text-rose-500 font-semibold"
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
