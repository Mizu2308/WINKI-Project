import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from 'src/helper/auth/roles.decorator';
import { RolesGuard } from 'src/helper/auth/roles.guard';
import { JwtAuthGuard } from 'src/helper/auth/jwt-auth.guard';
import { CreateMoviesDto } from './dto/movies.dto';

@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles('admin')
  @Post()
  async createMovie(@Body() body: CreateMoviesDto) {
    return this.moviesService.createMovie(body);
  }

  @Get()
  async getMovies() {
    return this.moviesService.findAllMovies();
  }

  @Roles('admin')
  @Delete(':id')
  async deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id);
  }
}
