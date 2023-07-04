import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  old: string;

  @IsNotEmpty()
  @IsString()
  new: string;

  @IsNotEmpty()
  @IsString()
  confirm: string;
}
