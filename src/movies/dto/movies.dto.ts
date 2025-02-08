import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/helper/dto/pagination.dto';
import { MovieStatus } from '../movies.enum';

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
  @IsEnum(MovieStatus)
  status!: MovieStatus;

  @IsOptional()
  @IsString()
  url?: string;

  @IsNotEmpty()
  @IsString()
  releaseYear!: number;
}

export class GetMoviesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  releaseYear?: number;
}
