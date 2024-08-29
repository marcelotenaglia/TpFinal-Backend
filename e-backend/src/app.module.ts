import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoursesModule, CourseTopicsModule, TopicsModule, CompanyModule, CourseMediaModule, BuyCoursesModule],
import { BillModule } from './bill/bill.module';
import { UsersModule } from './users/users.module';
import { UserMediaModule } from './user_media/user_media.module';
import { RolesModule } from './roles/roles.module';
import { BillDetailModule } from './bill_detail/bill_detail.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [BillModule, UsersModule, UserMediaModule, RolesModule, BillDetailModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
