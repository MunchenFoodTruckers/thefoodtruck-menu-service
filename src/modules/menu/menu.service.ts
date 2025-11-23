import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { InMemoryStorage, MenuItem, Category } from "../../storage/in-memory.service";
import { CreateMenuItemDto, UpdateMenuItemDto, CreateCategoryDto } from "./dto";

@Injectable()
export class MenuService {
    private inMemory: InMemoryStorage = new InMemoryStorage();
    private useInMemory: boolean = false;

    constructor(private prisma: PrismaService) {
        this.checkConnection();
    }

    private async checkConnection(): Promise<void> {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            this.useInMemory = false;
        } catch {
            this.useInMemory = true;
            console.log("📦 Using in-memory storage for menu service");
        }
    }

    async findAll(): Promise<any[]> {
        if (this.useInMemory) {
            return this.inMemory.findAllMenuItems();
        }
        return this.prisma.menuItem.findMany({ include: { category: true } });
    }

    async findOne(id: string): Promise<any> {
        if (this.useInMemory) {
            return this.inMemory.findMenuItemById(id);
        }
        return this.prisma.menuItem.findUnique({ where: { id }, include: { category: true } });
    }

    async create(dto: CreateMenuItemDto): Promise<any> {
        if (this.useInMemory) {
            return this.inMemory.createMenuItem({
                ...dto,
                available: dto.available ?? true,
                dietary: dto.dietary ?? []
            });
        }
        return this.prisma.menuItem.create({ data: dto });
    }

    async update(id: string, dto: UpdateMenuItemDto): Promise<any> {
        if (this.useInMemory) {
            return this.inMemory.updateMenuItem(id, dto);
        }
        return this.prisma.menuItem.update({ where: { id }, data: dto });
    }

    async remove(id: string): Promise<any> {
        if (this.useInMemory) {
            return this.inMemory.deleteMenuItem(id);
        }
        return this.prisma.menuItem.delete({ where: { id } });
    }

    async findAllCategories(): Promise<any[]> {
        if (this.useInMemory) {
            return this.inMemory.findAllCategories();
        }
        return this.prisma.category.findMany();
    }

    async findCategory(id: string): Promise<any> {
        if (this.useInMemory) {
            return this.inMemory.findCategoryById(id);
        }
        return this.prisma.category.findUnique({ where: { id } });
    }

    async createCategory(dto: CreateCategoryDto): Promise<any> {
        if (this.useInMemory) {
            return this.inMemory.createCategory(dto);
        }
        return this.prisma.category.create({ data: dto });
    }
}
