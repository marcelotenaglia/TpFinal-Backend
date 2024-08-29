import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillModule } from './bill/bill.module';
import { UsersModule } from './users/users.module';
import { UserMediaModule } from './user_media/user_media.module';
import { RolesModule } from './roles/roles.module';
import { BillDetailModule } from './bill_detail/bill_detail.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CoursesModule } from './courses/courses.module';
import { CourseTopicsModule } from './course_topics/course_topics.module';
import { TopicsModule } from './topics/topics.module';
import { CompanyModule } from './company/company.module';
import { CourseMediaModule } from './course_media/course_media.module';
import { BuyCoursesModule } from './buy_courses/buy_courses.module';
@Module({
  imports: [BillModule, UsersModule, UserMediaModule, RolesModule, BillDetailModule, FavoritesModule,CoursesModule, CourseTopicsModule, TopicsModule, CompanyModule, CourseMediaModule, BuyCoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




