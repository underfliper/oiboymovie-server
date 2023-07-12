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

import { Review } from '@prisma/client';
import { AtGuard } from '../common/guards';
import { GetCurrentUser } from '../common/decorators';
import { UserService } from './user.service';
import { AddReviewDto, EditUserDto, UserReviewsDto } from './dto';
import { PaginationDto } from 'src/pagination/dto';
import { MovieShortDto } from 'src/movie/dto';
import { UserDto } from './dto/user.dto';

@UseGuards(AtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@GetCurrentUser('id') userId: number): Promise<UserDto> {
    return this.userService.getProfile(userId);
  }

  @Patch('profile')
  updateProfile(
    @GetCurrentUser('id') userId: number,
    @Body() dto: EditUserDto,
  ): Promise<UserDto> {
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

  @Get('recommended-movies')
  async getRecommendedMovies(
    @GetCurrentUser('id') userId: number,
  ): Promise<MovieShortDto[]> {
    return this.userService.getRecommendedMovies(userId);
  }
}
