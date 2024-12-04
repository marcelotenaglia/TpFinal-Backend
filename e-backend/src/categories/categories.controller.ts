import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Topic } from 'src/topics/entities/topic.entity';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' }) // Describe la operación
  @ApiBody({ type: CreateCategoryDto, description: 'Datos para crear una categoría' }) // Detalla el body esperado
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente', type: Category })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de todas las categorías', type: [Category] })
  @ApiResponse({ status: 404, description: 'No se encontraron categorías' })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id/topics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener los temas por ID de categoría' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría' }) // Detalla el parámetro ID
  @ApiResponse({ status: 200, description: 'Lista de temas en la categoría', type: [Topic] })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada o sin temas asociados' })
  async getTopicsByCategoryId(@Param('id') category_id: number): Promise<Topic[]> {
    return await this.categoriesService.getTopicsByCategoryId(category_id); // Devuelve todos los topics asociados a la categoría
  }

  @Get('/Categories-With-Topics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las categorías con sus temas' })
  @ApiResponse({ status: 200, description: 'Lista de todas las categorías con sus temas', type: [Category] })
  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesService.getAllCategoriesWithTopics();
  }
}