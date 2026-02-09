import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRoleFromUserDto {
  @IsString()
  @ApiProperty({ example: 'cmlfoo9ib0002rvav6ehnfaudd' })
  userId!: string;

  @IsString()
  @ApiProperty({ example: 'cmlfs5d45fdf5g0f5505dtts' })
  roleId!: string;

  @IsString()
  @ApiProperty({ example: 'cmlfs508e84d8ze8g8u7i8o4' })
  oldRoleId!: string;
}
