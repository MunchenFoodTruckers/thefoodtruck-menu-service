import { Injectable } from "@nestjs/common";

export interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    categoryId: string;
    available: boolean;
    dietary: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable()
export class InMemoryStorage {
    private menuItems: Map<string, MenuItem> = new Map();
    private categories: Map<string, Category> = new Map();

    constructor() {
        this.seedData();
    }

    private seedData() {
        const categories: Category[] = [
            { id: "1", name: "Burgers", description: "Juicy burgers", createdAt: new Date(), updatedAt: new Date() },
            { id: "2", name: "Tacos", description: "Authentic tacos", createdAt: new Date(), updatedAt: new Date() },
            { id: "3", name: "Drinks", description: "Refreshing drinks", createdAt: new Date(), updatedAt: new Date() },
            { id: "4", name: "Desserts", description: "Sweet treats", createdAt: new Date(), updatedAt: new Date() }
        ];
        categories.forEach(cat => this.categories.set(cat.id, cat));

        const items: MenuItem[] = [
            {
                id: "1",
                name: "Classic Burger",
                description: "Beef patty with lettuce, tomato, and special sauce",
                price: 8.99,
                categoryId: "1",
                available: true,
                dietary: [],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "2",
                name: "Veggie Burger",
                description: "Plant-based patty with avocado",
                price: 9.99,
                categoryId: "1",
                available: true,
                dietary: ["vegetarian", "vegan"],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "3",
                name: "Chicken Taco",
                description: "Grilled chicken with salsa",
                price: 6.99,
                categoryId: "2",
                available: true,
                dietary: ["gluten-free"],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "4",
                name: "Lemonade",
                description: "Fresh squeezed lemonade",
                price: 3.99,
                categoryId: "3",
                available: true,
                dietary: ["vegan", "gluten-free"],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        items.forEach(item => this.menuItems.set(item.id, item));
    }

    async findAllMenuItems(): Promise<MenuItem[]> {
        return Array.from(this.menuItems.values());
    }

    async findMenuItemById(id: string): Promise<MenuItem | null> {
        return this.menuItems.get(id) || null;
    }

    async createMenuItem(data: Omit<MenuItem, "id" | "createdAt" | "updatedAt">): Promise<MenuItem> {
        const id = String(this.menuItems.size + 1);
        const item: MenuItem = {
            id,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.menuItems.set(id, item);
        return item;
    }

    async updateMenuItem(id: string, data: Partial<MenuItem>): Promise<MenuItem | null> {
        const item = this.menuItems.get(id);
        if (!item) return null;
        const updated = { ...item, ...data, updatedAt: new Date() };
        this.menuItems.set(id, updated);
        return updated;
    }

    async deleteMenuItem(id: string): Promise<MenuItem | null> {
        const item = this.menuItems.get(id);
        if (!item) return null;
        this.menuItems.delete(id);
        return item;
    }

    async findAllCategories(): Promise<Category[]> {
        return Array.from(this.categories.values());
    }

    async findCategoryById(id: string): Promise<Category | null> {
        return this.categories.get(id) || null;
    }

    async createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
        const id = String(this.categories.size + 1);
        const category: Category = {
            id,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.categories.set(id, category);
        return category;
    }
}
