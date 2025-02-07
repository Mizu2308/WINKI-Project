import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) { }

    async addReview(userId: number, movieId: number, rating: number, comment?: string) {
        if (rating < 0 || rating > 10) {
            throw new BadRequestException('Rating must be between 0 and 10');
        }

        const movie = await this.moviesRepository.findOne({ where: { id: movieId } });
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const review = this.reviewsRepository.create({ rating, comment, user, movie });
        return this.reviewsRepository.save(review);
    }

    async getMovieReviews(movieId: number) {
        return this.reviewsRepository.find({
            where: { movie: { id: movieId } },
            relations: ['user'],
        });
    }

    async deleteReview(reviewId: number) {
        const review = await this.reviewsRepository.findOne({ where: { id: reviewId } });
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        await this.reviewsRepository.remove(review);
    }
}
