import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillModule } from './bill/bill.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { BillDetailModule } from './bill_detail/bill_detail.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CoursesModule } from './courses/courses.module';
import { CourseTopicsModule } from './course_topics/course_topics.module';
import { TopicsModule } from './topics/topics.module';
import { CompanyModule } from './company/company.module';
import { CourseMediaModule } from './course_media/course_media.module';
import { BuyCoursesModule } from './buy_courses/buy_courses.module';
import { RatingModule } from './rating/rating.module';
@Module({
  imports: [BillModule, UsersModule, RolesModule, BillDetailModule, FavoritesModule,CoursesModule, CourseTopicsModule, TopicsModule, CompanyModule, CourseMediaModule, BuyCoursesModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




