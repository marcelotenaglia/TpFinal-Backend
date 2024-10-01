import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,HttpCode,HttpStatus, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { FileInterceptor } from '../interceptor/file.interceptor';
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseInterceptors(FileInterceptor.createFileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async create(
  @Body() createCourseDto: CreateCourseDto, 
  @UploadedFile() file: Express.Multer.File
   ) {
    
    if (!file) {
      throw new BadRequestException ('Es obligatorio cargar una foto')
    } 
    
    createCourseDto.filename = file.filename

    return this.coursesService.create(createCourseDto);
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
  @HttpCode(HttpStatus.OK)
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
