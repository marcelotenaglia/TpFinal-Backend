import { forwardRef,Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { DatabaseModule } from 'src/database/database.modele';
import { CoursesModule } from 'src/courses/courses.module';
import { coursesProviders } from 'src/courses/courses.providers';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() =>  CoursesModule),
  ],

  controllers: [ClassesController],
  providers: [
    ...coursesProviders,
    ClassesService],
})
export class ClassesModule {}
