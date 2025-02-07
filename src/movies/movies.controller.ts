import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from 'src/helper/auth/roles.decorator';
import { RolesGuard } from 'src/helper/auth/roles.guard';
import { JwtAuthGuard } from 'src/helper/auth/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    async createMovie(@Body() body: { title: string; description?: string; director?: string; releaseYear?: number }) {
        return this.moviesService.createMovie(body.title, body.description, body.director, body.releaseYear);
    }

    @Get()
    async getMovies() {
        return this.moviesService.findAllMovies();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async deleteMovie(@Param('id') id: number) {
        return this.moviesService.deleteMovie(id);
    }
}
