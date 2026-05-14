// Product related types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  origin?: string;
  vendorId: string;
  vendorName: string;
  slug?: string;
  category?: ProductCategory;
  inStock?: boolean;
  weight?: number;
  unit?: WeightUnit;
}

export type ProductCategory = 'fish' | 'shrimp' | 'caviar' | 'supplements';

export type WeightUnit = 'kg' | 'g' | 'pack';

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  origin?: string;
  vendorId?: string;
  hasDiscount?: boolean;
  sortBy?: ProductSortBy;
}

export type ProductSortBy = 'price_asc' | 'price_desc' | 'newest' | 'bestselling' | 'discount';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  origin?: string;
  vendorName: string;
  city: string;
  onAddToCart?: (id: string) => void;
  layout?: 'grid' | 'horizontal';
}