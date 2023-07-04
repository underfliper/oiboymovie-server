import { Exclude, Expose, Transform } from 'class-transformer';

export class MovieDto {
  @Transform(({ value }) => {
    const newValue = value.map((item) => ({
      id: item.genre.id,
      name: item.genre.name,
    }));
    return newValue;
  })
  genres: Genre[];
}

@Exclude()
export class Genre {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
