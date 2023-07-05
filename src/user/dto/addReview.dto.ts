import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  text?: string;

  @IsNotEmpty()
  @IsNumber()
  movieId: number;
}
