import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDtoPayload {

  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: "The email of the user" })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: "The password of the user" })
  password: string;
}