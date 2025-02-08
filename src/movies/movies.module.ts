import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from 'src/entities/movie.entity';
import { AwsS3Module } from 'src/config/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), AwsS3Module],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
