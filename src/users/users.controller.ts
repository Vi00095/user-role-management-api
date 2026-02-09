import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('auth_token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Liste tous les utilisateurs' })
  @Permissions('user:read')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Récupère un utilisateur grâce à son identifiant' })
  @Permissions('user:read')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
