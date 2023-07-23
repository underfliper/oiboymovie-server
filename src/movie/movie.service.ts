import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';

import {
  EnumMovieSort,
  GetAllMoviesQueryDto,
  GetAllMoviesResponseDto,
  GetReviewsQueryDto,
  GetReviewsResponseDto,
  MovieDto,
  MovieShortDto,
  ReviewDto,
} from './dto';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async find(query: GetAllMoviesQueryDto): Promise<GetAllMoviesResponseDto> {
    console.log(query);

    const { sort, searchTerm, genreId } = query;

    const prismaSort: Prisma.MovieOrderByWithRelationInput[] = [];

    if (sort === EnumMovieSort.HIGH_POPULARITY) {
      prismaSort.push({ popularity: 'desc' });
    } else if (sort === EnumMovieSort.LOW_POPULARITY) {
      prismaSort.push({ popularity: 'asc' });
    } else if (sort === EnumMovieSort.LOW_RATING) {
      prismaSort.push({ vote_average: 'asc' });
    } else {
      prismaSort.push({ vote_average: 'desc' });
    }

    const searchTermFilter: Prisma.MovieWhereInput = searchTerm
      ? {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }
      : {};

    const genreFilter: Prisma.MovieWhereInput = genreId
      ? {
          genres: {
            some: { genreId: genreId },
          },
        }
      : {};

    const prismaFilter: Prisma.MovieWhereInput = {
      AND: [searchTermFilter, genreFilter],
    };

    const { perPage, skip } = this.paginationService.getPagination(query);

    const movies = await this.prisma.movie.findMany({
      where: prismaFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
    });

    return plainToInstance(GetAllMoviesResponseDto, {
      movies: movies,
      length: await this.prisma.movie.count({ where: prismaFilter }),
    });
  }

  async getAllMovies(): Promise<MovieShortDto[]> {
    const movies = await this.prisma.movie.findMany();

    return plainToInstance(MovieShortDto, movies);
  }

  async getById(movieId: number): Promise<MovieDto> {
    const movie = await this.prisma.movie.findFirst({
      where: { id: movieId },
      include: {
        genres: { include: { genre: true } },
      },
    });

    if (!movie) throw new NotFoundException('Movie not found.');

    return plainToInstance(MovieDto, movie);
  }

  async getHotMovies(): Promise<MovieShortDto[]> {
    const movies = await this.prisma.movie.findMany({
      orderBy: { popularity: 'desc' },
      take: 15,
    });

    return plainToInstance(MovieShortDto, movies);
  }

  async getNewMovies(): Promise<MovieShortDto[]> {
    const movies = await this.prisma.movie.findMany({
      orderBy: { release_date: 'desc' },
      take: 15,
    });

    return plainToInstance(MovieShortDto, movies);
  }

  async getMovieReviews(
    query: GetReviewsQueryDto,
  ): Promise<GetReviewsResponseDto> {
    const { movieId } = query;
    const { perPage, skip } = this.paginationService.getPagination(query);

    const reviews = await this.prisma.review.findMany({
      where: { movieId: movieId },
      include: { user: true },
      orderBy: { publishDate: 'desc' },
      skip,
      take: perPage,
    });

    return {
      reviews: plainToInstance(ReviewDto, reviews),
      length: await this.prisma.review.count({ where: { movieId: movieId } }),
    };
  }

  async getSimilarMovies(movieId: number): Promise<MovieShortDto[]> {
    const { data } = await this.httpService.axiosRef.get<number[]>(
      `${this.config.get<string>(
        'RECOMMENDATIONS_BASE_URL',
      )}/by-movie/${movieId}`,
    );

    const movies = await this.prisma.movie.findMany({
      where: { id: { in: data } },
    });

    return plainToInstance(MovieShortDto, movies);
  }
}
