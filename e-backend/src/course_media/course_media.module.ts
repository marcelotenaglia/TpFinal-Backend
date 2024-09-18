import { Module } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CourseMediaController } from './course_media.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';

@Module({
  imports:[
    DatabaseModule,
    CoursesModule,
  ],
  
  controllers: [CourseMediaController],
  providers: [
    ...coursesProviders,
    CourseMediaService],
})
export class CourseMediaModule {}
