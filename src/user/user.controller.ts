import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Review, User } from '@prisma/client';
import { AtGuard } from '../common/guards';
import { GetCurrentUser } from '../common/decorators';
import { UserService } from './user.service';
import { AddReviewDto, EditUserDto, UserReviewsDto } from './dto';
import { PaginationDto } from 'src/pagination/dto';

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

  @Get('reviews')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserReviewedMovies(
    @GetCurrentUser('id') userId: number,
    @Query() query: PaginationDto,
  ): Promise<UserReviewsDto> {
    return this.userService.getUserReviewedMovies(userId, query);
  }

  @Post('add-review')
  async addReview(
    @GetCurrentUser('id') userId: number,
    @Body() dto: AddReviewDto,
  ): Promise<Review> {
    return this.userService.addReview(userId, dto);
  }
}
