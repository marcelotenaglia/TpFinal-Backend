import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyCoursesService } from './buy_courses.service';
import { CreateBuyCourseDto } from './dto/create-buy_course.dto';
import { UpdateBuyCourseDto } from './dto/update-buy_course.dto';

@Controller('buy-courses')
export class BuyCoursesController {
  constructor(private readonly buyCoursesService: BuyCoursesService) {}

  @Post()
  create(@Body() createBuyCourseDto: CreateBuyCourseDto) {
    return this.buyCoursesService.create(createBuyCourseDto);
  }

  @Get()
  findAll() {
    return this.buyCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyCoursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyCourseDto: UpdateBuyCourseDto) {
    return this.buyCoursesService.update(+id, updateBuyCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyCoursesService.remove(+id);
  }
}
