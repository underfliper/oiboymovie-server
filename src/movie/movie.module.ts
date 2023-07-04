import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PaginationService],
})
export class MovieModule {}
