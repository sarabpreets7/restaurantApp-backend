import { Injectable } from '@nestjs/common';
import { MenuItem } from '../common/types.js';
import { v4 as uuid } from 'uuid';

const seedMenu = (): MenuItem[] => [
  {
    id: uuid(),
    name: 'Truffle Fries',
    description: 'Hand-cut fries with truffle oil and parmesan.',
    category: 'Appetizers',
    price: 9.5,
    dietary: ['vegetarian'],
    imageUrl: '/images/truffle-fries.jpg',
    prepMinutes: 10,
    available: true,
    stock: 20,
    addOns: [{ id: 'ao1', label: 'Extra parmesan', price: 1.5 }]
  },
  {
    id: uuid(),
    name: 'Smoked Tofu Bowl',
    description: 'Brown rice, seasonal veggies, tamari glaze.',
    category: 'Main Course',
    price: 16,
    dietary: ['vegan', 'gluten-free'],
    imageUrl: '/images/tofu-bowl.jpg',
    prepMinutes: 18,
    available: true,
    stock: 15
  },
  {
    id: uuid(),
    name: 'Ribeye Steak',
    description: '12oz grilled ribeye with chimichurri.',
    category: 'Main Course',
    price: 29,
    dietary: [],
    imageUrl: '/images/ribeye.jpg',
    prepMinutes: 22,
    available: true,
    stock: 10,
    addOns: [
      { id: 'ao2', label: 'Add mushrooms', price: 3 },
      { id: 'ao3', label: 'Add shrimp', price: 6 }
    ]
  },
  {
    id: uuid(),
    name: 'Molten Chocolate Cake',
    description: 'Served warm with vanilla bean gelato.',
    category: 'Desserts',
    price: 11,
    dietary: ['vegetarian'],
    imageUrl: '/images/cake.jpg',
    prepMinutes: 12,
    available: true,
    stock: 12
  },
  {
    id: uuid(),
    name: 'Cold Brew',
    description: 'Single-origin, slow steeped.',
    category: 'Beverages',
    price: 5,
    dietary: ['vegan', 'gluten-free'],
    imageUrl: '/images/cold-brew.jpg',
    prepMinutes: 2,
    available: true,
    stock: 40
  }
];

@Injectable()
export class MenuService {
  private menu: MenuItem[] = seedMenu();

  list(filters?: {
    search?: string;
    category?: string;
    dietary?: string;
    minPrice?: number;
    maxPrice?: number;
  }): MenuItem[] {
    const search = filters?.search?.toLowerCase();
    return this.menu.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);
      const matchesCategory = !filters?.category || item.category === filters.category;
      const matchesDietary =
        !filters?.dietary || item.dietary.includes(filters.dietary as any);
      const matchesMin = filters?.minPrice == null || item.price >= filters.minPrice;
      const matchesMax = filters?.maxPrice == null || item.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesDietary && matchesMin && matchesMax;
    });
  }

  get(id: string): MenuItem | undefined {
    return this.menu.find((m) => m.id === id);
  }

  adjustStock(id: string, delta: number) {
    const item = this.get(id);
    if (item) item.stock += delta;
  }

  reset(data?: MenuItem[]) {
    this.menu = data ?? seedMenu();
  }
}
