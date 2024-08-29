import { Module } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CourseMediaController } from './course_media.controller';

@Module({
  controllers: [CourseMediaController],
  providers: [CourseMediaService],
})
export class CourseMediaModule {}
