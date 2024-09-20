import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';


@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

 
  @Post(':userId/:courseId')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(
    @Param('userId',ParseIntPipe)userId : number,
    @Param('courseId',ParseIntPipe)courseId : number,
  )
  {
    return this.favoritesService.addFavorite(userId,courseId)
  }

  @Delete(':userId/:courseId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavorite(
    @Param('userId',ParseIntPipe)userId : number,
    @Param('courseId',ParseIntPipe)courseId : number,
  )
  {
    return this.favoritesService.removeFavorite(userId,courseId)
  }
}
