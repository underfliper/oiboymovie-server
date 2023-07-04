import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto';

export enum EnumMovieSort {
  HIGH_RATING = 'high-rating',
  LOW_RATING = 'low-rating',
  HIGH_POPULARITY = 'high-popularity',
  LOW_POPULARITY = 'low-popularity',
}

export class GetAllMoviesQueryDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  genreId: number;

  @IsOptional()
  @IsEnum(EnumMovieSort)
  sort?: EnumMovieSort;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}
