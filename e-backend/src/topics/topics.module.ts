import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { CourseTopicsModule } from 'src/course_topics/course_topics.module';
import { courseTopicsProviders } from 'src/course_topics/course_topics.providers';

@Module({
  imports: [
    CourseTopicsModule,
  ],
  controllers: [TopicsController],
  providers: [
    ...courseTopicsProviders,
    TopicsService],
})
export class TopicsModule {}
