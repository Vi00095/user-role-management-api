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

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Permissions('role:manage')
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto);
  }

  @Permissions('role:manage')
  @Get()
  async findAll() {
    return await this.permissionsService.findAll();
  }

  @Permissions('role:manage')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findOne(id);
  }

  @Permissions('role:manage')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionsService.update(id, updatePermissionDto);
  }

  @Permissions('role:manage')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissionsService.remove(id);
  }
}
