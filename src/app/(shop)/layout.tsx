// src/app/(shop)/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import Header from '@/src/components/General/Header';
import Footer from '@/src/components/General/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'صفحه اصلی', href: '/' },
    { name: 'محصولات', href: '/products' },
    { name: 'میگو', href: '/products?category=shrimp' },
    { name: 'خاویار', href: '/products?category=caviar' },
    { name: 'محصولات مکمل', href: '/products?category=supplements' },
    { name: 'ایجاد غرفه', href: '/vendors/register' },
    { name: 'درباره ما', href: '/about-us' },
    { name: 'تماس با ما', href: '/contact' },
    { name: 'بلاگ', href: '/essays' },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}