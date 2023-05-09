import { IsNotEmpty } from 'class-validator';
import { AuthDto } from './auth.dto';

export class RegisterDto extends AuthDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
