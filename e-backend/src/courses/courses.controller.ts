import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
  Query,
} from '@nestjs/common';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from 'src/interceptor/file.interceptor';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

//import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}


  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Curso creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor.createFileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File, // Cambiar a @UploadedFile() para un solo archivo
    @Body() createCourseDto: CreateCourseDto,
  ) {
    const filename = file?.filename || '';
    return this.coursesService.create(createCourseDto, filename);
  }




  @Get('/search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar cursos por término' })
  @ApiQuery({
    name: 'term',
    required: true,
    description: 'Término de búsqueda',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Resultados de la búsqueda',
    type: [Course],
  })
  async searchResults(@Query('term') term: string): Promise<Course[]> {
    return this.coursesService.search(term);
  }



  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de todos los cursos',
    type: [Course],
  })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.coursesService.findAll();
  }




  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiParam({ name: 'id', description: 'ID del curso', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Curso encontrado',
    type: Course,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Curso no encontrado',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.coursesService.findOne(id);
  }



  @Get('category/:categoryName')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener cursos por categoría' })
  @ApiParam({ name: 'categoryName', description: 'Nombre de la categoría' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de cursos en la categoría',
    type: [Course],
  })
  async getCoursesByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<Course[]> {
    return await this.coursesService.findByCategory(categoryName);
  }




  @Get('/instructor/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener cursos por ID del instructor' })
  @ApiParam({ name: 'id', description: 'ID del instructor', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de cursos del instructor',
    type: [Course],
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findCoursesByInstructor(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Course[]> {
    return this.coursesService.coursesbyInstructor(id);
  }




  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiParam({
    name: 'id',
    description: 'ID del curso a actualizar',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Curso actualizado',
    type: Course,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Curso no encontrado',
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor.createFileInterceptor('file'))
  async update(
    @Param('id') courseId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.updateCourse(courseId, updateCourseDto, file);
  }



  @Patch('/disable/:id')
  @ApiOperation({ summary: 'Desactivar un curso' })
  @ApiParam({
    name: 'id',
    description: 'ID del curso a desactivar',
    type: Number,
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Curso desactivado' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Curso no encontrado',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDeleteCourse(@Param('id') id: number) {
    return await this.coursesService.softDeleteCourse(id);
  }
}
