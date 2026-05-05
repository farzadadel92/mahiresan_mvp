import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, User, ShoppingBag, ChevronDown } from "lucide-react";
import Image from 'next/image';
import BagIcon from "@/public/icons/BagIcon";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-center h-14 w-full bg-blue-100">
        <p className="text-black">
          <span className="font-bold">تخفیف ویژه</span> برای اولین خرید از سایت ماهی‌رسان!
        </p>
      </div>

      <div className="container p-3 mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/images/logo/mahiresan_logo.png"
                alt="Logo"
                width={64}
                height={64}
                priority
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors border-b-2 border-transparent hover:border-blue-600 py-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="hidden sm:flex relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BagIcon hasBackground={true} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Login */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-5 py-3 text-white bg-blue-800 rounded-lg font-normal transition-colors"
            >
              <User className="w-6 h-6" fill="white" stroke="white" />
              <span>ورود / ثبت نام</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 top-[72px]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed right-0 top-[72px] bottom-0 w-full max-w-sm bg-white shadow-xl z-40 overflow-y-auto animate-slideInRight">
            <div className="p-5">
              {/* Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              {/* Navigation Links */}
              <ul className="space-y-1 mb-6">
                {mobileNavLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  ورود / ثبت نام
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  سبد خرید
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
      `}</style>
    </header>
  );
};

export default Header;