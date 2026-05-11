// src/components/shop/SectionWithScroll.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { CardSectionProps } from '@/src/types/ui.types';

export default function CardSection({
  title,
  seeAllLink,
  products,
  className = '',
}: CardSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left'); // Track slide direction

  // Calculate item width and visible items on resize
  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current) {
        const firstItem = containerRef.current.querySelector('.card-item') as HTMLElement;
        if (firstItem) {
          const width = firstItem.offsetWidth;
          const gap = 16; // gap between items (gap-4 = 16px)
          setItemWidth(width + gap);
          
          const containerWidth = containerRef.current.parentElement?.parentElement?.offsetWidth || 0;
          const itemsThatFit = Math.floor(containerWidth / (width + gap));
          setVisibleItems(Math.max(1, itemsThatFit));
        }
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [products]);

  const totalSlides = Math.max(1, products.length - visibleItems + 1);

  const slideToNext = async () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    
    if (direction === 'left') {
      // Sliding left - showing items from the right
      const nextIndex = currentIndex + 1;
      
      if (nextIndex >= totalSlides) {
        // Reached the end, change direction to right
        setDirection('right');
        const prevIndex = currentIndex - 1;
        await controls.start({
          x: -(itemWidth * prevIndex),
          transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
        });
        setCurrentIndex(prevIndex);
      } else {
        await controls.start({
          x: -(itemWidth * nextIndex),
          transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
        });
        setCurrentIndex(nextIndex);
      }
    } else {
      // Sliding right - showing items from the left
      const prevIndex = currentIndex - 1;
      
      if (prevIndex < 0) {
        // Reached the beginning, change direction to left
        setDirection('left');
        const nextIndex = currentIndex + 1;
        await controls.start({
          x: -(itemWidth * nextIndex),
          transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
        });
        setCurrentIndex(nextIndex);
      } else {
        await controls.start({
          x: -(itemWidth * prevIndex),
          transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
        });
        setCurrentIndex(prevIndex);
      }
    }
    
    setIsAnimating(false);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (products.length <= visibleItems) return;
    
    const interval = setInterval(() => {
      if (!isAnimating && !isDragging) {
        slideToNext();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, isDragging, products.length, visibleItems, direction]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        // Swiped right - slide right (show items from left)
        await slideToRight();
      } else {
        // Swiped left - slide left (show items from right)
        await slideToLeft();
      }
    } else {
      // Snap back to current position
      await controls.start({
        x: -(itemWidth * currentIndex),
        transition: { type: "tween", duration: 0.3, ease: "easeOut" }
      });
    }
  };

  const slideToLeft = async () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= totalSlides) {
      await controls.start({
        x: 0,
        transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
      });
      setCurrentIndex(0);
    } else {
      await controls.start({
        x: -(itemWidth * nextIndex),
        transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
      });
      setCurrentIndex(nextIndex);
    }
    setIsAnimating(false);
  };

  const slideToRight = async () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    const prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      await controls.start({
        x: -(itemWidth * (totalSlides - 1)),
        transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
      });
      setCurrentIndex(totalSlides - 1);
    } else {
      await controls.start({
        x: -(itemWidth * prevIndex),
        transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
      });
      setCurrentIndex(prevIndex);
    }
    setIsAnimating(false);
  };

  return (
    <section className={`relative border-2 p-7 border-gray-200 rounded-xl ${className}`}>
      {/* Half-height background layer */}
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

        {/* Products Container */}
        <div className="relative mt-8 sm:mt-10 md:mt-12">
          {/* Navigation Buttons */}
          {products.length > visibleItems && (
            <>
              <button
                onClick={slideToRight}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50"
                style={{ transform: 'translateY(-50%)' }}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={slideToLeft}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50"
                style={{ transform: 'translateY(-50%)' }}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Horizontal Scroll Container - Hidden Scrollbar */}
          <div className="w-full overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex gap-4 cursor-grab active:cursor-grabbing"
              animate={controls}
              initial={{ x: 0 }}
              drag="x"
              dragConstraints={{ left: -(itemWidth * (totalSlides - 1)), right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            >
              {products.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="card-item w-64 sm:w-72 shrink-0"
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
            </motion.div>
          </div>

          {/* Dots Indicator */}
          {products.length > visibleItems && totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating && !isDragging) {
                      controls.start({
                        x: -(itemWidth * idx),
                        transition: { type: "tween", duration: 0.4, ease: "easeInOut" }
                      });
                      setCurrentIndex(idx);
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}