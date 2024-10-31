import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Topic } from 'src/topics/entities/topic.entity';

@Injectable()
export class CategoriesService {
  constructor (
    @Inject(constants.categoriesRepository)
    private categoriesRepository: Repository<Category>,

    @Inject(constants.topicsRepository)
    private topicsRepository: Repository<Topic>
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll(): Promise<Category[]> {
    //const categories = await this.categoriesRepository.createQueryBuilder('categories').getMany()
    const categories = await this.categoriesRepository.find();

    if (!categories.length) throw new NotFoundException ('No hay categorias')
      return categories;
  }


  async getTopicsByCategoryId(category_id: number): Promise<Topic[]> {
    const topics = await this.topicsRepository.find({
      where: { category: { id: category_id } },  // Filtra los topics por category_id
    });

    if(!topics.length) throw new NotFoundException('La categoria no tiene Topics');
    return topics; // Devuelve todos los topics encontrados
  }
  
  async getAllCategoriesWithTopics(): Promise<Category[]> {
  return await this.categoriesRepository.find({
    relations: ['topics'], // Esto  trae todos los datos de la tabla categorias y ademas los de la tabla relacionada
  });
}
}


