/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AssignRoleToUserDto } from './dto/assign-role-to-user.dto';
import { UpdateRoleFromUserDto } from './dto/update-role-from-user.dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  async assignRoleToUser(@Body() { userId, roleId }: AssignRoleToUserDto) {
    return await this.userRolesService.assignRoleToUser(userId, roleId);
  }

  async updateRoleFromUser(@Body() { userId, roleId }: UpdateRoleFromUserDto) {
    return await this.userRolesService.updateRoleFromUser(userId, roleId);
  }
}
