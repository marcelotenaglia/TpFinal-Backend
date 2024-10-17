import {forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';
import { categoriesProviders } from './categories.providers';
import { topicProviders } from 'src/topics/topics.providers';

@Module({

  imports: [
    DatabaseModule,
    forwardRef(() =>  CoursesModule),
  ],

  controllers: [CategoriesController],
  providers: [
    ...coursesProviders,
    ...categoriesProviders,
    ...topicProviders,
    CategoriesService],
  exports:[...categoriesProviders]
})
export class CategoriesModule {}
