import { Controller, Get, Post, Body, Patch, Param, Delete, Ip } from "@nestjs/common";
import { DivisionService } from "./division.service";
import { CreateDivisionDto } from "./dto/create-division.dto";
import { UpdateDivisionDto } from "./dto/update-division.dto";
import { LoggerService } from "../utils/logger/logger.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Division")
@Controller("division")
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {
  }

  private readonly logger = new LoggerService(DivisionController.name);

  @Post()
  create(@Body() createDivisionDto: CreateDivisionDto) {
    return this.divisionService.create(createDivisionDto);
  }

  @Get()
  getAll(@Ip() ip: string) {
    this.logger.log(`[Get All] Request from IP: ${ip}\t`, DivisionController.name);
    return this.divisionService.findAll();
  }

  @Get(":id")
  getOne(@Ip() ip: string, @Param("id") id: string) {
    this.logger.log(`[Get One] Request from IP: ${ip}\t`, DivisionController.name);
    return this.divisionService.findOne(+id);
  }

  @Patch(":id")
  update(@Ip() ip: string, @Param("id") id: string, @Body() updateDivisionDto: UpdateDivisionDto) {
    this.logger.log(`[Get One] Request from IP: ${ip}\t`, DivisionController.name);
    return this.divisionService.update(+id, updateDivisionDto);
  }

  @Delete(":id")
  delete(@Ip() ip: string, @Param("id") id: string) {
    this.logger.log(`[Get One] Request from IP: ${ip}\t`, DivisionController.name);
    return this.divisionService.remove(+id);
  }
}
