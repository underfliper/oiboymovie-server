import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, ChangePasswordDto, RegisterDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser } from '../common/decorators';
import { AtGuard, RtGuard } from '../common/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: RegisterDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signin(dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser('id') userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @UseGuards(AtGuard)
  @Post('change-password')
  async changePassword(
    @GetCurrentUser('id') userId: number,
    @Body() dto: ChangePasswordDto,
  ): Promise<Boolean> {
    return this.authService.changePassword(userId, dto);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('id') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
