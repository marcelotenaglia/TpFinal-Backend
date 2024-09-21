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


  async addFavorite(user_id: number, course_id: number): Promise<Favorite> {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error('No se encontró un usuario con ese ID');
    }
    const course = await this.courseRepository.findOne({ where: { id: course_id } });
    
    if (!course) {
      throw new Error('No se encontró un curso con ese ID');
    }
   
    const favorite = await this.favoritesRepository.create({user,course});
    return this.favoritesRepository.save(favorite);
  }

  async removeFavorite(user_id: number, course_id: number): Promise<void> {
    const favorite = await this.favoritesRepository.findOne({
      where:{
        user:{id:user_id},
        course:{id:course_id}
      }});

      if (!favorite) {
        throw new NotFoundException('Favorito no encontrado');
      }
      await this.favoritesRepository.delete(favorite);
  }
}
