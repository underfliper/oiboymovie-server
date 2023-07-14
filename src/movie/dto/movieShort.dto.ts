import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MovieShortDto {
  @Expose()
  id: number;

  @Expose()
  poster_path: string;

  @Expose()
  release_date: Date;

  @Expose()
  runtime: number;

  @Expose()
  title: string;

  @Expose()
  overview: string;

  @Expose()
  vote_average: number;
}
