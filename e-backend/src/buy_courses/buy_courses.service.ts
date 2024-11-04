import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { BuyCourse } from './entities/buy_course.entity';
import { CreateBuyCourseDto } from './dto/create-buy_course.dto';
import { UpdateBuyCourseDto } from './dto/update-buy_course.dto';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class BuyCoursesService {

  constructor(
    @Inject(constants.buyCourseRespository)
    private buyCoursesRepository: Repository<BuyCourse>,
    
    @Inject(constants.userRepository)
    private userRepository: Repository<User>,

    @Inject(constants.coursesRepository)
    private courseRepository: Repository<Course>,

  ) { }

 async buyCourse(user_id: number, course_id: number): Promise<boolean>
{
  const user = await this.userRepository.findOne({ where: { id: user_id } });
  if (!user) {
    throw new NotFoundException('No se encontró un usuario con ese ID');
  }

  const course = await this.courseRepository.findOne({ where: { id: course_id } });
  if (!course) {
    throw new NotFoundException('No se encontró un curso con ese ID');
  }

  // Busca si el usuario ya compra el curso
  const buyCourse = await this.buyCoursesRepository.findOne({
    where: {
      user: { id: user_id },
      course: { id: course_id },
    },
  });

  if (buyCourse) {
    // Si ya compra el curso, actualizar la fecha de compra
    throw new ConflictException('El usuario ya compró este curso');
  }
  else {
    // Si no compra el curso, agregarlo
    const newBuyCourse = this.buyCoursesRepository.create({ user, course });
    await this.buyCoursesRepository.save(newBuyCourse);
  }

  return true;
}


async returnCourse(user_id: number, course_id: number): Promise<boolean> {
  const user = await this.userRepository.findOne({ where: { id: user_id } });
  if (!user) {
    throw new NotFoundException('No se encontró un usuario con ese ID');
  }

  const course = await this.courseRepository.findOne({ where: { id: course_id } });
  if (!course) {
    throw new NotFoundException('No se encontró un curso con ese ID');
  }

  // Verificar si el curso fue comprado por el usuario
  const buyCourse = await this.buyCoursesRepository.findOne({
    where: {
      user: { id: user_id },
      course: { id: course_id },
    },
  });

  if (!buyCourse) {
    throw new NotFoundException('El usuario no ha comprado este curso');
  }

  // Verificar si la compra fue realizada en las últimas 48 horas
  const purchaseDate = new Date(buyCourse.purchase_date);
  const currentDate = new Date();
  const hoursDifference = Math.abs(currentDate.getTime() - purchaseDate.getTime()) / 36e5;

  if (hoursDifference > 48) {
    throw new ConflictException('El período de devolución ha expirado (48 horas)');
  }

  // Si está dentro del período permitido, elimina la compra
  await this.buyCoursesRepository.remove(buyCourse);

  return true;
}
}
