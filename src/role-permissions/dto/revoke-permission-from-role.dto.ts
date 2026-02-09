import { IsString } from 'class-validator';

export class RevokePermissionFromRoleDto {
  @IsString()
  roleId!: string;

  @IsString()
  permissionId!: string;
}
