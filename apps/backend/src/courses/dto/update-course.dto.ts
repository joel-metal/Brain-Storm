import { IsString, IsOptional, IsInt, IsIn, IsBoolean, Min, MinLength } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional() @IsString() @MinLength(3) title?: string;
  @IsOptional() @IsString() @MinLength(10) description?: string;

  @IsOptional()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  level?: string;

  @IsOptional() @IsInt() @Min(0) durationHours?: number;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}
