// ProductCard.tsx
import Image from 'next/image';
import BagIcon from "@/public/icons/BagIcon";
import { Store } from 'lucide-react';
import { ProductCardProps } from '@/src/types/product.types';

/**
 * ProductCard - Compact product display card for carousels and grids
 * 
 * Features:
 * - Responsive image with aspect ratio container
 * - Discount badge overlay (top-right corner)
 * - Vendor info with store icon
 * - Price section with original price strikethrough and bag icon button
 * - Persian number formatting for prices and discount
 */
const ProductCard = ({ 
  name, 
  price, 
  originalPrice, 
  discount, 
  image, 
  vendorName,
  city 
}: ProductCardProps) => {
  
  /** Format number to Persian locale (۱۲۳٬۴۵۶) */
  const persianFormatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="w-52 shrink-0 bg-surface border-border border-2 rounded-lg shadow-md transition-all duration-300 overflow-hidden">
      
      {/* === Image Section === */}
      <div className="relative p-2 pb-1"> 
        <div className="relative aspect-3/3"> {/* Square aspect ratio container */}
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-md object-contain" // object-contain prevents image cropping
            />
            {/* Discount badge - only rendered when discount exists */}
            {discount && (
            <div className="absolute top-1 right-1 bg-accent text-text-inverse px-1 py-0.5 rounded-md text-xs font-bold">
                {persianFormatPrice(discount)}%
            </div>
            )}
        </div>
      </div>
      
      {/* === Product Details Section === */}
      <div className="p-3 pt-1"> 
        {/* Product name - max 2 lines with word breaking for Persian text */}
        <h3 className="font-semibold text-text-primary mb-0.5 text-sm line-clamp-2 wrap-break-words">
          {name}
        </h3>
        
        {/* Vendor row: store icon + city | vendor name */}
        <div className='flex gap-1.5 text-text-muted'>
          <Store size={16} color="currentColor" className="shrink-0" /> {/* shrink-0 prevents icon from compressing */}
          <p className="text-xs mb-1 line-clamp-1 wrap-break-words"> {/* Single line, breaks long words */}
            {city} | {vendorName}
          </p>
        </div>
        
        {/* === Price & Action Section === */}
        <div className="flex items-center justify-between mt-2 p-1.5 border border-border bg-primary-light rounded-lg">
          <div className="flex flex-col">
            {/* Original price with diagonal strikethrough (shown only when discounted) */}
            {originalPrice && (
                <span className="relative text-text-muted text-[11px] inline-block">
                    {persianFormatPrice(originalPrice)} تومان
                    {/* Diagonal line crossing out the original price */}
                    <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-accent -translate-y-1/2 translate-x-2"></span>
                </span>
            )}
            {/* Current price - bold and primary color */}
            <span className="text-primary font-bold text-sm">
              {persianFormatPrice(price)} تومان
            </span>
          </div>
          
          {/* Bag/add-to-cart icon button */}
          <button className="bg-primary-light rounded-md shrink-0 p-0.5">
            <BagIcon hasBackground={false} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;