import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @ApiProperty({ example: 'Post creation' })
  name!: string;

  @IsString()
  @ApiProperty({ example: 'post:create' })
  slug!: string;

  @IsString()
  @ApiProperty({ example: "Création d'un article", required: false })
  description?: string;
}
