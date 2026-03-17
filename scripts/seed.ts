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
    name: 'Burrata Plate',
    description: 'Heirloom tomatoes, basil oil, grilled sourdough.',
    category: 'Appetizers',
    price: 14,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 8,
    available: true,
    stock: 18
  },
  {
    name: 'Charred Corn Elote',
    description: 'Cotija, lime, chili butter, cilantro.',
    category: 'Appetizers',
    price: 8.5,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 8,
    available: true,
    stock: 20
  },
  {
    name: 'Spinach Artichoke Dip',
    description: 'Baked with mozzarella, served with pita crisps.',
    category: 'Appetizers',
    price: 11,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 12,
    available: true,
    stock: 24
  },
  {
    name: 'Avocado Bruschetta',
    description: 'Sourdough, tomato confit, basil, balsamic.',
    category: 'Appetizers',
    price: 10,
    dietary: ['vegan'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 9,
    available: true,
    stock: 22
  },
  {
    name: 'Karaage Bites',
    description: 'Japanese fried chicken, yuzu mayo.',
    category: 'Appetizers',
    price: 13,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 10,
    available: true,
    stock: 25
  },
  {
    name: 'Shrimp Cocktail',
    description: 'Poached prawns, house cocktail sauce.',
    category: 'Appetizers',
    price: 15,
    dietary: ['gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 7,
    available: true,
    stock: 20
  },
  {
    name: 'Stuffed Mushrooms',
    description: 'Herb cream cheese, breadcrumbs, parsley.',
    category: 'Appetizers',
    price: 9,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 10,
    available: true,
    stock: 26
  },
  {
    name: 'Greek Mezze Plate',
    description: 'Hummus, olives, feta, grilled pita, veggies.',
    category: 'Appetizers',
    price: 13,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 11,
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
    name: 'Margherita Pizza',
    description: 'San Marzano tomato, fresh mozzarella, basil.',
    category: 'Main Course',
    price: 17,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1548365328-8c6db3220c8e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 14,
    available: true,
    stock: 20,
    addOns: [{ id: 'ao4', label: 'Extra buffalo mozzarella', price: 2.5 }]
  },
  {
    name: 'Grilled Salmon',
    description: 'Charred broccolini, lemon butter, farro.',
    category: 'Main Course',
    price: 24,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1514516345957-556ca7d90aaf?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 16,
    available: true,
    stock: 16
  },
  {
    name: 'Mushroom Risotto',
    description: 'Porcini, pecorino, chive oil.',
    category: 'Main Course',
    price: 18,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1612874472278-5c1ef021b6b9?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 19,
    available: true,
    stock: 18
  },
  {
    name: 'Paneer Tikka Wrap',
    description: 'Mint chutney, pickled onions, garlic naan.',
    category: 'Main Course',
    price: 14,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 12,
    available: true,
    stock: 22
  },
  {
    name: 'Butter Chicken',
    description: 'Creamy tomato gravy, basmati rice.',
    category: 'Main Course',
    price: 19,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 17,
    available: true,
    stock: 18
  },
  {
    name: 'Veggie Burger',
    description: 'Black bean patty, cheddar, brioche bun.',
    category: 'Main Course',
    price: 15,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 14,
    available: true,
    stock: 24
  },
  {
    name: 'Lamb Rogan Josh',
    description: 'Kashmiri chili, yogurt, saffron rice.',
    category: 'Main Course',
    price: 23,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 20,
    available: true,
    stock: 14
  },
  {
    name: 'Spaghetti Carbonara',
    description: 'Guanciale, pecorino romano, egg yolk.',
    category: 'Main Course',
    price: 16.5,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 13,
    available: true,
    stock: 20
  },
  {
    name: 'Pesto Gnocchi',
    description: 'Hand-rolled potato gnocchi, basil pesto.',
    category: 'Main Course',
    price: 17.5,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 12,
    available: true,
    stock: 22
  },
  {
    name: 'BBQ Pulled Pork Sandwich',
    description: 'Brioche, slaw, pickles, house BBQ sauce.',
    category: 'Main Course',
    price: 15,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 11,
    available: true,
    stock: 25
  },
  {
    name: 'Fish Tacos',
    description: 'Grilled mahi-mahi, cabbage slaw, chipotle crema.',
    category: 'Main Course',
    price: 16,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 10,
    available: true,
    stock: 24
  },
  {
    name: 'Chicken Katsu Curry',
    description: 'Panko chicken, Japanese curry, rice.',
    category: 'Main Course',
    price: 17,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 16,
    available: true,
    stock: 20
  },
  {
    name: 'Shakshuka Skillet',
    description: 'Poached eggs, spiced tomato pepper sauce.',
    category: 'Main Course',
    price: 13.5,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 14,
    available: true,
    stock: 22
  },
  {
    name: 'Falafel Bowl',
    description: 'Hummus, quinoa tabbouleh, tahini, pickles.',
    category: 'Main Course',
    price: 14,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 13,
    available: true,
    stock: 24
  },
  {
    name: 'Korean Bibimbap',
    description: 'Gochujang, pickled veg, fried egg, rice.',
    category: 'Main Course',
    price: 17,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 15,
    available: true,
    stock: 20
  },
  {
    name: 'Pad Thai',
    description: 'Rice noodles, tamarind, peanuts, tofu & shrimp.',
    category: 'Main Course',
    price: 16,
    dietary: ['gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 12,
    available: true,
    stock: 26
  },
  {
    name: 'Beef Bulgogi Bowl',
    description: 'Marinated ribeye, sesame, rice, kimchi.',
    category: 'Main Course',
    price: 18.5,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 14,
    available: true,
    stock: 18
  },
  {
    name: 'Shrimp Scampi Pasta',
    description: 'Garlic butter, chili flakes, parsley, linguine.',
    category: 'Main Course',
    price: 19,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 12,
    available: true,
    stock: 18
  },
  {
    name: 'Veggie Korma',
    description: 'Cashew cream sauce, vegetables, saffron rice.',
    category: 'Main Course',
    price: 15.5,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 15,
    available: true,
    stock: 20
  },
  {
    name: 'Seared Tuna Poke Bowl',
    description: 'Sushi rice, edamame, avocado, sesame.',
    category: 'Main Course',
    price: 20,
    dietary: ['gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 11,
    available: true,
    stock: 18
  },
  {
    name: 'Veg Lasagna',
    description: 'Roasted veggies, ricotta, marinara.',
    category: 'Main Course',
    price: 17,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 20,
    available: true,
    stock: 16
  },
  {
    name: 'Miso Ramen',
    description: 'Miso broth, chashu pork, egg, scallion.',
    category: 'Main Course',
    price: 18,
    dietary: [],
    imageUrl:
      'https://images.unsplash.com/photo-1474898856510-884a2c0be546?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 17,
    available: true,
    stock: 18
  },
  {
    name: 'Grilled Paneer Steak',
    description: 'Smoky tomato chutney, charred peppers.',
    category: 'Main Course',
    price: 16,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 15,
    available: true,
    stock: 20
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
    name: 'Mango Panna Cotta',
    description: 'Passionfruit coulis, toasted coconut.',
    category: 'Desserts',
    price: 9,
    dietary: ['gluten-free', 'vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 6,
    available: true,
    stock: 25
  },
  {
    name: 'Tiramisu Jar',
    description: 'Espresso-soaked ladyfingers, mascarpone cream.',
    category: 'Desserts',
    price: 10,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 8,
    available: true,
    stock: 24
  },
  {
    name: 'New York Cheesecake',
    description: 'Vanilla bean, graham crust, berry compote.',
    category: 'Desserts',
    price: 10.5,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 8,
    available: true,
    stock: 22
  },
  {
    name: 'Crème Brûlée',
    description: 'Madagascar vanilla custard, burnt sugar top.',
    category: 'Desserts',
    price: 9.5,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 7,
    available: true,
    stock: 20
  },
  {
    name: 'Apple Crumble',
    description: 'Cinnamon apples, oat topping, vanilla ice cream.',
    category: 'Desserts',
    price: 8.5,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 9,
    available: true,
    stock: 24
  },
  {
    name: 'Lemon Tart',
    description: 'Zesty lemon curd, shortcrust, whipped cream.',
    category: 'Desserts',
    price: 9,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 7,
    available: true,
    stock: 22
  },
  {
    name: 'Gelato Trio',
    description: 'Pistachio, chocolate, and salted caramel scoops.',
    category: 'Desserts',
    price: 8,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 5,
    available: true,
    stock: 30
  },
  {
    name: 'Chocolate Mousse',
    description: '70% dark chocolate, chantilly cream.',
    category: 'Desserts',
    price: 8.5,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 6,
    available: true,
    stock: 26
  },
  {
    name: 'Banoffee Pie',
    description: 'Toffee, banana, whipped cream, biscuit crust.',
    category: 'Desserts',
    price: 9,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 7,
    available: true,
    stock: 22
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
  },
  {
    name: 'Hibiscus Iced Tea',
    description: 'Tart, floral, lightly sweetened.',
    category: 'Beverages',
    price: 4.5,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 2,
    available: true,
    stock: 45
  },
  {
    name: 'Matcha Latte',
    description: 'Ceremonial grade matcha, oat milk by default.',
    category: 'Beverages',
    price: 6,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 3,
    available: true,
    stock: 40
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Soda, lime, mint, hint of jaggery syrup.',
    category: 'Beverages',
    price: 3.5,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 2,
    available: true,
    stock: 60
  },
  {
    name: 'Mango Lassi',
    description: 'Alphonso mango, yogurt, cardamom.',
    category: 'Beverages',
    price: 5.5,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 4,
    available: true,
    stock: 35
  },
  {
    name: 'Iced Chai Latte',
    description: 'Spiced Assam tea, milk, brown sugar.',
    category: 'Beverages',
    price: 4.5,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 3,
    available: true,
    stock: 38
  },
  {
    name: 'Sparkling Elderflower',
    description: 'Elderflower cordial, soda, lemon wheel.',
    category: 'Beverages',
    price: 4.5,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 2,
    available: true,
    stock: 40
  },
  {
    name: 'Watermelon Cooler',
    description: 'Fresh watermelon, lime, mint.',
    category: 'Beverages',
    price: 4,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 2,
    available: true,
    stock: 42
  },
  {
    name: 'Hot Chocolate',
    description: 'Dark cocoa, steamed milk, marshmallows.',
    category: 'Beverages',
    price: 4.5,
    dietary: ['vegetarian'],
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 4,
    available: true,
    stock: 36
  },
  {
    name: 'Double Espresso',
    description: 'Fresh pull, 18g dose, 27s extraction.',
    category: 'Beverages',
    price: 3,
    dietary: ['vegan', 'gluten-free'],
    imageUrl:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    prepMinutes: 2,
    available: true,
    stock: 80
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
