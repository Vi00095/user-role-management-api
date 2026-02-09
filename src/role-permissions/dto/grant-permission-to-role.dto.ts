import { IsString } from 'class-validator';

export class GrantPermissionToRoleDto {
  @IsString()
  roleId!: string;

  @IsString()
  permissionId!: string;
}
