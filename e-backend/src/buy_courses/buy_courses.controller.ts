import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import { BuyCoursesService } from './buy_courses.service';
import { CreateBuyCourseDto } from './dto/create-buy_course.dto';
import { UpdateBuyCourseDto } from './dto/update-buy_course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('buy-courses')
export class BuyCoursesController {
  constructor(private readonly buyCoursesService: BuyCoursesService) {}

  @Post(':user_id/:course_id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Comprar un curso para un usuario' }) // Describe la operación
  @ApiParam({ name: 'user_id', type: Number, description: 'ID del usuario' }) // Parámetro user_id
  @ApiParam({ name: 'course_id', type: Number, description: 'ID del curso' }) // Parámetro course_id
  @ApiResponse({ status: 201, description: 'Curso comprado exitosamente', type: Boolean })
  @ApiResponse({ status: 404, description: 'Usuario o curso no encontrado' })
  @ApiResponse({ status: 409, description: 'El usuario ya compró este curso' })
  async buyCourse(
    @Param('user_id') user_id: number,
    @Param('course_id') course_id: number,
  ) {
    return await this.buyCoursesService.buyCourse(user_id, course_id);
  }

  @Delete(':user_id/:course_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Devolver un curso comprado dentro de las 48 horas' })
  @ApiParam({ name: 'user_id', type: Number, description: 'ID del usuario' })
  @ApiParam({ name: 'course_id', type: Number, description: 'ID del curso' })
  @ApiResponse({ status: 200, description: 'Curso devuelto exitosamente', type: Boolean })
  @ApiResponse({ status: 404, description: 'Usuario o curso no encontrado, o el curso no fue comprado por el usuario' })
  @ApiResponse({ status: 409, description: 'El periodo de devolución ha expirado (48 horas)' })
  async deleteBuyCourse(
    @Param('user_id') user_id: number,
    @Param('course_id') course_id: number,
  ) {
    return await this.buyCoursesService.returnCourse(user_id, course_id);
  }

  @Get(':user_id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los cursos comprados por un usuario' })
  @ApiParam({ name: 'user_id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de cursos comprados por el usuario' })
  @ApiResponse({ status: 404, description: 'No se encontraron cursos para este usuario' })
  async getBuyCoursesxUser(@Param('user_id') user_id: number) {
    return await this.buyCoursesService.getUserBuyCourses(user_id);
  }
}