'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '/homepage' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/product-collection' },
    { label: 'Mini Game', href: '/minigame' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card shadow-md ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
            <div className="relative h-10 w-10">
              <img
                src="/assets/images/logo.png"
                alt="PineSmile Logo"
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <span className="font-heading font-bold text-xl text-primary">
              PineSmile
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-heading font-medium text-base text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/product-collection"
              className="px-6 py-2.5 bg-tropical-orange text-white font-heading font-semibold rounded-full hover:shadow-organic-hover transition-all duration-300 hover:scale-105"
            >
              Try Risk-Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
              className="text-foreground"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-card">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading font-medium text-base text-foreground hover:text-primary transition-colors duration-300 px-4 py-2 hover:bg-muted rounded-md"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link
                  href="/product-collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-2.5 bg-tropical-orange text-white font-heading font-semibold rounded-full hover:shadow-organic-hover transition-all duration-300"
                >
                  Try Risk-Free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;