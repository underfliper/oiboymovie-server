import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class UserShortDto {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;
}
