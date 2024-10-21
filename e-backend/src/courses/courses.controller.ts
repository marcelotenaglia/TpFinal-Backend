
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,HttpCode,HttpStatus, UseGuards, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles } from '@nestjs/common';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from 'src/interceptor/file.interceptor';

//import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}



  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor.createFileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File, // Cambiar a @UploadedFile() para un solo archivo
    @Body() createCourseDto: CreateCourseDto
  ) {
    const filename = file?.filename || '';
    return this.coursesService.create(createCourseDto, filename);
  }


  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number):Promise<Course> {
    return this.coursesService.findOne(id);
  }


  @Patch(':id')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
