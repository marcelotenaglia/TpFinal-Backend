import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRating(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.addRaiting(createRatingDto);
  }

}
