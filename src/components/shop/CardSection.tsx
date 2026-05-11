// src/components/shop/SectionWithScroll.tsx
'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { CardSectionProps } from '@/src/types/ui.types';

export default function CardSection({
  title,
  seeAllLink,
  products,
  className = '',
  showArrows = true,
  slidesToShow = 4,
}: CardSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Get slides to show based on screen size
  const getSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
    }
    return slidesToShow;
  };

  const [slidesToShowCount, setSlidesToShowCount] = useState(slidesToShow);

  useEffect(() => {
    const handleResize = () => {
      const count = getSlidesToShow();
      setSlidesToShowCount(count);
      setIsDesktop(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max index for pagination
  useEffect(() => {
    const totalPages = Math.ceil(products.length / slidesToShowCount);
    setMaxIndex(Math.max(0, totalPages - 1));
  }, [products.length, slidesToShowCount]);

  // Update scroll button states on desktop
  const updateScrollButtons = () => {
    if (!scrollContainerRef.current || !isDesktop) return;
    
    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // Desktop: Scroll by full page
  const scrollDesktop = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex > maxIndex) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth / slidesToShowCount;
    const scrollAmount = cardWidth * slidesToShowCount;
    
    container.scrollTo({
      left: newIndex * scrollAmount,
      behavior: 'smooth',
    });
    
    setCurrentIndex(newIndex);
    
    // Update button states after scroll
    setTimeout(updateScrollButtons, 300);
  };

  // Mobile: Free horizontal scroll with touch
  const handleTouchStart = useRef(0);
  const handleTouchMove = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isDesktop) {
      handleTouchStart.current = e.touches[0].clientX;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDesktop) {
      handleTouchMove.current = e.touches[0].clientX;
    }
  };

  const onTouchEnd = () => {
    if (!isDesktop) {
      const diff = handleTouchStart.current - handleTouchMove.current;
      if (Math.abs(diff) > 50) {
        // Just let the natural scroll happen, no programmatic scrolling needed
        // Update dots position after scroll
        setTimeout(updateMobileScrollPosition, 100);
      }
    }
  };

  // Update current index for mobile dots based on scroll position
  const updateMobileScrollPosition = () => {
    if (!scrollContainerRef.current || isDesktop) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(newIndex);
  };

  // Update scroll position on scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isDesktop) {
        // For desktop: update button states
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        
        // Update current index based on scroll position for desktop
        const cardWidth = container.clientWidth / slidesToShowCount;
        const newIndex = Math.round(scrollLeft / (cardWidth * slidesToShowCount));
        setCurrentIndex(newIndex);
      } else {
        // For mobile: update dots
        const cardWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isDesktop, slidesToShowCount]);

  // Initialize button states on mount and when products change
  useEffect(() => {
    if (isDesktop && scrollContainerRef.current) {
      updateScrollButtons();
    }
  }, [isDesktop, products, slidesToShowCount]);

  return (
    <section className={`relative border-2 border-gray-200 rounded-xl p-10 mt-16 sm:mt-20 md:mt-24 lg:mt-28 mb-16 sm:mb-20 md:mb-24 lg:mb-28 ${className}`}>
      {/* Half-height background layer - now properly behind content */}
      <div className="absolute rounded-t-xl inset-x-0 top-0 h-1/3 bg-blue-600" style={{ zIndex: 0 }}></div>
      
      {/* Content wrapper with higher z-index */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Header */}
        {(title || seeAllLink) && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-1 mb-6">
            {title && (
              <h3 className="text-white text-2xl sm:text-3xl md:text-3xl font-bold text-center sm:text-right">
                {title}
              </h3>
            )}
            {seeAllLink && (
              <Link 
                href={seeAllLink} 
                className="text-white text-base sm:text-lg md:text-lg hover:text-gray-200 transition-colors"
              >
                مشاهده همه
              </Link>
            )}
          </div>
        )}

        {/* Products Container with Navigation */}
        <div className="relative mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-10">
          {/* Desktop Left Button */}
          {showArrows && isDesktop && (
            <button
              className="shrink-0 bg-blue-800 text-white backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 md:p-6 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Previous products"
              onClick={() => scrollDesktop('left')}
              style={{ opacity: canScrollLeft ? 1 : 0.4, cursor: canScrollLeft ? 'pointer' : 'not-allowed' }}
              disabled={!canScrollLeft}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Scrollable Products Container */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 w-full overflow-x-auto scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex gap-4 sm:gap-5 md:gap-6"
              style={{ 
                width: 'max-content',
                minWidth: '100%',
              }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="w-full"
                  style={{
                    width: isDesktop ? `calc((100% / ${slidesToShowCount}) - 1rem)` : 'calc(100vw - 3rem)',
                    minWidth: isDesktop ? 'auto' : 'calc(100vw - 3rem)',
                    flexShrink: 0
                  }}
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

          {/* Desktop Right Button */}
          {showArrows && isDesktop && (
            <button
              className="shrink-0 bg-blue-800 text-white backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 md:p-6 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Next products"
              onClick={() => scrollDesktop('right')}
              style={{ opacity: canScrollRight ? 1 : 0.4, cursor: canScrollRight ? 'pointer' : 'not-allowed' }}
              disabled={!canScrollRight}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Mobile Dots Indicator */}
        {showArrows && !isDesktop && maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}