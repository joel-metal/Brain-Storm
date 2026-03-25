import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

  findAll() {
    return this.repo.find({ where: { isPublished: true, isDeleted: false } });
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  create(instructorId: string, dto: CreateCourseDto): Promise<Course> {
    return this.repo.save(this.repo.create({ ...dto, instructorId }));
  }

  async update(
    id: string,
    dto: UpdateCourseDto,
    requesterId: string,
    requesterRole: string,
  ): Promise<Course> {
    const course = await this.findOne(id);

    if (requesterRole !== 'admin' && course.instructorId !== requesterId) {
      throw new ForbiddenException('You do not own this course');
    }

    return this.repo.save({ ...course, ...dto });
  }

  async softDelete(id: string): Promise<{ message: string }> {
    const course = await this.findOne(id);
    await this.repo.save({ ...course, isDeleted: true });
    return { message: 'Course deleted successfully' };
  }
}
