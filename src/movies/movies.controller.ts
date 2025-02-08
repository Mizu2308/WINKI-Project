import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from 'src/helper/auth/roles.decorator';
import { RolesGuard } from 'src/helper/auth/roles.guard';
import { JwtAuthGuard } from 'src/helper/auth/jwt-auth.guard';
import { CreateMoviesDto, GetMoviesDto } from './dto/movies.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from 'src/config/aws/aws.service';

@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  @Roles('admin')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createMovie(
    @Body() body: CreateMoviesDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'video/mp4' }),
          new MaxFileSizeValidator({ maxSize: 500 * 1024 * 1024 }), // 500MB
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileUrl = await this.awsS3Service
      .uploadFile(file, 'movies')
      .catch((err) => {
        throw new BadRequestException(err.message);
      })
      .then((result) => result);

    return this.moviesService.createMovie({
      ...body,
      url: fileUrl,
      releaseYear: Number(body.releaseYear),
    });
  }

  @Get()
  async getMovies(@Query() query: GetMoviesDto) {
    return await this.moviesService.findAllMovies(query);
  }

  @Get(':id')
  async getMovieById(@Param('id') id: number) {
    return this.moviesService.findMovieById(id);
  }

  @Put(':id')
  async updateMovie(@Param('id') id: number, @Body() body: CreateMoviesDto) {
    return this.moviesService.updateMovie(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  async deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id);
  }
}
