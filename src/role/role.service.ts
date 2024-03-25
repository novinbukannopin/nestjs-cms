import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "../utils/prisma/prisma.service";

@Injectable()
export class RoleService {

  constructor(private prismaService: PrismaService
  ) {

  }

  create(createRoleDto: CreateRoleDto) {
    return this.prismaService.role.create({
      data: createRoleDto
    });
  }

  async findAll() {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true
      }
    });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
