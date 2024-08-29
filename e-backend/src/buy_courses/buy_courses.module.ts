import { Module } from '@nestjs/common';
import { BuyCoursesService } from './buy_courses.service';
import { BuyCoursesController } from './buy_courses.controller';

@Module({
  controllers: [BuyCoursesController],
  providers: [BuyCoursesService],
})
export class BuyCoursesModule {}
