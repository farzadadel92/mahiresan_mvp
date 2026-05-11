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
  origin, 
  vendorName,
  city 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const persianFormatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div 
      className="w-64 shrink-0 bg-white border-gray-200 border-2 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="relative p-3">
        <div className="relative aspect-square">
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-lg object-contain"
            />
            {discount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-1 py-2 rounded-lg text-sm font-bold">
                {persianFormatPrice(discount)}%
            </div>
            )}
        </div>
      </div>
      
      {/* description */}
      <div className="p-4">
        {/* Product name with ellipsis for multi-line */}
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 wrap-break-words">
          {name}
        </h3>
        
        {/* Vendor name display with ellipsis for multi-line */}
        <div className='flex gap-2 text-gray-400'>
          <Store size={24} color="currentColor" className="shrink-0" />
          <p className="text-sm mb-2 line-clamp-2 wrap-break-words">
            {city} | {vendorName}
          </p>
        </div>
        
        {/* Price display */}
        <div className="flex items-center justify-between mt-8 p-3 border-2 bg-blue-50 rounded-xl">
          <div className="flex flex-col">
            {originalPrice && (
                <span className="relative text-gray-400 text-sm inline-block">
                    {persianFormatPrice(originalPrice)} تومان
                    <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500 -translate-y-1/2 translate-x-3"></span>
                </span>
            )}
            <span className="text-blue-600 font-extrabold text-xl">
              {persianFormatPrice(price)} تومان
            </span>
          </div>
          
          <button className="bg-blue-100 rounded-lg shrink-0">
            <BagIcon hasBackground={false} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;