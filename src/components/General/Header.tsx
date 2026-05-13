// src/components/layout/Header.tsx
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, X, User, ShoppingBag, ChevronLeft } from "lucide-react";
import Image from 'next/image';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: "دسته بندی محصولات", href: "/categories" },
    { name: "فروشگاه", href: "/shop" },
    { name: "ایجاد غرفه", href: "/create-store" },
    { name: "تماس با ما", href: "/contact" },
    { name: "درباره ما", href: "/about" },
    { name: "بلاگ", href: "/blog" },
  ];

  const mobileNavLinks = [
    { name: "دسته بندی محصولات", href: "/categories", icon: "📁" },
    { name: "فروشگاه", href: "/shop", icon: "🛍️" },
    { name: "ایجاد غرفه", href: "/create-store", icon: "🏪" },
    { name: "تماس با ما", href: "/contact", icon: "📞" },
    { name: "درباره ما", href: "/about", icon: "ℹ️" },
    { name: "بلاگ", href: "/blog", icon: "📝" },
  ];

  return (
    <header className={`bg-surface transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Top Bar - Responsive */}
      <div 
        className="flex items-center justify-center h-10 sm:h-12 bg-primary-light bg-cover bg-center px-3 sm:px-4"
        style={{ backgroundImage: "url('/images/header/top-bar-background.png')" }}
      >
        <p className="flex text-text-primary gap-2 sm:gap-3 text-xs sm:text-sm md:text-base items-center">
          <span className="font-bold">تخفیف ویژه</span> 
          <span className="">برای اولین خرید از سایت ماهی‌رسان!</span>
          <Link 
            className="bg-surface rounded-full hover:scale-105 text-text-muted justify-center items-center inline-flex p-0.5 sm:p-1"
            href={"/"}
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
            {/* Logo */}
            <Link href="/" className="block shrink-0">
              <Image
                src="/images/logo/mahiresan_logo.png"
                alt="Logo"
                width={48}
                height={48}
                priority
                className="object-contain w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:block">
              <ul className="flex gap-4 xl:gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center text-text-secondary hover:text-primary font-medium text-sm xl:text-base transition-colors border-b-2 border-transparent hover:border-primary py-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Search Button - Mobile */}
            <button className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Cart - Hidden on mobile, visible on tablet and up */}
            <Link
              href="/cart"
              className="hidden sm:flex relative p-2 text-text-secondary hover:text-primary transition-colors"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-2 -right-2 bg-accent text-text-inverse text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>

            {/* User Login - Hidden on mobile */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 text-text-inverse bg-primary-dark rounded-lg font-normal text-sm md:text-base transition-all hover:bg-primary-hover hover:scale-105"
            >
              <User className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="white" stroke="white" />
              <span className="hidden sm:inline">ورود / ثبت نام</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            style={{ top: 'calc(64px + 40px)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed right-0 bottom-0 w-full max-w-sm bg-surface shadow-xl z-40 overflow-y-auto animate-slideInRight" style={{ top: 'calc(64px + 40px)' }}>
            <div className="p-4 sm:p-5 md:p-6">
              {/* Search Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  className="w-full px-4 py-3 pr-10 border border-border rounded-xl bg-background-alt focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
              </div>

              {/* Navigation Links */}
              <ul className="space-y-1 mb-6">
                {mobileNavLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="font-medium text-sm sm:text-base">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-text-inverse rounded-xl font-medium hover:bg-primary-hover transition-colors text-sm sm:text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  ورود / ثبت نام
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-border text-text-secondary rounded-xl font-medium hover:bg-surface-hover transition-colors text-sm sm:text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  مشاهده سبد خرید
                  <span className="mr-auto bg-accent text-text-inverse text-xs rounded-full px-2 py-0.5">
                    0
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        
        @media (max-width: 480px) {
          .container {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;