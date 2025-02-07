import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Movie } from './movie.entity';


@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Movie, (movie) => movie.id)
    movie: Movie;

    @Column()
    rating: number;

    @Column({ nullable: true })
    comment: string;
}
