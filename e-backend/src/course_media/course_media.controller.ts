import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CreateCourseMediaDto } from './dto/create-course_media.dto';
import { UpdateCourseMediaDto } from './dto/update-course_media.dto';

@Controller('course-media')
export class CourseMediaController {
  constructor(private readonly courseMediaService: CourseMediaService) {}

 
}
