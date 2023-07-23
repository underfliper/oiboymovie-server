import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  GetAllMoviesQueryDto,
  GetAllMoviesResponseDto,
  GetReviewsQueryDto,
  GetReviewsResponseDto,
  MovieDto,
  MovieShortDto,
} from './dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async find(
    @Query() query: GetAllMoviesQueryDto,
  ): Promise<GetAllMoviesResponseDto> {
    return this.movieService.find(query);
  }

  @Get('all')
  async getAllMovies(): Promise<MovieShortDto[]> {
    return this.movieService.getAllMovies();
  }

  @Get('hot')
  async getHotMovies(): Promise<MovieShortDto[]> {
    return this.movieService.getHotMovies();
  }

  @Get('new')
  async getNewMovies(): Promise<MovieShortDto[]> {
    return this.movieService.getNewMovies();
  }

  @Get('reviews')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getMovieReviews(
    @Query() query: GetReviewsQueryDto,
  ): Promise<GetReviewsResponseDto> {
    return this.movieService.getMovieReviews(query);
  }

  @Get(':id')
  async getById(@Param('id') movieId: string): Promise<MovieDto> {
    return this.movieService.getById(+movieId);
  }

  @Get(':id/similar')
  async getSimilar(@Param('id') movieId: string): Promise<MovieShortDto[]> {
    return this.movieService.getSimilarMovies(+movieId);
  }
}
