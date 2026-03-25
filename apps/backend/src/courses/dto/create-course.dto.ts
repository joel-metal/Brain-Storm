import { IsString, IsOptional, IsInt, IsIn, Min, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString() @MinLength(3) title: string;
  @IsString() @MinLength(10) description: string;

  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  level?: string;

  @IsOptional() @IsInt() @Min(0) durationHours?: number;
}
