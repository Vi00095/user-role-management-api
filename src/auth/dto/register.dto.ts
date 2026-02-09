import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'John' })
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'Doe' })
  lastName!: string;

  @IsEmail()
  @ApiProperty({ example: 'johndoe@exemple.com' })
  email!: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'Pass-123' })
  password!: string;

  @IsString()
  @ApiProperty({ example: 'Pass-123' })
  passwordConfirmation!: string;
}
