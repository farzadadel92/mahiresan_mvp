// src/app/(shop)/data/homePageData.ts

export interface Category {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  origin: string;
  vendorName: string;
}

export interface Feature {
  icon: string; // We'll use string identifiers since React nodes can't be serialized
  title: string;
  description: string;
}

// Categories data
export const categories: Category[] = [
  {
    title: "ماهی تازه، آماده برای پخت",
    description: "از ماهی سفید شمالی تا سنگسر جنوبی",
    image: "/images/categories/fresh-fish.jpg",
    href: "/products?category=fish"
  },
  {
    title: "خاویار درج یک، با استاندارد صادرات",
    description: "کیفیت ممتاز، بسته‌بندی استاندارد",
    image: "/images/categories/caviar.jpg",
    href: "/products?category=caviar"
  },
  {
    title: "مواد اولیه و محصولات مکمل دریایی",
    description: "انتخابی کامل برای آشپزی روزمره",
    image: "/images/categories/supplements.jpg",
    href: "/products?category=supplements"
  },
  {
    title: "میگو تازه جنوب، مستقیم از دریا",
    description: "میگو درشت صید خلیج فارس و دریای عمان",
    image: "/images/categories/shrimp.jpg",
    href: "/products?category=shrimp"
  }
];

// Featured products data
export const featuredProducts: Product[] = [
  {
    id: "1",
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
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    image: "/images/products/hamoor-mahi-3.jpg",
    origin: "بندرعباس",
    vendorName: "بازار ماهی بندرعباس"
  },
  {
    id: "4",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    image: "/images/products/hamoor-mahi-4.jpg",
    origin: "قشم",
    vendorName: "صیادان جزیره قشم"
  },
  {
    id: "11",
    name: "ماهی هامور سفید (صادراتی)",
    price: 730000,
    image: "/images/products/hamoor-mahi.jpg",
    origin: "بندرعباس",
    vendorName: "بازار ماهی بندرعباس"
  },
  {
    id: "12",
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
    name: "ماهی قزل‌آلا",
    price: 280000,
    image: "/images/products/trout.jpg",
    origin: "گیلان",
    vendorName: "مزارع سردآبی گیلان"
  },
  {
    id: "7",
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
    name: "ماهی سنگسر",
    price: 890000,
    image: "/images/products/sangasar.jpg",
    origin: "بوشهر",
    vendorName: "بازار ماهی بوشهر"
  },
  {
    id: "13",
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
    name: "ماهی قزل‌آلا",
    price: 280000,
    image: "/images/products/trout.jpg",
    origin: "گیلان",
    vendorName: "مزارع سردآبی گیلان"
  }
];

// Features data (icons will be mapped in the component)
export const features = [
  {
    iconName: "Truck",
    title: "ارسال سراسری به کشور",
    description: "تحویل به موقع و سریع"
  },
  {
    iconName: "Package",
    title: "بسته‌بندی بهداشتی",
    description: "حفظ و ماندگاری محصول تازه"
  },
  {
    iconName: "Droplet",
    title: "صید تازه، هر روز",
    description: "تأمین مستقیم از سه دریا"
  },
  {
    iconName: "Headphones",
    title: "پشتیبانی همیشگی",
    description: "پاسخ‌گوی سوالات شما"
  }
];

// Cities data
export const cities: string[] = [
  "چابهار", "گرگان", "بندرانزلی", "بندرعباس", 
  "رشت", "بوشهر", "قشم", "اهواز"
];

// FAQ items data
export const faqItems = [
  {
    question: "آیا امکان ارسال به تمام نقاط ایران وجود دارد؟",
    answer: "بله، ما به تمام نقاط ایران ارسال داریم."
  },
  {
    question: "چگونه مطمئن شویم محصول تازه است؟",
    answer: "تمام محصولات ما مستقیماً از دریا صید و در سریعترین زمان ممکن ارسال می‌شوند."
  },
  {
    question: "آیا محصولات منجمد شده نیز وجود دارد؟",
    answer: "بله، ما هم محصولات تازه و هم محصولات منجمد با کیفیت را عرضه می‌کنیم."
  },
  {
    question: "آیا امکان خرید فیله‌شده وجود دارد؟",
    answer: "بله، می‌توانید در سفارش خود درخواست فیله کردن ماهی را ثبت کنید."
  },
];

// Blog posts data
export const blogPosts = [
  {
    id: 1,
    title: "بهترین انتخاب",
    date: "۱۴۰۳/۰۹/۱۲",
    slug: "sample-1",
    imagePlaceholder: true
  },
  {
    id: 2,
    title: "بهترین انتخاب",
    date: "۱۴۰۳/۰۹/۱۲",
    slug: "sample-2",
    imagePlaceholder: true
  },
  {
    id: 3,
    title: "بهترین انتخاب",
    date: "۱۴۰۳/۰۹/۱۲",
    slug: "sample-3",
    imagePlaceholder: true
  }
];