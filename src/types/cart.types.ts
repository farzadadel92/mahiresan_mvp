// Cart related types
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  vendorId: string;
  vendorName: string;
  maxStock?: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  vendorId: string;
}