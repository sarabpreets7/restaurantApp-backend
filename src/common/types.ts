export type DietaryFlag = 'vegetarian' | 'vegan' | 'gluten-free';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dietary: DietaryFlag[];
  imageUrl: string;
  prepMinutes: number;
  available: boolean;
  stock: number;
  addOns?: { id: string; label: string; price: number }[];
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed' | 'failed';

export interface LineItem {
  menuItemId: string;
  quantity: number;
  addOnIds?: string[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  lines: Array<LineItem & { unitPrice: number; addOnTotal: number }>;
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    phone: string;
    table?: string;
  };
  version: number;
  priceChanged?: boolean;
  paymentRef?: string;
}
