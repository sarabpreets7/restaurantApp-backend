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
        imageUrl: '/images/truffle-fries.jpg',
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
        imageUrl: '/images/calamari.jpg',
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
        imageUrl: '/images/tofu-bowl.jpg',
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
        imageUrl: '/images/ribeye.jpg',
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
        imageUrl: '/images/cake.jpg',
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
        imageUrl: '/images/cold-brew.jpg',
        prepMinutes: 2,
        available: true,
        stock: 50
    }
];
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
