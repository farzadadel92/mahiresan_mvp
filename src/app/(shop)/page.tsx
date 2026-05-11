// src/app/(shop)/page.tsx (main page)
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import CardSection from '@/src/components/shop/CardSection';
import { 
  featuredProducts, 
  freshProducts, 
  bestSellingProducts, 
  blogPosts,
} from '../../mock/shop/data';

// Hero Section Component
const HeroSection = () => {
  return (
    <div>
      <section className="relative border-2 rounded-2xl overflow-hidden h-64 sm:h-86">
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero-desktop.png"
            alt="Background"
            fill
            priority
          />
        </div>
      </section>
      <SearchSection />
    </div>
  );
};

// Search Section Component
const SearchSection = () => {
  return (
    <div className="w-[95%] sm:w-[90%] md:w-4/5 mt-[-42] mx-auto z-0 relative">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <h2 className="text-stone-600 text-md mb-6 md:mb-10">جستجوی پیشرفته</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_2fr_1fr] gap-4">
          <div className="relative text-stone-600">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
              <option value="">استان مبدا صید</option>
              <option value="bushehr">بوشهر</option>
              <option value="bandar-abbas">بندرعباس</option>
              <option value="gilan">گیلان</option>
            </select>
          </div>
          <div className="relative text-stone-600">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
              <option value="">نوع محصول</option>
              <option value="fish">ماهی</option>
              <option value="supplements">محصولات مکمل</option>
              <option value="shrimp">میگو</option>
            </select>
          </div>
          <button className="bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors py-2 px-4 text-sm md:text-base sm:col-span-2 md:col-span-1">
            جستجو
          </button>
        </div>
      </div>
    </div>
  );
};

// Banner Grid Section Component
const BannerGridSection = () => {
  const banners = [
    { src: "/images/home/banner-1.jpg", alt: "Banner 1" },
    { src: "/images/home/banner-2.jpg", alt: "Banner 2" },
    { src: "/images/home/banner-3.jpg", alt: "Banner 3" },
    { src: "/images/home/banner-4.jpg", alt: "Banner 4" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {banners.map((banner, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow aspect-video sm:aspect-auto">
          <Image 
            src={banner.src}
            alt={banner.alt}
            width={600}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-300 w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

// Benefits Section Component
const BenefitsSection = () => {
  return (
    <section className="flex flex-col bg-white rounded-xl p-4 md:p-6 lg:p-8 gap-8 md:gap-10">
      {/* Benefit 1 */}
      {/* <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
        <div className="flex flex-col gap-6 lg:gap-10 text-center lg:text-right">
          <h1 className="text-stone-800 font-bold text-2xl md:text-3xl lg:text-4xl">
            تأمین گسترده از سواحل شمال تا جنوب ایران
          </h1>
          <p className="text-stone-500 text-justify text-base md:text-lg lg:text-xl">
            از دریای خزر تا خلیج فارس و دریای عمان؛ ماهی‌رسان با شبکه‌ای گسترده از تأمین‌کنندگان محلی، محصولات تازه دریایی را مستقیماً از استان‌های ساحلی کشور تهیه کرده و با بسته‌بندی حرفه‌ای، به سراسر ایران ارسال می‌کند
          </p>
        </div>
      </div> */}

      {/* Benefit 2 */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
        <div className="flex flex-col gap-6 lg:gap-10 text-center lg:text-right order-2 lg:order-1">
          <h1 className="text-stone-800 font-bold text-2xl md:text-3xl lg:text-4xl">
            پـیک درون‌شـهــری بــرای مـشــتــریـان سـواحــل ایـران
          </h1>
          <p className="text-stone-500 text-justify text-base md:text-lg lg:text-xl">
            مشتریان عزیز ساکن شهرهای ساحلی می‌توانند محصولات دریایی خود را در سریع‌ترین زمان ممکن، از طریق پیک درون‌شهری دریافت کنند.
          </p>
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            <Image 
              src="/images/home/take-away-cities.png" 
              alt="take away cities"
              width={900}
              height={1000}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2 w-full lg:w-auto">
          <Image 
            src="/images/home/take-away.png" 
            alt="take away"
            width={900}
            height={1000}
            className="object-cover hover:scale-105 transition-transform duration-300 w-full h-auto"
          />
        </div>
      </div>
      
      {/* Benefit 3 */}
      <div className="mx-auto w-full">
        <Image 
          src="/images/home/our-job.png" 
          alt="our job"
          width={1500}
          height={600}
          className="object-cover w-full h-auto"
        />
      </div>
    </section>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  // FAQ items data
  const faqItems = [
    {
      question: "آیا امکان ارسال به تمام نقاط ایران وجود دارد؟",
      answer: "بله، ما به تمام نقاط ایران ارسال داریم."
    },
    {
      question: "چگونه مطمئن شویم محصول تازه است؟",
      answer: "تمام محصولات ما مستقیماً از دریا صید و در سریعترین زمان ممکن ارسال می‌شوند."
    },
    {
      question: "آیا محصولات منجمد شده نیز وجود دارد؟",
      answer: "بله، ما هم محصولات تازه و هم محصولات منجمد با کیفیت را عرضه می‌کنیم."
    },
    {
      question: "آیا امکان خرید فیله‌شده وجود دارد؟",
      answer: "بله، می‌توانید در سفارش خود درخواست فیله کردن ماهی را ثبت کنید."
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 text-center mb-6 md:mb-8">
        <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-1">سوالات متداول</h3>
        <p className="text-blue-800 text-xs md:text-sm">پاسخ به رایج ترین پرسش‌های شما</p>
      </div>

      <div className="space-y-3 md:space-y-4 px-2 md:px-0">
        {faqItems.map((item, index) => (
          <div key={index} className="w-full max-w-5xl mx-auto">
            <button
              className={`flex justify-between rounded-xl bg-gray-100 border-2 items-center w-full text-right p-4 md:p-5 transition-all duration-300 ${
                openIndex === index 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                openIndex === index ? 'text-blue-700' : 'text-gray-800'
              }`}>
                {item.question}
              </span>
              <span className={`text-gray-500 text-xl font-medium ml-3 transition-all duration-300 ${
                openIndex === index ? 'rotate-180 text-blue-600' : ''
              }`}>
                <ChevronDown />
              </span>
            </button>
            
            {/* Expandable Answer Section with Animation */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 md:p-5 bg-gray-50 rounded-xl text-gray-600 text-sm md:text-base border-r-4 border-blue-400">
                {item.answer || 'پاسخ این سوال به زودی اضافه خواهد شد'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Blog Section Component
const BlogSection = () => {
  return (
    <section className="">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-stone-700 text-xl md:text-2xl font-bold">آخرین مقالات</h2>
        <Link href="/essays" className="text-blue-600 hover:text-blue-700 text-sm md:text-base">
          مشاهده همه
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-200">
              <Image
                src={post.image || "/images/blog/blog-image.png"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 md:gap-4 p-4">
              <div className="text-gray-500 text-xs md:text-sm">{post.date}</div>
              <h3 className="text-stone-700 text-lg md:text-xl font-bold line-clamp-2">{post.title}</h3>
              <p className="text-gray-400 text-sm md:text-base line-clamp-3">
                {"امگا-۳، اسید چرب ضروری برای سلامتی قلب و مغز، یکی از مواد مغذی کلیدی است که بدن ما نمی‌تواند آن را تولید کند. ماهی‌های تازه، به‌ویژه از جنوب ایران، سرشار از این ماده هستند. اما آیا مکمل‌های امگا-۳ می‌توانند جایگزین ماهی شوند؟ در این مقاله، فواید امگا-۳ را بررسی کرده و آن را در ماهی و مکمل‌ها مقایسه می‌کنیم تا بهترین گزینه را برای شما پیدا کنیم"}
              </p>
              <Link href={`/essays/${post.slug}`} className="text-blue-600 text-sm md:text-base hover:text-blue-700 transition-colors">
                ادامه مطلب →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Support Section Component
const SupportSection = () => {
  return (
    <section className="">
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <Image 
          src="/images/home/support-banner.png" 
          alt="Support Banner"
          width={1300}
          height={400}
          className="object-cover w-full h-auto"
        />
      </div>
    </section>
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 hover:scale-110"
      aria-label="بازگشت به بالا"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
};

// Main Home Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <main className="flex flex-col gap-30 container mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6 lg:py-8">
        <HeroSection />
        
        <div className="flex gap-4 items-center container mx-auto px-4 overflow-hidden w-full">
          {/* Image container - increased width */}
          <div className="w-1/3 shrink-0">  {/* Changed from w-1/4 to w-1/3 */}
            <Image
              src="/images/home/discount.png"
              alt="Background"
              height={600}
              width={600}
              className="w-full h-full rounded-lg object-cover"
              priority
            />
          </div>
          
          {/* CardSection container */}
          <div className="flex-1 min-w-0 overflow-hidden h-full">
            <div className="h-full origin-top-left">
              <CardSection
                title="تخفیفات ویژه"
                seeAllLink="/products?discount=true"
                products={featuredProducts}
                showArrows={true}
                slidesToShow={4}
              />
            </div>
          </div>
        </div>

        <CardSection
          title="محصولات تازه امروز"
          seeAllLink="/products?discount=true"
          products={freshProducts}
          showArrows={true}
          slidesToShow={4}
        />

        <BannerGridSection />

        <CardSection
          title="محصولات پرفروش"
          seeAllLink="/products?sort=bestselling"
          products={bestSellingProducts}
          showArrows={true}
          slidesToShow={4}
        />

        <BenefitsSection />
        <FAQSection />
        <BlogSection />
        <SupportSection />
      </main>

      <BackToTopButton />
    </div>
  );
}
