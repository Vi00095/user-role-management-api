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

@Injectable()
export class UserRolesService {
  constructor(private readonly prisma: PrismaService) {}

  async assignRoleToUser(userId: string, roleId: string) {
    const exists = await this.findOne(userId, roleId);
    if (exists) throw new ConflictException('Rôle déjà ajouté');

    return await this.prisma.userRole.create({
      data: { userId, roleId },
    });
  }

  async updateRoleFromUser(userId: string, roleId: string) {
    const exists = await this.findOne(userId, roleId);
    if (!exists)
      throw new BadRequestException("La rôle n'a pas encore été ajouté");

    return await this.prisma.userRole.delete({
      where: { userId_roleId: { userId, roleId } },
    });
  }

  private async findOne(userId: string, roleId: string) {
    return await this.prisma.userRole.findUnique({
      where: { userId_roleId: { userId, roleId } },
    });
  }
}
