// ProductCard.tsx
import { useState } from 'react';
import Image from 'next/image';
import BagIcon from "@/public/icons/BagIcon";
import { Store } from 'lucide-react';
import { ProductCardProps } from '@/src/types/product.types';

const ProductCard = ({ 
  // id, 
  name, 
  price, 
  originalPrice, 
  discount, 
  image, 
  vendorName,
  city 
}: ProductCardProps) => {
  
  const persianFormatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="w-52 shrink-0 bg-surface border-border border-2 rounded-lg shadow-md transition-all duration-300 overflow-hidden">
      
      {/* Image section - REDUCED HEIGHT */}
      <div className="relative p-2 pb-1"> 
        <div className="relative aspect-3/3"> 
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-md object-contain"
            />
            {discount && (
            <div className="absolute top-1 right-1 bg-accent text-text-inverse px-1 py-0.5 rounded-md text-xs font-bold"> {/* Adjusted position and padding */}
                {persianFormatPrice(discount)}%
            </div>
            )}
        </div>
      </div>
      
      {/* description - REDUCED VERTICAL SPACING */}
      <div className="p-3 pt-1"> 
        {/* Product name */}
        <h3 className="font-semibold text-text-primary mb-0.5 text-sm line-clamp-2 wrap-break-words"> {/* Changed: mb-1 → mb-0.5 */}
          {name}
        </h3>
        
        {/* Vendor name */}
        <div className='flex gap-1.5 text-text-muted'>
          <Store size={16} color="currentColor" className="shrink-0" /> {/* Changed: size 18 → 16 */}
          <p className="text-xs mb-1 line-clamp-1 wrap-break-words"> {/* Changed: mb-1.5 → mb-1, line-clamp-2 → line-clamp-1 (single line) */}
            {city} | {vendorName}
          </p>
        </div>
        
        {/* Price display - REDUCED HEIGHT */}
        <div className="flex items-center justify-between mt-2 p-1.5 border bg-primary-light rounded-lg"> {/* Changed: mt-4 → mt-2, p-2 → p-1.5 */}
          <div className="flex flex-col">
            {originalPrice && (
                <span className="relative text-text-muted text-[11px] inline-block"> {/* Changed: text-xs → text-[11px] */}
                    {persianFormatPrice(originalPrice)} تومان
                    <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-accent -translate-y-1/2 translate-x-2"></span>
                </span>
            )}
            <span className="text-primary font-bold text-sm"> {/* Changed: text-base → text-sm */}
              {persianFormatPrice(price)} تومان
            </span>
          </div>
          
          <button className="bg-primary-light rounded-md shrink-0 p-0.5"> {/* Changed: p-1 → p-0.5 */}
            <BagIcon hasBackground={false} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;