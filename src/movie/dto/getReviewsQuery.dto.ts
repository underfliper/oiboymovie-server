import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto';

export class GetReviewsQueryDto extends PaginationDto {
  @Type(() => Number)
  @IsNumber()
  movieId: number;
}
