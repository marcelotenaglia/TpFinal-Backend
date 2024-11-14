import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Topic } from 'src/topics/entities/topic.entity';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' }) // Describe la operación
  @ApiBody({ type: CreateCategoryDto, description: 'Data for creating a category' }) // Detalla el body esperado
  @ApiResponse({ status: 201, description: 'Category created successfully', type: Category })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @HttpCode (HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse({ status: 200, description: 'List of all categories', type: [Category] })
  @ApiResponse({ status: 404, description: 'No categories found' })
  async findAll() {
    return this.categoriesService.findAll();
  }


  @Get(':id/topics')
  @HttpCode (HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve topics by category ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the category' }) // Detalla el parámetro ID
  @ApiResponse({ status: 200, description: 'List of topics in the category', type: [Topic] })
  @ApiResponse({ status: 404, description: 'Category not found or no topics in category' })
  async getTopicsByCategoryId(@Param('id') category_id: number): Promise<Topic[]> {

    return await this.categoriesService.getTopicsByCategoryId(category_id); // Devuelve todos los topics asociados a la categoría
  }


  @Get('/Categories-With-Topics')
  @HttpCode (HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all categories with their topics' })
  @ApiResponse({ status: 200, description: 'List of all categories with topics', type: [Category] })
  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesService.getAllCategoriesWithTopics();
  }



}


