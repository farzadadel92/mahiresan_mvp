// src/components/shop/SectionWithScroll.tsx
'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';
import { CardSectionProps } from '@/src/types/ui.types';

export default function CardSection({
  title,
  seeAllLink,
  products,
  className = '',
}: CardSectionProps) {
  return (
    <section className={`relative border-2 p-7 border-gray-200 rounded-xl ${className}`}>
      {/* Half-height background layer - now properly behind content */}
      <div className="absolute rounded-t-xl inset-x-0 top-0 h-1/3 bg-blue-600" style={{ zIndex: 0 }}></div>
      
      {/* Content wrapper with higher z-index */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Header */}
        {(title || seeAllLink) && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-1 mb-6">
            {title && (
              <h3 className="text-white text-2xl sm:text-2xl md:text-2xl font-bold text-center sm:text-right">
                {title}
              </h3>
            )}
            {seeAllLink && (
              <Link 
                href={seeAllLink} 
                className="text-white text-base font-bold sm:text-lg md:text-lg hover:text-gray-200 transition-colors"
              >
                مشاهده همه
              </Link>
            )}
          </div>
        )}

        {/* Products Container - Single row with horizontal scroll */}
        <div className="relative mt-8 sm:mt-10 md:mt-12">
          {/* Horizontal Scroll Container */}
          <div className="w-full overflow-x-auto overflow-y-hidden scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
            <div className="flex gap-2 sm:gap-3 md:gap-0" style={{ width: 'max-content', minWidth: '100%' }}>
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="w-64 sm:w-72 shrink-0"
                >
                  <ProductCard 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    image={product.image}
                    origin={product.origin}
                    vendorName={product.vendorName}
                    city={"بندرعباس"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}