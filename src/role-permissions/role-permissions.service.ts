/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolePermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async grantPermissionToRole(roleId: string, permissionId: string) {
    const exists = await this.findOne(roleId, permissionId);
    if (exists) throw new ConflictException('Permission déjà ajoutée');

    return await this.prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  }

  async revokePermissionFromRole(roleId: string, permissionId: string) {
    const exists = await this.findOne(roleId, permissionId);
    if (!exists)
      throw new BadRequestException("La permission n'a pas encore été ajoutée");

    return await this.prisma.rolePermission.delete({
      where: { roleId_permissionId: { roleId, permissionId } },
    });
  }

  private async findOne(roleId: string, permissionId: string) {
    return await this.prisma.rolePermission.findUnique({
      where: { roleId_permissionId: { roleId, permissionId } },
    });
  }
}
