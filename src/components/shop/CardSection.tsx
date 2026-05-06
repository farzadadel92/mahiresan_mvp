// src/components/shop/SectionWithScroll.tsx
'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  origin?: string;
  vendorName: string;
}

interface CardSectionProps {
  title?: string;
  seeAllLink?: string;
  products: Product[];
  className?: string;
  showArrows?: boolean;
  slidesToShow?: number;
}

export default function CardSection({
  title,
  seeAllLink,
  products,
  className = '',
  showArrows = true,
  slidesToShow = 4,
}: CardSectionProps) {
  // Responsive slidesToShow based on screen size
  const getResponsiveSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return Math.min(slidesToShow, 1);
      if (window.innerWidth < 768) return Math.min(slidesToShow, 2);
      if (window.innerWidth < 1024) return Math.min(slidesToShow, 3);
    }
    return slidesToShow;
  };

  const displayCount = typeof window !== 'undefined' ? getResponsiveSlides() : slidesToShow;
  const visibleProducts = products.slice(0, displayCount);

  return (
    <section className={`mt-16 sm:mt-20 md:mt-24 lg:mt-28 mb-16 sm:mb-20 md:mb-24 lg:mb-28 ${className}`}>
      {/* Header */}
      {(title || seeAllLink) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {title && (
            <h2 className="text-stone-900 text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-right">
              {title}
            </h2>
          )}
          {seeAllLink && (
            <Link 
              href={seeAllLink} 
              className="text-blue-600 text-base sm:text-lg md:text-xl hover:text-blue-700 transition-colors"
            >
              مشاهده همه
            </Link>
          )}
        </div>
      )}

      {/* Products Container with Navigation */}
      <div className="relative mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-10">
        {/* Right Button - Previous */}
        {showArrows && (
          <button
            className="hidden sm:flex shrink-0 bg-blue-800 text-white backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 md:p-6 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Previous products"
            onClick={() => {
              // Add scroll functionality here if needed
              console.log('Previous products');
            }}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* Products Grid - Responsive */}
        <div className="flex-1 w-full">
          <div className="grid gap-4 sm:gap-5 md:gap-6" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
          }}>
            {visibleProducts.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  image={product.image}
                  origin={product.origin}
                  vendorName={product.vendorName}
                />
              </div>
            ))}
          </div>

          {/* Mobile Scrollable Container */}
          <div className="sm:hidden overflow-x-auto pb-4 -mx-2 px-2">
            <div className="flex gap-4" style={{ minWidth: '100%' }}>
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="min-w-70 w-70 shrink-0">
                  <ProductCard 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    image={product.image}
                    origin={product.origin}
                    vendorName={product.vendorName}
                  />
                </div>
              ))}
            </div>
            
            {/* Mobile Scroll Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Left Button - Next */}
        {showArrows && (
          <button
            className="hidden sm:flex shrink-0 bg-blue-800 text-white backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 md:p-6 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Next products"
            onClick={() => {
              // Add scroll functionality here if needed
              console.log('Next products');
            }}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        )}
      </div>

      {/* Mobile Navigation Arrows (Bottom) */}
      {showArrows && (
        <div className="flex sm:hidden justify-center gap-4 mt-6">
          <button
            className="bg-blue-800 text-white rounded-lg p-3 hover:bg-blue-700 transition-all duration-300"
            aria-label="Previous products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            className="bg-blue-800 text-white rounded-lg p-3 hover:bg-blue-700 transition-all duration-300"
            aria-label="Next products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}