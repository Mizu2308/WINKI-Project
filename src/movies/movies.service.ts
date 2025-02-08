import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMoviesDto } from './dto/movies.dto';

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

  async findAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.moviesRepository.remove(movie);
  }
}
