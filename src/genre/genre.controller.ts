import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from '@prisma/client';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAll(): Promise<Genre[]> {
    return this.genreService.getAll();
  }
}
