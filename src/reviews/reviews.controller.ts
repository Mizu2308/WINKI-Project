import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from 'src/helper/auth/jwt-auth.guard';
import { RolesGuard } from 'src/helper/auth/roles.guard';
import { Roles } from 'src/helper/auth/roles.decorator';
import { CreateReviewDto } from './dto/reviews.dto';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async addReview(@Request() req, @Body() body: CreateReviewDto) {
    return this.reviewsService.addReview(req.user.userId, body);
  }

  @Get(':movieId')
  async getReviews(@Param('movieId') movieId: number) {
    return this.reviewsService.getMovieReviews(movieId);
  }

  @Roles('admin')
  @Delete(':id')
  async deleteReview(@Param('id') id: number) {
    return this.reviewsService.deleteReview(id);
  }
}
