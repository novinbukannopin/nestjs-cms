import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../utils/prisma/prisma.service";
import { UserDto } from "../division/dto/export/user.dto";
import { RoleService } from "../role/role.service";
import { DivisionService } from "../division/division.service";

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private roleService: RoleService,
    private divisionService: DivisionService
  ) {
  }

  async findAll(): Promise<UserDto[]> {
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

  async findOne(id: number): Promise<UserDto> {
    const data = await this.prismaService.user.findUnique({
      where: { id },
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
    });

    if (!data) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return data;
  }

  async create(createUserDto: CreateUserDto) {

    const role = await this.roleService.findOne(createUserDto.role_id);

    const division = await this.divisionService.findOne(createUserDto.division_id);

    return this.prismaService.user.create({
      data: {
        username: createUserDto.username,
        display_name: createUserDto.display_name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: {
          connect: {
            id: role.id
          }
        },
        division: {
          connect: {
            id: division.id
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.prismaService.user.findUnique({
      where: { id }
    });

    if (!data) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto, updatedAt: new Date()
      },
      select: {
        id: true,
        username: true,
        display_name: true,
        email: true
      }
    });
  }

  async remove(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prismaService.user.delete({
      where: { id }
    });
  }
}
