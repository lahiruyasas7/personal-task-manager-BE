import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

  @ApiProperty({ description: 'The Email of the user', example: 'JohnDoe@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password of the user', example: '***************' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
