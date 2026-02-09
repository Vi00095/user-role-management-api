import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Permissions('user:read')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Permissions('user:read')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
