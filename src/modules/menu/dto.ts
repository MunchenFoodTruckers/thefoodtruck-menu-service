export class CreateMenuItemDto {
    name: string;
    description?: string;
    price: number;
    image?: string;
    categoryId: string;
    available?: boolean;
    dietary?: string[];
}

export class UpdateMenuItemDto {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    categoryId?: string;
    available?: boolean;
    dietary?: string[];
}

export class CreateCategoryDto {
    name: string;
    description?: string;
}
