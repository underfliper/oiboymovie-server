import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      delete user.password;
      return user;
    }
    throw new NotFoundException('User not found.');
  }

  async updateProfile(userId: number, dto: EditUserDto): Promise<User> {
    console.log(dto.email);

    const isSameUser = dto.email
      ? await this.prisma.user.findFirst({
          where: { email: dto.email },
        })
      : null;

    console.log(isSameUser);

    if (isSameUser && String(userId) !== String(isSameUser.id)) {
      throw new NotFoundException('Email busy.');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    delete user.password;
    delete user.refreshToken;

    return user;
  }
}
