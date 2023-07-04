import { Exclude, Expose, Type } from 'class-transformer';
import { UserShortDto } from 'src/user/dto';

@Exclude()
export class ReviewDto {
  @Expose()
  rating: number;

  @Expose()
  text: string;

  @Expose()
  publishDate: Date;

  @Expose()
  @Type(() => UserShortDto)
  user: UserShortDto[];
}
