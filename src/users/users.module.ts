import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "../utils/prisma/prisma.service";
import { RoleService } from "../role/role.service";
import { DivisionService } from "../division/division.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, RoleService, DivisionService]
})
export class UsersModule {
}
