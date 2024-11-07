import {  forwardRef,Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';
import { userProviders } from 'src/users/users.providers';
import { ratingProviders } from './rating.providers';

@Module({
  imports:[
    DatabaseModule,
    forwardRef(() =>  CoursesModule), 
    forwardRef(() =>   UsersModule),
  ],
  controllers: [RatingController],
  providers: [
    ...coursesProviders,
    ...userProviders,
    ...ratingProviders,
    RatingService],
})
export class RatingModule {}
