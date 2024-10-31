import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Topic } from 'src/topics/entities/topic.entity';
import { Category } from './entities/category.entity';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @HttpCode (HttpStatus.OK)
  async findAll() {
    return this.categoriesService.findAll();
  }


  @Get(':id/topics')
  async getTopicsByCategoryId(@Param('id') category_id: number): Promise<Topic[]> {

    return await this.categoriesService.getTopicsByCategoryId(category_id); // Devuelve todos los topics asociados a la categoría
  }


  @Get('/Categories-With-Topics')
  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesService.getAllCategoriesWithTopics();
  }



}


