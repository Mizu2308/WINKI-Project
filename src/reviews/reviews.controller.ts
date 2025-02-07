import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from 'src/helper/auth/jwt-auth.guard';
import { RolesGuard } from 'src/helper/auth/roles.guard';
import { Roles } from 'src/helper/auth/roles.decorator';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addReview(
        @Request() req,
        @Body() body: { movieId: number; rating: number; comment?: string },
    ) {
        return this.reviewsService.addReview(req.user.id, body.movieId, body.rating, body.comment);
    }

    @Get(':movieId')
    async getReviews(@Param('movieId') movieId: number) {
        return this.reviewsService.getMovieReviews(movieId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async deleteReview(@Param('id') id: number) {
        return this.reviewsService.deleteReview(id);
    }
}
