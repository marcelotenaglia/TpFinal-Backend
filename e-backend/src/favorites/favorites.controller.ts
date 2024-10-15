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
    return this.favoritesService.toggleFavorite(userId,courseId)
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async getFavoritesByUser(
    @Param('userId',ParseIntPipe)userId : number,
  )
  {
    return this.favoritesService.getUserFavorites(userId);
  }

  
}
