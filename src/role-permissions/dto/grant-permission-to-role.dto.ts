import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GrantPermissionToRoleDto {
  @IsString()
  @ApiProperty({ example: 'cmlfoo9ib0002rvav6ehnfaudd' })
  roleId!: string;

  @IsString()
  @ApiProperty({ example: 'cmlfoo9ib0002dsdfrvav6ehd' })
  permissionId!: string;
}
