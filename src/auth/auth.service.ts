/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email, true);
    if (!user) throw new BadRequestException('Utilisateur introuvable');

    if (user.status !== 'ACTIVE')
      throw new UnauthorizedException('Compte inactif');

    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword)
      throw new BadRequestException('Mot de passe incorrect');

    const { password, ...rest } = user;
    return rest;
  }

  async login(user) {
    if (!user) throw new UnauthorizedException('Utilisateur introuvable');
    const tmp = await this.usersService.findOne(user.id);
    if (!tmp) throw new UnauthorizedException('Connexion impossible');

    return {
      auth_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async register({
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
  }: RegisterDto) {
    const exists = await this.usersService.findByEmail(email);
    if (exists) throw new ConflictException('Adresse e-mail déjà utilisée');

    if (password !== passwordConfirmation)
      throw new BadRequestException('Les mots de passe ne correspondent pas');

    const hash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { firstName, lastName, email, password: hash },
    });

    return await this.login(user);
  }
}
