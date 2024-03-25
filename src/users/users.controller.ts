import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Ip,
  UseGuards,
  ParseIntPipe,
  Query, Delete
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoggerService } from "../utils/logger/logger.service";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";

@ApiTags("Users")
@ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Ip() ip?: string) {
    this.logger.log(`[Get One] Request from IP: ${ip}\t`, UsersController.name);
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Ip() ip: string) {
    this.logger.log(`[Create] Request from IP: ${ip}\t`, UsersController.name);
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto, @Ip() ip: string
  ) {
    this.logger.log(`[Update] Request from IP: ${ip}\t`, UsersController.name);
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Ip() ip: string) {
    this.logger.log(`[Delete] Request from IP: ${ip}\t`, UsersController.name);
    return this.usersService.remove(+id);
  }
}