import { CreateDivisionDto } from "./dto/create-division.dto";
import { UpdateDivisionDto } from "./dto/update-division.dto";
import { PrismaService } from "../utils/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DivisionService {
  constructor(private prismaService: PrismaService) {
  }

  create(createDivisionDto: CreateDivisionDto) {
    return this.prismaService.division.create(
      {
        data: {
          name: createDivisionDto.name
        }
      }
    );
  }

  async findAll() {
    return this.prismaService.division.findMany();
  }

  async findOne(id: number) {
    const data = await this.prismaService.division.findUnique({
      where: {
        id: id
      }
    });

    if (data === null) {
      throw new NotFoundException("Division not found");
    }

    return data;
  }

  async update(id: number, updateDivisionDto: UpdateDivisionDto) {
    const data = await this.prismaService.division.update({
      where: {
        id: id
      },
      data: {
        name: updateDivisionDto.name
      }
    });

    if (data === null) {
      throw new NotFoundException("Division not found");
    }

    return data;
  }

  async remove(id: number) {
    const data = await this.prismaService.division.findUnique({
      where: {
        id
      }
    });

    if (data === null) {
      throw new NotFoundException("Division not found");
    }

    return this.prismaService.division.delete({
      where: {
        id: id
      }
    });
  }

}
