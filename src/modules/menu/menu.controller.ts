import { Body, Controller, Get, Post, Put, Delete, Param } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuItemDto, UpdateMenuItemDto, CreateCategoryDto } from "./dto";

@Controller()
export class MenuController {
    constructor(private readonly service: MenuService) { }

    @Get("/api/menu/health")
    health() {
        return { ok: true, service: "menu" };
    }

    // Menu Items
    @Get("/api/menu")
    findAll() {
        return this.service.findAll();
    }

    @Get("/api/menu/:id")
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Post("/api/menu")
    create(@Body() dto: CreateMenuItemDto) {
        return this.service.create(dto);
    }

    @Put("/api/menu/:id")
    update(@Param("id") id: string, @Body() dto: UpdateMenuItemDto) {
        return this.service.update(id, dto);
    }

    @Delete("/api/menu/:id")
    remove(@Param("id") id: string) {
        return this.service.remove(id);
    }

    // Categories
    @Get("/api/menu/categories")
    findAllCategories() {
        return this.service.findAllCategories();
    }

    @Get("/api/menu/categories/:id")
    findCategory(@Param("id") id: string) {
        return this.service.findCategory(id);
    }

    @Post("/api/menu/categories")
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.service.createCategory(dto);
    }
}
