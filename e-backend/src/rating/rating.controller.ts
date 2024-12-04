import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar una calificación a un curso por un usuario' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'La calificación se ha creado exitosamente.',
    schema: {
      example: {
        rating: 4,
        user: { id: 1, name: 'Juan Pérez' },
        course: { id: 2, title: 'Introducción a NestJS' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El usuario ya ha calificado este curso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'ID de usuario o curso inválido.',
  })
  async createRating(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.addRaiting(createRatingDto);
  }
}
