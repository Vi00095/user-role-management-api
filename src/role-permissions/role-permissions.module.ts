import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RolesModule, PermissionsModule],
  providers: [RolePermissionsService],
  controllers: [RolePermissionsController],
})
export class RolePermissionsModule {}
