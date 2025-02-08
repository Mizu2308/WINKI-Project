import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Review } from './review.entity';
import { MovieStatus } from 'src/movies/movies.enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  director!: string;

  @Column({ enum: MovieStatus, default: MovieStatus.COMING_SOON })
  status!: MovieStatus;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  releaseYear!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
}
