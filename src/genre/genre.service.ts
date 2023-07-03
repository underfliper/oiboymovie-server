import { Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Genre[]> {
    return await this.prisma.genre.findMany();
  }
}
