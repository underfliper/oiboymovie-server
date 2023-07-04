import { Type } from 'class-transformer';
import { MovieShortDto } from './movieShort.dto';

export class GetAllMoviesResponseDto {
  @Type(() => MovieShortDto)
  movies: MovieShortDto[];

  length: number;
}
