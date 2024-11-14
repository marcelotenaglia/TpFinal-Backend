import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseTopicsService } from './course_topics.service';


@Controller('course-topics')
export class CourseTopicsController {
  constructor(private readonly courseTopicsService: CourseTopicsService) {}


}
