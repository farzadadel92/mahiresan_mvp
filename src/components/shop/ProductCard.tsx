// ProductCard.tsx
import { useState } from 'react';
import Image from 'next/image';
import BagIcon from "@/public/icons/BagIcon";
import { ProductCardProps } from '@/src/types/product.types';

const ProductCard = ({ 
  // id, 
  name, 
  price, 
  originalPrice, 
  discount, 
  image, 
  origin, 
  vendorName 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const persianFormatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div 
      className="bg-white border-gray-300 border-2 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="relative p-3"> {/* Add padding here */}
        <div className="relative aspect-square">
            <Image
            src={image}
            alt={name}
            fill
            />
            {discount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-1 py-2 rounded-lg text-sm font-bold">
                {persianFormatPrice(discount)}%
            </div>
            )}
            {origin && (
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
                {origin}
            </div>
            )}
        </div>
        </div>
      
      {/* description */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{name}</h3>
        
        {/* Vendor name display */}
        <p className="text-gray-500 text-sm mb-2">فروشنده: {vendorName}</p>
        
        <div className="flex justify-between mt-8 p-3">
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
          
          <button className="bg-blue-100 rounded-lg">
            <BagIcon hasBackground={false} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;