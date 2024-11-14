import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}



  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all topics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of all topics.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Machine Learning',
          description: 'An introduction to Machine Learning concepts.',
        },
        {
          id: 2,
          name: 'Data Science',
          description: 'Overview of data science methods and practices.',
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No topics found',
  })
  findAll() {
    return this.topicsService.findAll();
  }

  
}
