import { forwardRef,Module } from '@nestjs/common';
import { CourseTopicsService } from './course_topics.service';
import { CourseTopicsController } from './course_topics.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { TopicsModule } from 'src/topics/topics.module';
import { coursesProviders } from 'src/courses/courses.providers';
import { topicProviders } from 'src/topics/topics.providers';
import { courseTopicsProviders } from './course_topics.providers';

@Module({

  imports:[
    DatabaseModule,
    forwardRef(() =>  CoursesModule),
    forwardRef(() =>  TopicsModule),
  ],
  controllers: [CourseTopicsController],
  providers: [
    ...coursesProviders,
    ...topicProviders,
    ...courseTopicsProviders,
    CourseTopicsService],
  exports:[...courseTopicsProviders],
})
export class CourseTopicsModule {}
