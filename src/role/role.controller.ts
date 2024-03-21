import { Controller, Get, Post, Body, Patch, Param, Delete, Ip } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags } from "@nestjs/swagger";
import { LoggerService } from "../utils/logger/logger.service";

@ApiTags("Role")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  private readonly logger = new LoggerService(RoleController.name);

  @Post()
  create(@Ip() ip: string, @Body() createRoleDto: CreateRoleDto) {
    this.logger.log(`[Post] Request from IP: ${ip}\t`, RoleController.name);
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Ip() ip: string) {
    this.logger.log(`[Get All] Request from IP: ${ip}\t`, RoleController.name);
    return this.roleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(+id);
  }
}
