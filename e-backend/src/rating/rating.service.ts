import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RatingService {
  constructor(
    @Inject(constants.ratingRepository)
    private readonly ratingRepository: Repository<Rating>,

    @Inject(constants.coursesRepository)
    private readonly courseRepository: Repository<Course>,

    @Inject(constants.userRepository)
    private readonly userRepository: Repository<User>, // Agregado para trabajar con usuarios
  ) {}

  async addRaiting(createRatingDto: CreateRatingDto) {
    const { rating, course_id, user_id } = createRatingDto;

    const user = await this.userRepository.findOne({
      where: { id: createRatingDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('Usuario invalido');
    }

    const course = await this.courseRepository.findOne({
      where: { id: createRatingDto.course_id },
    });
    if (!course) {
      throw new NotFoundException('Curso invalido');
    }

    const verificarRating = await this.ratingRepository.findOne({
      where: {
        user: { id: createRatingDto.user_id },
        course: { id: createRatingDto.course_id },
      },
    });

    if (verificarRating) {
      throw new NotFoundException('Este usuario ya ha hecho la calificacion');
    }
    //nueva calificacion
    const newRating = this.ratingRepository.create({
      rating: rating,
      user: user,
      course: course,
    });
    await this.ratingRepository.save(newRating);

    const { averageRating } = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.rating)', 'averageRating')
      .where('rating.course_id = :courseId', { courseId: course_id })
      .getRawOne();

    // Actualizar el rating promedio del curso
    await this.courseRepository.update(course_id, {
      rating: parseFloat(averageRating),
    });


    return newRating;
  }
}
