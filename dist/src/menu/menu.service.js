var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { v4 as uuid } from 'uuid';
const seedItems = [
    {
        name: 'Truffle Fries',
        description: 'Hand-cut fries with truffle oil and parmesan.',
        category: 'Appetizers',
        price: 9.5,
        dietary: ['vegetarian'],
        imageUrl: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        prepMinutes: 8,
        available: true,
        stock: 18
    },
    {
        name: 'Smoked Tofu Bowl',
        description: 'Brown rice, seasonal veggies, tamari glaze.',
        category: 'Main Course',
        price: 16,
        dietary: ['vegan', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1522184216315-dc618e9fbb52?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1548365328-8c6db3220c8e?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1514516345957-556ca7d90aaf?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1612874472278-5c1ef021b6b9?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
        prepMinutes: 12,
        available: true,
        stock: 22
    },
    {
        name: 'Molten Chocolate Cake',
        description: 'Served warm with vanilla bean gelato.',
        category: 'Desserts',
        price: 11,
        dietary: ['vegetarian'],
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        prepMinutes: 8,
        available: true,
        stock: 24
    },
    {
        name: 'Cold Brew',
        description: 'Single-origin, slow steeped.',
        category: 'Beverages',
        price: 5,
        dietary: ['vegan', 'gluten-free'],
        imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
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
        imageUrl: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=600&q=80',
        prepMinutes: 3,
        available: true,
        stock: 40
    }
];
const imageMap = {
    'Truffle Fries': 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=600&q=80',
    'Crispy Calamari': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    'Smoked Tofu Bowl': 'https://images.unsplash.com/photo-1522184216315-dc618e9fbb52?auto=format&fit=crop&w=600&q=80',
    'Ribeye Steak': 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=600&q=80',
    'Molten Chocolate Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    'Cold Brew': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    'Grilled Salmon': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80'
};
let MenuService = class MenuService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const count = await this.prisma.menuItem.count();
        if (count === 0) {
            await this.prisma.menuItem.createMany({
                data: seedItems.map((i) => ({
                    ...i,
                    id: uuid(),
                    dietary: JSON.stringify(i.dietary),
                    addOns: JSON.stringify(i.addOns ?? [])
                }))
            });
        }
    }
    async list(filters) {
        const items = await this.prisma.menuItem.findMany();
        return items
            .map((i) => ({
            ...i,
            imageUrl: !i.imageUrl || i.imageUrl.startsWith('/images')
                ? imageMap[i.name] ?? 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
                : i.imageUrl,
            dietary: JSON.parse(i.dietary ?? '[]'),
            addOns: i.addOns ? JSON.parse(i.addOns) : []
        }))
            .filter((item) => {
            const search = filters?.search?.toLowerCase() ?? '';
            const matchesSearch = !search ||
                item.name.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search);
            const matchesCategory = !filters?.category || item.category === filters.category;
            const matchesDietary = !filters?.dietary || item.dietary.includes(filters.dietary);
            const matchesMin = filters?.minPrice == null || item.price >= filters.minPrice;
            const matchesMax = filters?.maxPrice == null || item.price <= filters.maxPrice;
            return matchesSearch && matchesCategory && matchesDietary && matchesMin && matchesMax;
        });
    }
    async get(id) {
        const item = await this.prisma.menuItem.findUnique({ where: { id } });
        if (!item)
            return undefined;
        return {
            ...item,
            dietary: JSON.parse(item.dietary ?? '[]'),
            addOns: item.addOns ? JSON.parse(item.addOns) : []
        };
    }
    async adjustStock(id, delta) {
        await this.prisma.menuItem.update({
            where: { id },
            data: { stock: { increment: delta } }
        });
    }
};
MenuService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], MenuService);
export { MenuService };
