import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MenuModule } from "./menu/menu.module";
import { PrismaService } from "./prisma.service";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), MenuModule],
    controllers: [],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class AppModule { }
