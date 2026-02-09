/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const existsByName = await this.findByName(createPermissionDto.name);
    const existsBySlug = await this.findBySlug(createPermissionDto.slug);
    if (existsByName || existsBySlug)
      throw new ConflictException('Cette permission existe déjà');

    return await this.prisma.permission.create({
      data: createPermissionDto,
    });
  }

  async findAll() {
    return await this.prisma.permission.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.permission.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.prisma.permission.findUnique({
      where: { name },
    });
  }

  async findBySlug(slug: string) {
    return await this.prisma.permission.findUnique({
      where: { slug },
    });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const exists = await this.findOne(id);
    if (!exists) throw new BadRequestException('Permission introuvable');

    if (updatePermissionDto.name) {
      const existsByName = await this.findByName(updatePermissionDto.name);
      if (existsByName && existsByName.id !== id)
        throw new ConflictException('Cette permission existe déjà');
    }

    if (updatePermissionDto.slug) {
      const existsBySlug = await this.findByName(updatePermissionDto.slug);
      if (existsBySlug && existsBySlug.id !== id)
        throw new ConflictException('Cette permission existe déjà');
    }

    return await this.prisma.permission.update({
      data: updatePermissionDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const exists = await this.findOne(id);
    if (!exists) throw new BadRequestException('Permission introuvable');

    return await this.prisma.permission.delete({
      where: { id },
    });
  }
}
