import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty({ example: 'ADMIN' })
  name!: string;

  @IsString()
  @ApiProperty({ example: 'Un administrateur', required: false })
  description?: string;
}
