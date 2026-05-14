// UI component prop types
import { ReactNode } from 'react';
import { Product } from './product.types';

export interface CardSectionProps {
  title?: string;
  seeAllLink?: string;
  products: Product[];
  className?: string;
  showArrows?: boolean;
  slidesToShow?: number;
  onProductClick?: (productId: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export interface SectionHeaderProps {
  title: string;
  seeAllLink?: string;
  seeAllText?: string;
  className?: string;
}

export interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    largeDesktop?: number;
  };
  gap?: number;
  className?: string;
}