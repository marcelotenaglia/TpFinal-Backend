import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';


@Injectable()
export class FavoritesService {

  constructor(
    @Inject(constants.favoritesRepository)
    private favoritesRepository: Repository<Favorite>,
    
    @Inject(constants.userRepository)
    private userRepository: Repository<User>,

    @Inject(constants.coursesRepository)
    private courseRepository: Repository<Course>,
  ) { }


  async toggleFavorite(user_id: number, course_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error('No se encontró un usuario con ese ID');
    }

    const course = await this.courseRepository.findOne({ where: { id: course_id } });
    if (!course) {
      throw new Error('No se encontró un curso con ese ID');
    }

    // Busca si el curso ya es favorito
    const favorite = await this.favoritesRepository.findOne({
      where: {
        user: { id: user_id },
        course: { id: course_id },
      },
    });

    if (favorite) {
      // Si ya es favorito, eliminarlo
      await this.favoritesRepository.delete(favorite);
      return false;
    } else {
      // Si no es favorito, agregarlo
      const newFavorite = this.favoritesRepository.create({ user, course });
      await this.favoritesRepository.save(newFavorite);
      return true;
    }
  }
  async getUserFavorites(user_id: number): Promise<Course[]> {
    const favorites = await this.favoritesRepository.find({
      where: { user: { id: user_id } },
      relations: ['course'],  // Relacionar la tabla de cursos
    });
  
    if (favorites.length === 0) {
      throw new NotFoundException('Este usuario no tiene favoritos');
    }
  
    // Extraer los cursos de los favoritos
    const favoriteCourses = favorites.map(favorite => favorite.course);
  
    return favoriteCourses;
  }
}
