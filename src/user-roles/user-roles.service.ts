/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserRolesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async assignRoleToUser(userId: string, roleId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new BadRequestException('Utilisateur introuvable');

    const role = await this.rolesService.findOne(roleId);
    if (!role) throw new BadRequestException('Rôle introuvable');

    const exists = await this.prisma.userRole.findUnique({
      where: { userId_roleId: { userId, roleId } },
    });
    if (exists) throw new ConflictException('Rôle déjà ajouté');

    return await this.prisma.userRole.create({
      data: { userId, roleId },
    });
  }

  async updateRoleFromUser(userId: string, roleId: string, oldRoleId: string) {
    await this.prisma.userRole.delete({
      where: { userId_roleId: { userId, roleId: oldRoleId } },
    });

    return await this.assignRoleToUser(userId, roleId);
  }
}
