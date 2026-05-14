// Shared/common types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NavLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
}

export interface Feature {
  iconName: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  image?: string;
  imagePlaceholder?: boolean;
}