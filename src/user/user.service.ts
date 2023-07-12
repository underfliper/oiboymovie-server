import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { plainToInstance } from 'class-transformer';

import { EditUserDto, UserReviewsDto } from './dto';
import { PaginationDto } from 'src/pagination/dto';
import { AddReviewDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { MovieShortDto } from 'src/movie/dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async getProfile(userId: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      return plainToInstance(UserDto, user);
    }

    throw new NotFoundException('User not found.');
  }

  async updateProfile(userId: number, dto: EditUserDto): Promise<UserDto> {
    const isSameUser = dto.email
      ? await this.prisma.user.findFirst({
          where: { email: dto.email },
        })
      : null;

    if (isSameUser && String(userId) !== String(isSameUser.id)) {
      throw new NotFoundException('Email busy.');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    return plainToInstance(UserDto, user);
  }

  async getUserReviewedMovies(
    userId: number,
    query: PaginationDto,
  ): Promise<UserReviewsDto> {
    const { perPage, skip } = this.paginationService.getPagination(query);

    const reviews = await this.prisma.review.findMany({
      where: { userId: userId },
      include: { movie: true },
      orderBy: { publishDate: 'desc' },
      skip,
      take: perPage,
    });

    return plainToInstance(UserReviewsDto, {
      reviews: reviews,
      length: await this.prisma.review.count({ where: { userId: userId } }),
    });
  }

  async addReview(userId: number, dto: AddReviewDto): Promise<Review> {
    const review = await this.prisma.review.create({
      data: {
        rating: dto.rating,
        text: dto.text,
        publishDate: new Date(),
        user: {
          connect: {
            id: userId,
          },
        },
        movie: {
          connect: {
            id: dto.movieId,
          },
        },
      },
    });

    return review;
  }

  async getRecommendedMovies(userId: number): Promise<MovieShortDto[]> {
    const { data } = await this.httpService.axiosRef.get<number[]>(
      `${this.config.get<string>(
        'RECOMMENDATIONS_BASE_URL',
      )}/by-user/${userId}`,
    );

    const movies = await this.prisma.movie.findMany({
      where: { id: { in: data } },
    });

    return plainToInstance(MovieShortDto, movies);
  }
}
