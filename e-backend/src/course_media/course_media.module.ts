import { forwardRef,Module } from '@nestjs/common';
import { CourseMediaService } from './course_media.service';
import { CourseMediaController } from './course_media.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';
import { courseMediaProviders } from './course_media.providers';

@Module({
  imports:[
    DatabaseModule,
    forwardRef(() =>  CoursesModule),
  ],
  
  controllers: [CourseMediaController],
  providers: [
    ...coursesProviders,
    ...courseMediaProviders,
    CourseMediaService],
})
export class CourseMediaModule {}
