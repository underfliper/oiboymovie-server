import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';
import { AtGuard } from '../common/guards';
import { GetCurrentUser } from '../common/decorators';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(AtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@GetCurrentUser('id') userId: number): Promise<User> {
    return this.userService.getProfile(userId);
  }

  @Patch('profile')
  updateProfile(
    @GetCurrentUser('id') userId: number,
    @Body() dto: EditUserDto,
  ): Promise<User> {
    return this.userService.updateProfile(userId, dto);
  }
}
