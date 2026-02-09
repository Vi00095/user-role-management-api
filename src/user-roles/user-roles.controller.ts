/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { AssignRoleToUserDto } from './dto/assign-role-to-user.dto';
import { UpdateRoleFromUserDto } from './dto/update-role-from-user.dto';

@Controller('roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post('assign-role-to-user')
  async assignRoleToUser(@Body() { userId, roleId }: AssignRoleToUserDto) {
    return await this.userRolesService.assignRoleToUser(userId, roleId);
  }

  @Put('update-role-from-user')
  async updateRoleFromUser(@Body() { userId, roleId }: UpdateRoleFromUserDto) {
    return await this.userRolesService.updateRoleFromUser(userId, roleId);
  }
}
