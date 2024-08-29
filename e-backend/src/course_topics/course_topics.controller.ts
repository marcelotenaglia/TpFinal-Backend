import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseTopicsService } from './course_topics.service';
import { CreateCourseTopicDto } from './dto/create-course_topic.dto';
import { UpdateCourseTopicDto } from './dto/update-course_topic.dto';

@Controller('course-topics')
export class CourseTopicsController {
  constructor(private readonly courseTopicsService: CourseTopicsService) {}

  @Post()
  create(@Body() createCourseTopicDto: CreateCourseTopicDto) {
    return this.courseTopicsService.create(createCourseTopicDto);
  }

  @Get()
  findAll() {
    return this.courseTopicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseTopicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseTopicDto: UpdateCourseTopicDto) {
    return this.courseTopicsService.update(+id, updateCourseTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseTopicsService.remove(+id);
  }
}
