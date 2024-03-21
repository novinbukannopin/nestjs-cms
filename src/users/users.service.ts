import { Get, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../utils/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {
  }

  findAll() {
    return this.prismaService.user.findMany(
      {
        select: {
          id: true,
          username: true,
          display_name: true,
          email: true,
          role: {
            select: {
              name: true
            }
          },
          division: {
            select: {
              name: true
            }
          },
          createdAt: true,
          updatedAt: true
        }
      }
    );
  }

  async findOne(id: number) {
    const data = await this.prismaService.user.findUnique({
      where: { id }
    });

    if (!data) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return data;
  }

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        display_name: createUserDto.display_name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: {
          connect: {
            id: createUserDto.role_id
          }
        },
        division: {
          connect: {
            id: createUserDto.division_id
          }
        }
      },
      select: {
        id: true,
        username: true,
        display_name: true,
        email: true
      }
    });
  }
}
