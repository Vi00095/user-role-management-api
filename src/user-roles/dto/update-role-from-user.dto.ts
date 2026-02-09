import { IsString } from 'class-validator';

export class UpdateRoleFromUserDto {
  @IsString()
  userId!: string;

  @IsString()
  roleId!: string;
}
