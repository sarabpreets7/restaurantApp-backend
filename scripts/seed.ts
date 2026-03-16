import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

const seedItems = [
  {
    name: 'Truffle Fries',
    description: 'Hand-cut fries with truffle oil and parmesan.',
    category: 'Appetizers',
    price: 9.5,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 10,
    available: true,
    stock: 25,
    addOns: [{ id: 'ao1', label: 'Extra parmesan', price: 1.5 }]
  },
  {
    name: 'Crispy Calamari',
    description: 'Lemon aioli, pickled chilies.',
    category: 'Appetizers',
    price: 12,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 9,
    available: true,
    stock: 18
  },
  {
    name: 'Smoked Tofu Bowl',
    description: 'Brown rice, seasonal veggies, tamari glaze.',
    category: 'Main Course',
    price: 16,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1522184216315-dc618e9fbb52?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 18,
    available: true,
    stock: 22
  },
  {
    name: 'Ribeye Steak',
    description: '12oz grilled ribeye with chimichurri.',
    category: 'Main Course',
    price: 29,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 22,
    available: true,
    stock: 12,
    addOns: [
      { id: 'ao2', label: 'Add mushrooms', price: 3 },
      { id: 'ao3', label: 'Add shrimp', price: 6 }
    ]
  },
  {
    name: 'Molten Chocolate Cake',
    description: 'Served warm with vanilla bean gelato.',
    category: 'Desserts',
    price: 11,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 12,
    available: true,
    stock: 18
  },
  {
    name: 'Cold Brew',
    description: 'Single-origin, slow steeped.',
    category: 'Beverages',
    price: 5,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 2,
    available: true,
    stock: 50
  }
];

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.createMany({
    data: seedItems.map((i) => ({
      ...i,
      id: uuid(),
      dietary: JSON.stringify(i.dietary),
      addOns: JSON.stringify(i.addOns ?? [])
    }))
  });
  console.log('Seeded menu with images.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
