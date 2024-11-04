import { forwardRef, Module } from '@nestjs/common';
import { BuyCoursesService } from './buy_courses.service';
import { BuyCoursesController } from './buy_courses.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { buy_courseProviders } from './buy_courses.providers';
import { coursesProviders } from 'src/courses/courses.providers';
import { userProviders } from 'src/users/users.providers';

@Module({

  imports: [
    DatabaseModule,
    forwardRef(() =>  UsersModule),
    forwardRef(() =>  CoursesModule),
  ],

  controllers: [BuyCoursesController],
  providers: [
    ...coursesProviders,
    ...userProviders,
    ...buy_courseProviders,
    BuyCoursesService],

    
})
export class BuyCoursesModule {}
