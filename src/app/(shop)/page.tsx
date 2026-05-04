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

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="h-96 relative bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg-desktop.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

// Category Card Component
interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

const CategoryCard = ({ title, description, image, href }: CategoryCardProps) => {
  return (
    <Link href={href} className="block group">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow">
        <div className="aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

// Product Card Component
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  origin?: string;
}

const ProductCard = ({ id, name, price, originalPrice, discount, image, origin }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
            {discount}%
          </div>
        )}
        {origin && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
            {origin}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
        
        <div className="flex items-baseline justify-between mt-2">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(originalPrice)} تومان
              </span>
            )}
            <span className="text-blue-600 font-bold text-lg">
              {formatPrice(price)} تومان
            </span>
          </div>
          
          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            خرید
          </button>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="text-center p-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Main Home Page Component
export default function HomePage() {
  // Sample data - replace with API calls later
  const categories = [
    {
      title: "ماهی تازه، آماده برای پخت",
      description: "از ماهی سفید شمالی تا سنگسر جنوبی",
      image: "/images/categories/fresh-fish.jpg",
      href: "/products?category=fish"
    },
    {
      title: "خاویار درج یک، با استاندارد صادرات",
      description: "کیفیت ممتاز، بسته‌بندی استاندارد",
      image: "/images/categories/caviar.jpg",
      href: "/products?category=caviar"
    },
    {
      title: "مواد اولیه و محصولات مکمل دریایی",
      description: "انتخابی کامل برای آشپزی روزمره",
      image: "/images/categories/supplements.jpg",
      href: "/products?category=supplements"
    },
    {
      title: "میگو تازه جنوب، مستقیم از دریا",
      description: "میگو درشت صید خلیج فارس و دریای عمان",
      image: "/images/categories/shrimp.jpg",
      href: "/products?category=shrimp"
    }
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "ماهی هامور سفید (صادراتی)",
      price: 730000,
      originalPrice: 855000,
      discount: 14,
      image: "/images/products/hamoor-mahi.jpg",
      origin: "خلیج فارس"
    },
    {
      id: "2",
      name: "ماهی هامور سفید (صادراتی)",
      price: 730000,
      originalPrice: 855000,
      discount: 14,
      image: "/images/products/hamoor-mahi-2.jpg",
      origin: "دریای عمان"
    }
  ];

  const freshProducts = [
    {
      id: "3",
      name: "ماهی هامور سفید (صادراتی)",
      price: 730000,
      image: "/images/products/hamoor-mahi-3.jpg",
      origin: "بندرعباس"
    },
    {
      id: "4",
      name: "ماهی هامور سفید (صادراتی)",
      price: 730000,
      image: "/images/products/hamoor-mahi-4.jpg",
      origin: "قشم"
    }
  ];

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "ارسال سراسری به کشور",
      description: "تحویل به موقع و سریع"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "بسته‌بندی بهداشتی",
      description: "حفظ و ماندگاری محصول تازه"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "صید تازه، هر روز",
      description: "تأمین مستقیم از سه دریا"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "پشتیبانی همیشگی",
      description: "پاسخ‌گوی سوالات شما"
    }
  ];

  const cities = [
    "چابهار", "گرگان", "بندرانزلی", "بندرعباس", 
    "رشت", "بوشهر", "قشم", "اهواز"
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Search Section */}
        <div className="mt-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-xl font-bold mb-4">جستجوی پیشرفته</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="نام محصول"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">استان مبدا صید</option>
                  <option value="bushehr">بوشهر</option>
                  <option value="bandar-abbas">بندرعباس</option>
                  <option value="gilan">گیلان</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                جستجو
              </button>
            </div>
          </div>
        </div>

        {/* Special Discounts Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">تخفیفات ویژه</h2>
            <Link href="/products?discount=true" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">دسته‌بندی محصولات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </section>

        {/* Fresh Products Today */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">محصولات تازه امروز</h2>
            <Link href="/products?sort=newest" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freshProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl p-6 flex flex-col justify-center text-white">
              <h3 className="text-xl font-bold mb-2">میگو تازه جنوب</h3>
              <p className="mb-4">مستقیم از دریای عمان</p>
              <Link href="/products?category=shrimp" className="text-white underline">
                مشاهده انواع میگو →
              </Link>
            </div>
          </div>
        </section>

        {/* Best Selling Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">محصولات پرفروش</h2>
            <Link href="/products?sort=bestselling" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12 bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-8">مزایای سفره‌شما</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>تأمین مستقیم از سه دریا: خلیج فارس، سواحل مکران، خزر</p>
          </div>
        </section>

        {/* Cities Section */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold mb-3">ارسال به سراسر ایران</h3>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span key={city} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">سوالات متداول</h3>
            <div className="space-y-3">
              <div className="border-b pb-3">
                <button className="flex justify-between items-center w-full text-right font-semibold">
                  آیا امکان ارسال به تمام نقاط ایران وجود دارد؟
                  <span className="text-blue-600">+</span>
                </button>
              </div>
              <div className="border-b pb-3">
                <button className="flex justify-between items-center w-full text-right font-semibold">
                  چگونه مطمئن شویم محصول تازه است؟
                  <span className="text-blue-600">+</span>
                </button>
              </div>
              <div className="border-b pb-3">
                <button className="flex justify-between items-center w-full text-right font-semibold">
                  آیا محصولات منجمد شده نیز وجود دارد؟
                  <span className="text-blue-600">+</span>
                </button>
              </div>
              <div className="border-b pb-3">
                <button className="flex justify-between items-center w-full text-right font-semibold">
                  آیا امکان خرید فیله‌شده وجود دارد؟
                  <span className="text-blue-600">+</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">آخرین مقالات</h2>
            <Link href="/essays" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="aspect-video relative bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    تصویر مقاله
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-gray-500 text-sm mb-2">۱۴۰۳/۰۹/۱۲</div>
                  <h3 className="font-bold mb-2">بهترین انتخاب</h3>
                  <Link href={`/essays/sample-${item}`} className="text-blue-600 text-sm">
                    ادامه مطلب →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-6 md:p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">پشتیبانی همیشگی، همراه شماست</h3>
            <p className="mb-6">پاسخ‌گوی سوالات و نیازهای شماست.</p>
            <Link 
              href="/contact"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              تماس با پشتیبانی
            </Link>
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