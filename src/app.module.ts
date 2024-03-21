import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./utils/prisma/prisma.module";
import { LoggerModule } from "./utils/logger/logger.module";
import { DivisionModule } from "./division/division.module";
import { RoleModule } from "./role/role.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [UsersModule, PrismaModule, LoggerModule, DivisionModule, RoleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
