// src/components/shop/CardSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { CardSectionProps } from '@/src/types/ui.types';
import { ChevronLeft } from 'lucide-react';

/**
 * CardSection - Horizontal product carousel with auto-slide and drag support
 * 
 * Features:
 * - Auto-calculates visible items based on container width
 * - Auto-slides every 3 seconds (bounces back at edges)
 * - Touch/mouse drag navigation with threshold detection
 * - Dot indicators for manual navigation
 * - Half-height colored background overlay
 */
export default function CardSection({
  title,
  seeAllLink,
  products,
  className = '',
}: CardSectionProps) {
  // --- State ---
  const [currentIndex, setCurrentIndex] = useState(0); // Current slide position
  const [isAnimating, setIsAnimating] = useState(false); // Prevents overlapping animations
  const [itemWidth, setItemWidth] = useState(0); // Width of a single card + gap
  const [visibleItems, setVisibleItems] = useState(0); // How many cards fit in viewport
  const [isDragging, setIsDragging] = useState(false); // True during drag gesture
  const [direction, setDirection] = useState<'left' | 'right'>('left'); // Auto-slide direction (reverses at edges)

  // --- Refs ---
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation(); // Framer Motion imperative animation controls

  /**
   * Calculate card dimensions and visible count on mount/resize
   * Reads actual DOM measurements to ensure responsiveness
   */
  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current) {
        const firstItem = containerRef.current.querySelector('.card-item') as HTMLElement;
        if (firstItem) {
          const width = firstItem.offsetWidth;
          const gap = 16; // gap-4 = 16px (matches Tailwind class)
          setItemWidth(width + gap);
          
          // Calculate how many full cards fit in the parent container
          const containerWidth = containerRef.current.parentElement?.parentElement?.offsetWidth || 0;
          const itemsThatFit = Math.floor(containerWidth / (width + gap));
          setVisibleItems(Math.max(1, itemsThatFit)); // At least 1 card visible
        }
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [products]);

  // Total number of slide positions (accounts for partially visible last slide)
  const totalSlides = Math.max(1, products.length - visibleItems + 1);

  /**
   * Auto-slide logic - advances in current direction, reverses at boundaries
   * Creates a "bounce back" effect rather than looping
   */
  const slideToNext = async () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    
    if (direction === 'left') {
      const nextIndex = currentIndex + 1;
      
      // Hit right boundary → reverse direction and go back
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
      
      // Hit left boundary → reverse direction and go forward
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

  // Auto-slide timer - 3 second interval, pauses during drag/animation
  useEffect(() => {
    if (products.length <= visibleItems) return; // No sliding needed if all cards fit
    
    const interval = setInterval(() => {
      if (!isAnimating && !isDragging) {
        slideToNext();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, isDragging, products.length, visibleItems, direction]);

  // --- Drag Handlers ---
  
  /** Mark start of drag gesture */
  const handleDragStart = () => {
    setIsDragging(true);
  };

  /**
   * Handle drag end - snap to next/prev slide if threshold exceeded
   * Otherwise bounce back to current position
   */
  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const swipeThreshold = 50; // Minimum px to trigger slide change
    
    if (Math.abs(info.offset.x) > swipeThreshold) {
      // Dragged far enough → navigate
      if (info.offset.x > 0) {
        await slideToRight(); // Dragged right → show previous
      } else {
        await slideToLeft(); // Dragged left → show next
      }
    } else {
      // Insufficient drag → snap back to current position
      await controls.start({
        x: -(itemWidth * currentIndex),
        transition: { type: "tween", duration: 0.3, ease: "easeOut" }
      });
    }
  };

  /** Slide to next set of cards, wrap to start if at end */
  const slideToLeft = async () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= totalSlides) {
      // Wrap to beginning
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

  /** Slide to previous set of cards, wrap to end if at start */
  const slideToRight = async () => {
    if (isAnimating || isDragging) return;
    
    setIsAnimating(true);
    const prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      // Wrap to end
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
    <section className={`relative border border-border rounded-xl py-5 px-10 ${className}`}>
      {/* Half-height colored background overlay - covers top 1/3 of section */}
      <div
        className="absolute rounded-t-xl inset-x-0 top-0 h-1/3 bg-secondary opacity-90"
        style={{ zIndex: 0 }}
      ></div>
      
      {/* Content wrapper - sits above the background overlay */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Section header: title + "see all" link */}
        {(title || seeAllLink) && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-1 mb-4">
            {title && (
              <h3 className="text-text-inverse text-xl font-semibold text-center sm:text-right">
                {title}
              </h3>
            )}
            {seeAllLink && (
              <Link 
                href={seeAllLink} 
                className="flex items-center gap-1 text-text-inverse text-base font-medium hover:text-gray-200 transition-colors"
              >
                مشاهده همه <ChevronLeft size={18} />
              </Link>
            )}
          </div>
        )}

        {/* Carousel container */}
        <div className="relative mt-4">
          {/* Clipping wrapper - hides overflowing cards */}
          <div className="w-full overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex gap-4 cursor-grab active:cursor-grabbing"
              animate={controls}
              initial={{ x: 0 }}
              drag="x"
              dragConstraints={{
                left: -(itemWidth * (totalSlides - 1)), // Max drag left boundary
                right: 0 // Max drag right boundary
              }}
              dragElastic={0.1} // Low elasticity for firm snap feel
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="card-item w-56 shrink-0" // shrink-0 prevents cards from compressing
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

          {/* Dot indicators - only show when content overflows */}
          {products.length > visibleItems && totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-4">
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
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-primary' // Active dot - wider and colored
                      : 'w-1.5 bg-gray-300' // Inactive dot
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