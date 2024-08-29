import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CreateCourseMediaDto } from './dto/create-course_media.dto';
import { UpdateCourseMediaDto } from './dto/update-course_media.dto';

@Controller('course-media')
export class CourseMediaController {
  constructor(private readonly courseMediaService: CourseMediaService) {}

  @Post()
  create(@Body() createCourseMediaDto: CreateCourseMediaDto) {
    return this.courseMediaService.create(createCourseMediaDto);
  }

  @Get()
  findAll() {
    return this.courseMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseMediaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseMediaDto: UpdateCourseMediaDto) {
    return this.courseMediaService.update(+id, updateCourseMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMediaService.remove(+id);
  }
}
