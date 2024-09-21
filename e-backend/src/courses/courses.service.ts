import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseTopic } from 'src/course_topics/entities/course_topic.entity';
import { Topic } from 'src/topics/entities/topic.entity';

@Injectable()
export class CoursesService {

constructor(
  @Inject(constants.coursesRepository)
  private courseRepository: Repository<Course>,

  @Inject(constants.course_topicsRepository)
  private courseTopicsRepository: Repository<CourseTopic>,

  @Inject(constants.topicsRepository)
  private topicRepository: Repository<Topic>,

){}


  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll():Promise<Course[]> {
    const courses = await this.courseRepository.createQueryBuilder('course')
    .leftJoinAndSelect('course.instructor', 'instructor')
    .leftJoinAndSelect('course.category', 'category')
    .leftJoinAndSelect('course.courseTopics', 'courseTopics')
    .leftJoinAndSelect('courseTopics.topic', 'topic')
    .leftJoinAndSelect('course.classes', 'classes')
    .getMany();

    //const courses = await this.courseRepository.find({relations: ['instructor']});
     if(!courses.length) throw new NotFoundException("No hay cursos");
   return courses;
  }

  async findOne(courseid: number):Promise<Course> {
    const course = await this.courseRepository.createQueryBuilder('course')
    .leftJoinAndSelect('course.instructor', 'instructor')
    .leftJoinAndSelect('course.category', 'category')
    .leftJoinAndSelect('course.courseTopics', 'courseTopics')
    .leftJoinAndSelect('courseTopics.topic', 'topic')
    .leftJoinAndSelect('course.classes', 'classes')
    .select([
      'course.title',
      'instructor.name',
      'classes.title',
      'topic.topic',
      'category.name',
    ])
    .where('course.id = :id', { id: courseid })
    .getOne();
  //   const course = await this.courseRepository.createQueryBuilder('course')
  // .leftJoinAndSelect('course.instructor', 'instructor')
  // .leftJoinAndSelect('course.category', 'category')
  // .leftJoinAndSelect('course.classes', 'classes')
  // .select([
  //   'course.title',
  //   'course.description',
  //   'course.duration',
  //   'course.platform',
  //   'course.price',
  //   'instructor.name',
  //   'instructor.email',
  //   'instructor.birthdate',
  //   'category.name',
  //   'classes.title',
  //   'classes.content',
  //   'classes.duration'
  // ])
  // .addSelect(subQuery => {
  //   return subQuery
  //     .select("JSON_ARRAYAGG(JSON_OBJECT( 'topic', topics.topic))", 'topics')
  //     .from('topics', 'topics')  // Cambiado de 'topic' a 'topics'
  //     .innerJoin('course_topics', 'ct', 'ct.topic_id = topics.id')
  //     .where('ct.course_id = course.id');
  // }, 'topics')
  // .where('course.id = :id', { id: courseid })
  // .getRawOne();
    
    if(!course){
      throw new NotFoundException('El curso no fue encontrado');
    }
    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: number):Promise<void> {
    const course = await this.courseRepository.findOne({where: {id}});
    if(!course)
      throw new NotFoundException(`No se encontro el curso con id: ${id}`);
    await this.courseRepository.delete(course);
  }
}
