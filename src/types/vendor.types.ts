// Vendor related types
export interface Vendor {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
  joinDate: Date;
  productsCount?: number;
}

export interface VendorCardProps {
  vendor: Vendor;
  variant?: 'default' | 'compact';
}