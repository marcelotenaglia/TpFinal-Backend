import { forwardRef,Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { CourseTopicsModule } from 'src/course_topics/course_topics.module';
import { courseTopicsProviders } from 'src/course_topics/course_topics.providers';
import { DatabaseModule } from 'src/database/database.modele';
import { topicProviders } from './topics.providers';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => CourseTopicsModule),
  ],
  controllers: [TopicsController],
  providers: [
    ...courseTopicsProviders,
    ...topicProviders,
    TopicsService],
  exports:[...topicProviders]
})
export class TopicsModule {}
