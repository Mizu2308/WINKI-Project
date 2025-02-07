import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from 'src/entities/review.entity';
import { Movie } from 'src/entities/movie.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Movie, User])], // Đảm bảo import các entity cần thiết
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule { }
