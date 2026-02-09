/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('auth_token')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Crée un rôle' })
  @Permissions('role:manage')
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Liste tous les rôles' })
  @Permissions('role:manage')
  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'Récupère un rôle grâce à son identifiant' })
  @Permissions('role:manage')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(id);
  }

  @ApiOperation({ summary: 'Modifie un rôle' })
  @Permissions('role:manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Supprime un rôle' })
  @Permissions('role:manage')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(id);
  }
}
