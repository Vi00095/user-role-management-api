/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const exists = await this.findByName(createRoleDto.name);
    if (exists) throw new ConflictException('Ce rôle existe déjà');

    return await this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    return await this.prisma.role.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.role.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.prisma.role.findUnique({
      where: { name },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const exists = await this.findOne(id);
    if (!exists) throw new BadRequestException('Rôleintrouvable');

    if (updateRoleDto.name) {
      const other = await this.findByName(updateRoleDto.name);
      if (other && other.id !== id)
        throw new ConflictException('Ce rôle existe déjà');
    }

    return await this.prisma.role.update({
      data: updateRoleDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const exists = await this.findOne(id);
    if (!exists) throw new BadRequestException('Rôleintrouvable');

    return await this.prisma.role.delete({
      where: { id },
    });
  }
}
