import { Body, Controller, Get, NotFoundException, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthDtoPayload } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { PrismaService } from "../utils/prisma/prisma.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService, private prismaService: PrismaService) {
  }

  @Post("login")
  login(@Body() authLoginPayload: AuthDtoPayload) {
    return this.authService.validateUser(authLoginPayload);
  }

  @Get("me")
  async me() {
    // const user = await this.authService.validateUser(authLoginPayload);
    // return this.prismaService.user.findFirst({
    // });
  }
}
