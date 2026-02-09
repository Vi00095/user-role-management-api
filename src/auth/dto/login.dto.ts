import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'johndoe@exemple.com' })
  email!: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'Pass-123' })
  password!: string;
}
