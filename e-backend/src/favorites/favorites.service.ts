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


  async addFavorite(userId: number, courseId: number): Promise<Favorite> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('No se encontró un usuario con ese ID');
    }

    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new Error('No se encontró un curso con ese ID');
    }
    const favorite = await this.favoritesRepository.create({user,course});
    return this.favoritesRepository.save(favorite);
  }

  async removeFavorite(userId: number, courseId: number): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where:{
        user:{id:userId},
        course:{id:courseId}
      }});

      if (!favorite) {
        throw new NotFoundException('Favorito no encontrado');
      }
      await this.favoritesRepository.delete(favorite);
  }
}
