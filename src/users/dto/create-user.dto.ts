import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  display_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsNumber()
  @ApiProperty()
  role_id: number;

  @IsNumber()
  @ApiProperty()
  division_id: number;
}
