import { Injectable } from '@nestjs/common';
import { CreateBuyCourseDto } from './dto/create-buy_course.dto';
import { UpdateBuyCourseDto } from './dto/update-buy_course.dto';

@Injectable()
export class BuyCoursesService {
  create(createBuyCourseDto: CreateBuyCourseDto) {
    return 'This action adds a new buyCourse';
  }

  findAll() {
    return `This action returns all buyCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyCourse`;
  }

  update(id: number, updateBuyCourseDto: UpdateBuyCourseDto) {
    return `This action updates a #${id} buyCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyCourse`;
  }
}
