import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Movie } from './movie.entity';


@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float' })
    rating: number; // Điểm đánh giá (0-10)

    @Column({ type: 'text', nullable: true })
    comment: string; // Bình luận

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Movie, (movie) => movie.reviews, { onDelete: 'CASCADE' })
    movie: Movie;

    @CreateDateColumn()
    createdAt: Date;
}
