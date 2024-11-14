import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a rating to a course by a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The rating has been successfully created.',
    schema: {
      example: {
        rating: 4,
        user: { id: 1, name: 'John Doe' },
        course: { id: 2, title: 'Introduction to NestJS' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User has already rated this course.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid user or course ID.',
  })
  async createRating(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.addRaiting(createRatingDto);
  }

}
