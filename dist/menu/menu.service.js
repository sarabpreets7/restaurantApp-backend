var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
const seedMenu = () => [
    // Appetizers
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
        stock: 25,
        addOns: [{ id: 'ao1', label: 'Extra parmesan', price: 1.5 }]
    },
    {
        id: uuid(),
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
        id: uuid(),
        name: 'Burrata Plate',
        description: 'Heirloom tomatoes, basil oil, grilled sourdough.',
        category: 'Appetizers',
        price: 14,
        dietary: ['vegetarian'],
        imageUrl: '/images/burrata.jpg',
        prepMinutes: 8,
        available: true,
        stock: 15
    },
    // Main Course
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
        stock: 22
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
        stock: 12,
        addOns: [
            { id: 'ao2', label: 'Add mushrooms', price: 3 },
            { id: 'ao3', label: 'Add shrimp', price: 6 }
        ]
    },
    {
        id: uuid(),
        name: 'Margherita Pizza',
        description: 'San Marzano tomato, fresh mozzarella, basil.',
        category: 'Main Course',
        price: 17,
        dietary: ['vegetarian'],
        imageUrl: '/images/pizza.jpg',
        prepMinutes: 14,
        available: true,
        stock: 20
    },
    {
        id: uuid(),
        name: 'Grilled Salmon',
        description: 'Charred broccolini, lemon butter, farro.',
        category: 'Main Course',
        price: 24,
        dietary: [],
        imageUrl: '/images/salmon.jpg',
        prepMinutes: 16,
        available: true,
        stock: 16
    },
    {
        id: uuid(),
        name: 'Mushroom Risotto',
        description: 'Porcini, pecorino, chive oil.',
        category: 'Main Course',
        price: 18,
        dietary: ['vegetarian', 'gluten-free'],
        imageUrl: '/images/risotto.jpg',
        prepMinutes: 19,
        available: true,
        stock: 18
    },
    {
        id: uuid(),
        name: 'Chicken Katsu Bowl',
        description: 'Crispy chicken, cabbage slaw, yuzu mayo.',
        category: 'Main Course',
        price: 15,
        dietary: [],
        imageUrl: '/images/katsu.jpg',
        prepMinutes: 15,
        available: true,
        stock: 25
    },
    {
        id: uuid(),
        name: 'Paneer Tikka Wrap',
        description: 'Mint chutney, pickled onions, garlic naan.',
        category: 'Main Course',
        price: 14,
        dietary: ['vegetarian'],
        imageUrl: '/images/paneer-wrap.jpg',
        prepMinutes: 12,
        available: true,
        stock: 20
    },
    // Desserts
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
        stock: 18
    },
    {
        id: uuid(),
        name: 'Mango Panna Cotta',
        description: 'Passionfruit coulis, toasted coconut.',
        category: 'Desserts',
        price: 9,
        dietary: ['gluten-free', 'vegetarian'],
        imageUrl: '/images/pannacotta.jpg',
        prepMinutes: 6,
        available: true,
        stock: 20
    },
    {
        id: uuid(),
        name: 'Tiramisu Jar',
        description: 'Espresso-soaked ladyfingers, mascarpone cream.',
        category: 'Desserts',
        price: 10,
        dietary: ['vegetarian'],
        imageUrl: '/images/tiramisu.jpg',
        prepMinutes: 5,
        available: true,
        stock: 22
    },
    // Beverages
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
        stock: 50
    },
    {
        id: uuid(),
        name: 'Hibiscus Iced Tea',
        description: 'Tart, floral, lightly sweetened.',
        category: 'Beverages',
        price: 4.5,
        dietary: ['vegan', 'gluten-free'],
        imageUrl: '/images/hibiscus-tea.jpg',
        prepMinutes: 2,
        available: true,
        stock: 40
    },
    {
        id: uuid(),
        name: 'Matcha Latte',
        description: 'Ceremonial grade matcha, oat milk by default.',
        category: 'Beverages',
        price: 6,
        dietary: ['vegan', 'gluten-free'],
        imageUrl: '/images/matcha.jpg',
        prepMinutes: 3,
        available: true,
        stock: 35,
        addOns: [{ id: 'ao4', label: 'Whole milk', price: 0 }]
    }
];
let MenuService = class MenuService {
    menu = seedMenu();
    list(filters) {
        const search = filters?.search ? String(filters.search).toLowerCase() : '';
        const category = filters?.category ? String(filters.category) : '';
        const dietary = filters?.dietary ? String(filters.dietary) : '';
        const minPrice = Number.isFinite(filters?.minPrice) ? filters?.minPrice : undefined;
        const maxPrice = Number.isFinite(filters?.maxPrice) ? filters?.maxPrice : undefined;
        return this.menu.filter((item) => {
            const matchesSearch = !search.length ||
                item.name.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search);
            const matchesCategory = !category.length || item.category === category;
            const matchesDietary = !dietary.length || item.dietary.includes(dietary);
            const matchesMin = minPrice == null || item.price >= minPrice;
            const matchesMax = maxPrice == null || item.price <= maxPrice;
            return matchesSearch && matchesCategory && matchesDietary && matchesMin && matchesMax;
        });
    }
    get(id) {
        return this.menu.find((m) => m.id === id);
    }
    adjustStock(id, delta) {
        const item = this.get(id);
        if (item)
            item.stock += delta;
    }
    reset(data) {
        this.menu = data ?? seedMenu();
    }
};
MenuService = __decorate([
    Injectable()
], MenuService);
export { MenuService };
