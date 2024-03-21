import { Module } from "@nestjs/common";
import { DivisionService } from "./division.service";
import { DivisionController } from "./division.controller";
import { PrismaService } from "../utils/prisma/prisma.service";

@Module({
  controllers: [DivisionController],
  providers: [DivisionService, PrismaService]
})
export class DivisionModule {
}
