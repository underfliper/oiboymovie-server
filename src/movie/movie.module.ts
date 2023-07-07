import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieService, PaginationService],
})
export class MovieModule {}
