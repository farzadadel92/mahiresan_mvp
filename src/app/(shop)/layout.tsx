// src/app/(shop)/layout.tsx
'use client';

import Header from '@/src/components/General/Header';
import Footer from '@/src/components/General/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}