import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';
import { userProviders } from 'src/users/users.providers';

@Module({
  imports:[
    DatabaseModule,
    CoursesModule, 
    UsersModule
  ],
  controllers: [RatingController],
  providers: [
    ...coursesProviders,
    ...userProviders,
    RatingService],
})
export class RatingModule {}
