import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignRoleToUserDto {
  @IsString()
  @ApiProperty({ example: 'cmlfoo9ib0002rvav6ehnfaudd' })
  userId!: string;

  @IsString()
  @ApiProperty({ example: 'cmlfs5d45fdf5g0f5505dtts' })
  roleId!: string;
}
