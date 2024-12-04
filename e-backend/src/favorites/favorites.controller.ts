import { Controller, Get, Post, Param, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Course } from 'src/courses/entities/course.entity';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':userId/:courseId')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar o quitar un curso de los favoritos del usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiParam({ name: 'courseId', type: Number, description: 'ID del curso' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Curso agregado a favoritos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Curso eliminado de favoritos' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario o curso no encontrado' })
  async addFavorite(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return await this.favoritesService.toggleFavorite(userId, courseId);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los cursos favoritos de un usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de cursos favoritos', type: [Course] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontraron cursos favoritos para el usuario' })
  async getFavoritesByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Course[]> {
    const favorites = await this.favoritesService.getUserFavorites(userId);

    if (!favorites || favorites.length === 0) {
      // En lugar de lanzar un error 404, devolvemos un array vacío
      return [];
    }

    return await favorites;
  }
}
