import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { CourseTopicsModule } from './course_topics/course_topics.module';
import { TopicsModule } from './topics/topics.module';
import { CompanyModule } from './company/company.module';
import { CourseMediaModule } from './course_media/course_media.module';
import { BuyCoursesModule } from './buy_courses/buy_courses.module';

@Module({
  imports: [CoursesModule, CourseTopicsModule, TopicsModule, CompanyModule, CourseMediaModule, BuyCoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
