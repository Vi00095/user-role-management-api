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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('auth_token')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOperation({ summary: 'Crée une permission' })
  @Permissions('role:manage')
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Liste toutes les permissions' })
  @Permissions('role:manage')
  @Get()
  async findAll() {
    return await this.permissionsService.findAll();
  }

  @ApiOperation({ summary: 'Récupère une permission grâce à son identifiant' })
  @Permissions('role:manage')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Modifie une permission' })
  @Permissions('role:manage')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionsService.update(id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Supprime une permission' })
  @Permissions('role:manage')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissionsService.remove(id);
  }
}
