import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { In, Like, Repository } from 'typeorm';
import { CreateMoviesDto, GetMoviesDto } from './dto/movies.dto';
import { MovieStatus } from './movies.enum';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async createMovie(body: CreateMoviesDto): Promise<Movie> {
    const movie = this.moviesRepository.create(body);
    return this.moviesRepository.save(movie);
  }

  async findAllMovies(query: GetMoviesDto) {
    const { title, director, releaseYear, page = 1, limit = 10 } = query;

    const conditions = {
      status: In([MovieStatus.NOW_SHOWING, MovieStatus.COMING_SOON]),
    };

    if (title) {
      conditions['title'] = Like(`%${title}%`);
    }

    if (director) {
      conditions['director'] = Like(`%${director}%`);
    }

    if (releaseYear) {
      conditions['releaseYear'] = releaseYear;
    }

    const [movies, total] = await this.moviesRepository.findAndCount({
      where: conditions,
      order: { releaseYear: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: movies,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
  }

  async findMovieById(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async updateMovie(id: number, body: CreateMoviesDto): Promise<Movie> {
    const movie = await this.findMovieById(id);
    Object.assign(movie, body);
    return this.moviesRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.findMovieById(id);
    await this.moviesRepository.remove(movie);
  }
}
