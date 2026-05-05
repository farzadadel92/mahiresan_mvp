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
  // Display only up to slidesToShow products
  const visibleProducts = products.slice(0, slidesToShow);

  return (
    <section className={`mt-28 mb-28 ${className}`}>
      {/* Header */}
      {(title || seeAllLink) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h2 className="text-stone-900 text-4xl font-bold">{title}</h2>}
          {seeAllLink && (
            <Link href={seeAllLink} className="text-blue-600 text-xl hover:text-blue-700">
              مشاهده همه
            </Link>
          )}
        </div>
      )}

      {/* Products Container with Navigation (Static Design) */}
      <div className="relative mt-12 flex items-center gap-10">
        {/* Right Button - Design Only */}
        {showArrows && (
          <button
            className="shrink-0 bg-blue-800 text-white text-lg font-bold backdrop-blur-sm rounded-lg shadow-lg p-6 hover:text-blue-600 hover:shadow-xl transition-all hover:bg-white cursor-default"
            aria-label="Previous products"
            disabled
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Products Grid */}
        <div className="flex-1 grid gap-6" style={{ 
          gridTemplateColumns: `repeat(${slidesToShow}, 1fr)`
        }}>
          {visibleProducts.map((product) => (
            <div key={product.id} className="product-card">
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

        {/* Left Button - Design Only */}
        {showArrows && (
          <button
            className="shrink-0 bg-blue-800 text-white text-lg font-bold backdrop-blur-sm rounded-lg shadow-lg p-6 hover:text-blue-600 hover:shadow-xl transition-all hover:bg-white cursor-default"
            aria-label="Next products"
            disabled
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
}