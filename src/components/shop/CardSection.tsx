// src/components/shop/CardSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { CardSectionProps } from '@/src/types/ui.types';
import { ChevronLeft } from 'lucide-react';

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
  const [direction, setDirection] = useState<'left' | 'right'>('left');

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
      const nextIndex = currentIndex + 1;
      
      if (nextIndex >= totalSlides) {
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
      const prevIndex = currentIndex - 1;
      
      if (prevIndex < 0) {
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
        await slideToRight();
      } else {
        await slideToLeft();
      }
    } else {
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
    <section className={`relative border border-border rounded-xl py-5 px-10 ${className}`}> {/* Reduced border width, decreased padding from p-6 px-8 to p-4 */}
      {/* Half-height background layer - made lighter */}
      <div className="absolute rounded-t-xl inset-x-0 top-0 h-1/3 bg-secondary opacity-90" style={{ zIndex: 0 }}></div> {/* Changed from blue-600 to blue-500, added opacity */}
      
      {/* Content wrapper with higher z-index */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Header */}
        {(title || seeAllLink) && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-1 mb-4"> {/* Reduced gap from 4 to 3, mb-6 to mb-4 */}
            {title && (
              <h3 className="text-text-inverse text-xl font-semibold text-center sm:text-right"> {/* Reduced from text-2xl to text-xl, font-bold to font-semibold */}
                {title}
              </h3>
            )}
            {seeAllLink && (
              <Link 
                href={seeAllLink} 
                className="flex items-center gap-1 text-text-inverse text-base font-medium hover:text-gray-200 transition-colors" // Reduced gap, text size, and font weight
              >
                مشاهده همه <ChevronLeft size={18} /> {/* Added size prop to icon */}
              </Link>
            )}
          </div>
        )}

        {/* Products Container */}
        <div className="relative mt-4"> {/* Reduced from mt-8 to mt-4 */}

          {/* Horizontal Scroll Container - Hidden Scrollbar */}
          <div className="w-full overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex gap-4 cursor-grab active:cursor-grabbing" // Reduced gap from 6 to 4
              animate={controls}
              initial={{ x: 0 }}
              drag="x"
              dragConstraints={{ left: -(itemWidth * (totalSlides - 1)), right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="card-item w-56 shrink-0" // Reduced from w-64 to w-56 (makes cards narrower)
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
            <div className="flex justify-center gap-2 mt-4"> {/* Reduced from mt-6 to mt-4 */}
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
                  className={`h-1.5 rounded-full transition-all ${ // Reduced from h-2 to h-1.5
                    idx === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300' // Adjusted widths and color
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