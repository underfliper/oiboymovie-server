import { Type } from 'class-transformer';
import { ReviewDto } from './review.dto';

export class GetReviewsResponseDto {
  @Type(() => ReviewDto)
  reviews: ReviewDto[];

  length: number;
}
