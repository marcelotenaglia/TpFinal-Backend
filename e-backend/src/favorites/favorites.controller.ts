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
  @ApiOperation({ summary: 'Add or remove a course from user favorites' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'courseId', type: Number, description: 'Course ID' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Course added to favorites' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Course removed from favorites' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User or course not found' })
  async addFavorite(
    @Param('userId',ParseIntPipe)userId : number,
    @Param('courseId',ParseIntPipe)courseId : number,
  )
  {
    return await this.favoritesService.toggleFavorite(userId,courseId)
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all favorite courses of a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of favorite courses', type: [Course] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No favorite courses found for user' })
  async getFavoritesByUser(
    @Param('userId',ParseIntPipe)userId : number,
  ):Promise<Course[]>
  {
    const favorites = await this.favoritesService.getUserFavorites(userId);

    if (!favorites || favorites.length === 0) {
      // En lugar de lanzar un error 404, devolvemos un array vacío
      return [];
    }
  
    return await favorites;
  }

  
}
