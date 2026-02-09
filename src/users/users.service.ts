/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      omit: { password: true },
    });
  }

  async findOne(id: string, includePassword?: boolean) {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: { password: !includePassword },
    });
  }

  async findByEmail(email: string, includePassword?: boolean) {
    return await this.prisma.user.findUnique({
      where: { email },
      omit: { password: !includePassword },
    });
  }
}
