import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Ip, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoggerService } from "../utils/logger/logger.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  private readonly logger = new LoggerService(UsersController.name);

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Ip() ip: string) {
    this.logger.log(`[Get All] Request from IP: ${ip}\t`, UsersController.name);
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Ip() ip: string) {
    this.logger.log(`[Get One] Request from IP: ${ip}\t`, UsersController.name);
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Ip() ip: string) {
    this.logger.log(`[Create] Request from IP: ${ip}\t`, UsersController.name);
    return this.usersService.create(createUserDto);
  }
}