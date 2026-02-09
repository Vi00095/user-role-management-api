import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [UsersModule, RolesModule],
  providers: [UserRolesService],
  controllers: [UserRolesController],
})
export class UserRolesModule {}
