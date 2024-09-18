import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';

@Module({

  imports: [
    DatabaseModule,
    CoursesModule,
  ],

  controllers: [CategoriesController],
  providers: [
    ...coursesProviders,
    CategoriesService],
})
export class CategoriesModule {}
