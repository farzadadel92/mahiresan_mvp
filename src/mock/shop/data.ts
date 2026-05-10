// src/mock/data.ts
import { Product } from "@/src/types/product.types";

// Featured products data
export const featuredProducts: Product[] = [
  {
    id: "1",
    vendorId: "1",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    originalPrice: 855000,
    discount: 14,
    image: "/images/products/hamoor-mahi.jpg",
    origin: "خلیج فارس",
    vendorName: "صید جنوب ماهی‌تازه"
  },
  {
    id: "2",
    vendorId: "2",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    originalPrice: 855000,
    discount: 14,
    image: "/images/products/hamoor-mahi-2.jpg",
    origin: "دریای عمان",
    vendorName: "صید جنوب ماهی‌تازه"
  },
  {
    id: "9",
    vendorId: "9",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    originalPrice: 855000,
    discount: 14,
    image: "/images/products/hamoor-mahi-3.jpg",
    origin: "خلیج فارس",
    vendorName: "صید جنوب ماهی‌تازه"
  },
  {
    id: "10",
    vendorId: "10",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    originalPrice: 855000,
    discount: 14,
    image: "/images/products/hamoor-mahi-4.jpg",
    origin: "خلیج فارس",
    vendorName: "صید جنوب ماهی‌تازه"
  }
];

// Fresh products data
export const freshProducts: Product[] = [
  {
    id: "3",
    vendorId: "1",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    image: "/images/products/hamoor-mahi-3.jpg",
    origin: "بندرعباس",
    vendorName: "بازار ماهی بندرعباس"
  },
  {
    id: "4",
    vendorId: "1",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    image: "/images/products/hamoor-mahi-4.jpg",
    origin: "قشم",
    vendorName: "صیادان جزیره قشم"
  },
  {
    id: "11",
    vendorId: "1",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    image: "/images/products/hamoor-mahi.jpg",
    origin: "بندرعباس",
    vendorName: "بازار ماهی بندرعباس"
  },
  {
    id: "12",
    vendorId: "1",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    image: "/images/products/hamoor-mahi-2.jpg",
    origin: "قشم",
    vendorName: "صیادان جزیره قشم"
  }
];

// Best selling products data
export const bestSellingProducts: Product[] = [
  {
    id: "5",
    vendorId: "1",
    name: "میگو تازه جنوب",
    price: 450000,
    originalPrice: 520000,
    discount: 13,
    image: "/images/products/shrimp-fresh.jpg",
    origin: "خلیج فارس",
    vendorName: "صید جنوب ماهی‌تازه"
  },
  {
    id: "6",
    vendorId: "1",
    name: "ماهی قزل‌آلا",
    price: 280000,
    image: "/images/products/trout.jpg",
    origin: "گیلان",
    vendorName: "مزارع سردآبی گیلان"
  },
  {
    id: "7",
    vendorId: "1",
    name: "خاویار بلوگا",
    price: 2350000,
    originalPrice: 2800000,
    discount: 16,
    image: "/images/products/beluga-caviar.jpg",
    origin: "دریای خزر",
    vendorName: "لذت خاویار"
  },
  {
    id: "8",
    vendorId: "1",
    name: "ماهی سنگسر",
    price: 890000,
    image: "/images/products/sangasar.jpg",
    origin: "بوشهر",
    vendorName: "بازار ماهی بوشهر"
  },
  {
    id: "13",
    vendorId: "1",
    name: "میگو تازه جنوب",
    price: 450000,
    originalPrice: 520000,
    discount: 13,
    image: "/images/products/shrimp-fresh.jpg",
    origin: "خلیج فارس",
    vendorName: "صید جنوب ماهی‌تازه"
  },
  {
    id: "14",
    vendorId: "1",
    name: "ماهی قزل‌آلا",
    price: 280000,
    image: "/images/products/trout.jpg",
    origin: "گیلان",
    vendorName: "مزارع سردآبی گیلان"
  }
];

// Cities data
export const cities: string[] = [
  "چابهار", "گرگان", "بندرانزلی", "بندرعباس", 
  "رشت", "بوشهر", "قشم", "اهواز"
];

// Blog posts data
export const blogPosts = [
  {
    id: 1,
    title: "بهترین انتخاب",
    date: "۱۴۰۳/۰۹/۱۲",
    slug: "sample-1",
    imagePlaceholder: true,
    image: "/images/blog/blog-image.png"
  },
  {
    id: 2,
    title: "بهترین انتخاب",
    date: "۱۴۰۳/۰۹/۱۲",
    slug: "sample-2",
    imagePlaceholder: true,
    image: "/images/blog/blog-image.png"
  },
  {
    id: 3,
    title: "بهترین انتخاب",
    date: "۱۴۰۳/۰۹/۱۲",
    slug: "sample-3",
    imagePlaceholder: true,
    image: "/images/blog/blog-image.png"
  }
];