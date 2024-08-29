import { Module } from '@nestjs/common';
import { CourseTopicsService } from './course_topics.service';
import { CourseTopicsController } from './course_topics.controller';

@Module({
  controllers: [CourseTopicsController],
  providers: [CourseTopicsService],
})
export class CourseTopicsModule {}
