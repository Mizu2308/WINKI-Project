import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  movieId!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
