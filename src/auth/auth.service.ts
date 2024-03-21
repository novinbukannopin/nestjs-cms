import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthDtoPayload } from "./dto/auth.dto";
import { PrismaService } from "../utils/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(private prismaService: PrismaService, private jwtService: JwtService) {
  }

  async validateUser({ email, password }: AuthDtoPayload) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new UnauthorizedException("Email or password is incorrect.");
    }

    if (password === user.password) {
      const { password, ...result } = user;
      return this.jwtService.sign(result);
    }
  }
}
