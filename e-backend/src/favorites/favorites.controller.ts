import { Controller, Get, Post, Param, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Course } from 'src/courses/entities/course.entity';


@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

 
  @Post(':userId/:courseId')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async addFavorite(
    @Param('userId',ParseIntPipe)userId : number,
    @Param('courseId',ParseIntPipe)courseId : number,
  )
  {
    return this.favoritesService.toggleFavorite(userId,courseId)
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getFavoritesByUser(
    @Param('userId',ParseIntPipe)userId : number,
  ):Promise<Course[]>
  {
    const favorites = await this.favoritesService.getUserFavorites(userId);

    if (!favorites || favorites.length === 0) {
      // En lugar de lanzar un error 404, devolvemos un array vacío
      return [];
    }
  
    return favorites;
  }

  
}
