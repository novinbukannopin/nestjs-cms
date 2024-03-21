import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty()
  @IsEnum(Roles)
  name: Roles;
}
