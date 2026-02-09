/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { GrantPermissionToRoleDto } from './dto/grant-permission-to-role.dto';
import { RevokePermissionFromRoleDto } from './dto/revoke-permission-from-role.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('auth_token')
@Controller('roles')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @ApiOperation({ summary: "Permet d'ajouter une permission à un rôle" })
  @Permissions('role:manage')
  @Post('grant-permission-to-role')
  async grantPermissionToRole(
    @Body() { roleId, permissionId }: GrantPermissionToRoleDto,
  ) {
    return await this.rolePermissionsService.grantPermissionToRole(
      roleId,
      permissionId,
    );
  }

  @ApiOperation({ summary: 'Permet de retirer une permission à un rôle' })
  @Permissions('role:manage')
  @Post('revoke-permission-from-role')
  async revokePermissionFromRole(
    @Body() { roleId, permissionId }: RevokePermissionFromRoleDto,
  ) {
    return await this.rolePermissionsService.revokePermissionFromRole(
      roleId,
      permissionId,
    );
  }
}
