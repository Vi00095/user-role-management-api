import { IsString } from 'class-validator';

export class AssignRoleToUserDto {
  @IsString()
  userId!: string;

  @IsString()
  roleId!: string;
}
