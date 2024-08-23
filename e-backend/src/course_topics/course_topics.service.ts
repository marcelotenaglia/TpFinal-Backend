import { Injectable } from '@nestjs/common';
import { CreateCourseTopicDto } from './dto/create-course_topic.dto';
import { UpdateCourseTopicDto } from './dto/update-course_topic.dto';

@Injectable()
export class CourseTopicsService {
  create(createCourseTopicDto: CreateCourseTopicDto) {
    return 'This action adds a new courseTopic';
  }

  findAll() {
    return `This action returns all courseTopics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseTopic`;
  }

  update(id: number, updateCourseTopicDto: UpdateCourseTopicDto) {
    return `This action updates a #${id} courseTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseTopic`;
  }
}
