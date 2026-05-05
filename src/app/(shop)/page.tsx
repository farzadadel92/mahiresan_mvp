// src/app/(shop)/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  ChevronLeft, 
  Star, 
  Truck, 
  Package, 
  Droplet,
  Headphones,
  ArrowUp
} from 'lucide-react';
import CardSection from '@/src/components/shop/CardSection';
import ProductCard from '@/src/components/shop/ProductCard';
import { 
  categories, 
  featuredProducts, 
  freshProducts, 
  bestSellingProducts, 
  features, 
  cities, 
  faqItems, 
  blogPosts 
} from './mock/data';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="h-96 relative bg-linear-to-r from-blue-600 to-teal-500 rounded-2xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg-desktop.png"
          alt="Background"
          fill
          priority
        />
      </div>
    </section>
  );
};


// Feature Card Component
interface FeatureCardProps {
  iconName: string;
  title: string;
  description: string;
}

const FeatureCard = ({ iconName, title, description }: FeatureCardProps) => {
  const getIcon = () => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-8 h-8" />;
      case 'Package':
        return <Package className="w-8 h-8" />;
      case 'Droplet':
        return <Droplet className="w-8 h-8" />;
      case 'Headphones':
        return <Headphones className="w-8 h-8" />;
      default:
        return <Package className="w-8 h-8" />;
    }
  };

  return (
    <div className="text-center p-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600">
        {getIcon()}
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Main Home Page Component
export default function HomePage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Search Section */}
        <div className="w-4/5 mt-[-42] mb-12 mx-auto z-0 relative">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-stone-600 text-md mb-10">جستجوی پیشرفته</h2>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4">
              <div className="relative text-stone-600">
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">استان مبدا صید</option>
                  <option value="bushehr">بوشهر</option>
                  <option value="bandar-abbas">بندرعباس</option>
                  <option value="gilan">گیلان</option>
                </select>
              </div>
              <div className="relative text-stone-600">
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">نوع محصول</option>
                  <option value="bushehr">ماهی</option>
                  <option value="bandar-abbas">محصولات مکمل</option>
                  <option value="gilan">میگو</option>
                </select>
              </div>
              <button className="bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors">
                جستجو
              </button>
            </div>
          </div>
        </div>

        {/* Special Discounts Section - Using CardSection */}
        <CardSection
          title="تخفیفات ویژه"
          seeAllLink="/products?discount=true"
          products={featuredProducts}
          showArrows={true}
          slidesToShow={4}
        />

        {/* Fresh Products Today - Using CardSection with custom styling for the banner */}
        <CardSection
          title="محصولات تازه امروز"
          seeAllLink="/products?discount=true"
          products={freshProducts}
          showArrows={true}
          slidesToShow={4}
        />

        {/* Product Banner section */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Image 
              src="/images/home/banner-1.jpg" 
              alt="Banner 1"
              width={600}
              height={400}
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Image 
              src="/images/home/banner-2.jpg" 
              alt="Banner 2"
              width={600}
              height={400}
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Image 
              src="/images/home/banner-3.jpg" 
              alt="Banner 3"
              width={600}
              height={400}
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Image 
              src="/images/home/banner-4.jpg" 
              alt="Banner 4"
              width={600}
              height={400}
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Best Selling Section - Using CardSection */}
        <CardSection
          title="محصولات پرفروش"
          seeAllLink="/products?sort=bestselling"
          products={bestSellingProducts}
          showArrows={true}
          slidesToShow={4}
        />

        {/* Benefits Section */}
        <section className="flex flex-col mb-12 bg-white rounded-xl p-6 md:p-8 gap-10">
          {/* one */}
          <div className='flex gap-20 items-center'>
            {/* map Image */}
            <div>
              <Image 
                src="/images/home/map.png" 
                alt="iran map"
                width={1800}
                height={1000}
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* text */}
            <div className='flex flex-col gap-10'>
              <h1 className="text-stone-800 font-bold text-3xl">تأمین گسترده از سواحل شمال تا جنوب ایران</h1>
              <p className="text-stone-500 text-justify text-xl">از دریای خزر تا خلیج فارس و دریای عمان؛ ماهی‌رسان با شبکه‌ای گسترده از تأمین‌کنندگان محلی، محصولات تازه دریایی را مستقیماً از استان‌های ساحلی کشور تهیه کرده و با بسته‌بندی حرفه‌ای، به سراسر ایران ارسال می‌کند</p>
            </div>
          </div>

          {/* two */}
           <div className='flex gap-20 items-center'>
            {/* text */}
            <div className='flex flex-col gap-10'>
              <h1 className="text-stone-800 font-bold text-3xl">پـیک درون‌شـهــری بــرای مـشــتــریـان سـواحــل ایـران</h1>
              <p className="text-stone-500 text-justify text-xl">مشتریان عزیز ساکن شهرهای ساحلی می‌توانند محصولات دریایی خود را در سریع‌ترین زمان ممکن، از طریق پیک درون‌شهری دریافت کنند.</p>
              <Image 
                src="/images/home/take-away-cities.png" 
                alt="take away"
                width={900}
                height={1000}
                className="object-cover"
              />
            </div>

            {/* Image */}
            <div>
              <Image 
                src="/images/home/take-away.png" 
                alt="take away"
                width={900}
                height={1000}
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* three */}
          <div className='mx-auto'>
            <Image 
                src="/images/home/our-job.png" 
                alt="take away"
                width={1500}
                height={600}
                className="object-cover"
              />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="flex flex-col gap-4 mb-20">
          {/* Centered Header */}
          <div className="flex flex-col gap-4 text-center mb-8">
            <h3 className="font-bold text-2xl text-gray-900 mb-1">سوالات متداول</h3>
            <p className="text-blue-800 text-sm">پاسخ به رایج ترین پرسش‌های شما</p>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index}>
                <button
                  className="flex justify-between mx-auto rounded-xl bg-gray-100 border-2 border-gray-200 items-center w-4/5 text-right p-5 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                  }}
                >
                  <span className="font-semibold text-gray-800">{item.question}</span>
                  <span className="text-gray-500 text-xl font-medium ml-3">+</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-stone-700 text-2xl font-bold">آخرین مقالات</h2>
            <Link href="/essays" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="aspect-video relative bg-gray-200">
                  <Image
                    src={"/images/blog/blog-image.png"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <div className="text-gray-500 text-sm mb-2">{post.date}</div>
                  <h3 className="text-stone-700 text-xl font-bold mb-2">فواید امگا ۳ در ماهی: مقایسه با مکمل‌ها و بهترین انتخاب</h3>
                  <p className="text-gray-400 line-clamp-2">
                    امگا-۳، اسید چرب ضروری برای سلامتی قلب و مغز، یکی از مواد مغذی کلیدی است که بدن ما نمی‌تواند آن را تولید کند. ماهی‌های تازه، به‌ویژه از جنوب ایران، سرشار از این ماده هستند. اما آیا مکمل‌های امگا-۳ می‌توانند جایگزین ماهی شوند؟ در این مقاله، فواید امگا-۳ را بررسی کرده و آن را در ماهی و مکمل‌ها مقایسه می‌کنیم تا بهترین گزینه را برای شما پیدا کنیم
                  </p>
                  <Link href={`/essays/${post.slug}`} className="text-blue-600 text-sm">
                    ادامه مطلب →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Image 
              src="/images/home/support-banner.png" 
              alt="Banner 1"
              width={1300}
              height={400}
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </section>
      </main>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="بازگشت به بالا"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}