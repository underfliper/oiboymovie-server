import { Exclude, Expose, Type } from 'class-transformer';
import { MovieShortDto } from 'src/movie/dto';

@Exclude()
export class ReviewDto {
  @Expose()
  rating: number;

  @Expose()
  text: string;

  @Expose()
  publishDate: Date;

  @Expose()
  @Type(() => MovieShortDto)
  movie: MovieShortDto[];
}

export class UserReviewsDto {
  @Type(() => ReviewDto)
  reviews: UserReviewsDto[];

  length: number;
}
