import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMoviesDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  director!: string;

  @IsNotEmpty()
  @IsInt()
  releaseYear!: number;
}
