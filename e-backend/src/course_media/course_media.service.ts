import { Injectable } from '@nestjs/common';
import { CreateCourseMediaDto } from './dto/create-course_media.dto';
import { UpdateCourseMediaDto } from './dto/update-course_media.dto';

@Injectable()
export class CourseMediaService {
  create(createCourseMediaDto: CreateCourseMediaDto) {
    return 'This action adds a new courseMedia';
  }

  findAll() {
    return `This action returns all courseMedia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseMedia`;
  }

  update(id: number, updateCourseMediaDto: UpdateCourseMediaDto) {
    return `This action updates a #${id} courseMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseMedia`;
  }
}
