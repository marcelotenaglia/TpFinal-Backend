import { forwardRef,Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { ClassesModule } from 'src/classes/classes.module';
import { CourseMediaModule } from 'src/course_media/course_media.module';
import { UsersModule } from 'src/users/users.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { CourseTopicsModule } from 'src/course_topics/course_topics.module';
import { classesProviders } from 'src/classes/classes.providers';
import { courseMediaProviders } from 'src/course_media/course_media.providers';
import { userProviders } from 'src/users/users.providers';
import { favoritesProviders } from 'src/favorites/favorites.providers';
import { courseTopicsProviders } from 'src/course_topics/course_topics.providers';
import { CategoriesModule } from 'src/categories/categories.module';
import { categoriesProviders } from 'src/categories/categories.providers';
import { coursesProviders } from './courses.providers';
import { topicProviders } from 'src/topics/topics.providers';



@Module({
imports:[
  DatabaseModule,
  forwardRef(() =>  ClassesModule),
  forwardRef(() =>  CourseMediaModule),
  forwardRef(() =>  UsersModule),
  forwardRef(() =>  FavoritesModule),
  forwardRef(() =>  CourseTopicsModule),
  forwardRef(() =>  CategoriesModule),
],

  controllers: [CoursesController],

  providers: [
    ...classesProviders,
    ...courseMediaProviders,
    ...userProviders,
    ...favoritesProviders,
    ...courseTopicsProviders,
    ...categoriesProviders,
    ...coursesProviders,
    ...topicProviders,
    CoursesService],

    exports:[...coursesProviders]
})
export class CoursesModule {}
