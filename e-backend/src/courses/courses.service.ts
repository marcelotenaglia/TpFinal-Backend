import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { constants } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseTopic } from 'src/course_topics/entities/course_topic.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(constants.coursesRepository)
    private courseRepository: Repository<Course>,

    @Inject(constants.course_topicsRepository)
    private courseTopicsRepository: Repository<CourseTopic>,

    @Inject(constants.topicsRepository)
    private topicRepository: Repository<Topic>,

    @Inject(constants.userRepository)
    private userRepository: Repository<User>,

    @Inject(constants.categoriesRepository)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { instructor_id, category_id, topicIds, ...courseData } =
      createCourseDto;

    const instructor = await this.userRepository.findOne({
      where: { id: instructor_id },
    });
    const category = await this.categoryRepository.findOne({
      where: { id: category_id },
    });

    if (!instructor) {
      throw new NotFoundException('No se encontro el instructor');
    }
    if (instructor.role.id === 2) {
      throw new ForbiddenException('No tiene permisos para crear cursos');
    }

    if (!category) {
      throw new NotFoundException('No se encontro la categoría');
    }

    const course = this.courseRepository.create({
      ...courseData,
      instructor,
      category,
    });
    await this.courseRepository.save(course);
    // Topics
    if (topicIds && topicIds.length > 0) {
      const topics = await this.topicRepository.find({
        where: topicIds.map((id) => ({ id })),
      });
      if (topics.length !== topicIds.length) {
        throw new NotFoundException('No se encontraron los Topics');
      }

      for (const topic of topics) {
        const courseTopic = new CourseTopic();
        courseTopic.course = course;
        courseTopic.topic = topic;
        await this.courseTopicsRepository.save(courseTopic);
      }

      return;
    }
  }
  async findAll(): Promise<Course[]> {
    const courses = await this.courseRepository
  .createQueryBuilder('course')
  .leftJoinAndSelect('course.instructor', 'instructor')
  .leftJoinAndSelect('course.category', 'category')
  .leftJoinAndSelect('course.courseTopics', 'courseTopics')
  .leftJoinAndSelect('courseTopics.topic', 'topic')
  .leftJoinAndSelect('course.classes', 'classes')
  .select([
    'course.id', 
    'course.title', 
    'course.description', 
    'course.duration', 
    'course.platform', 
    'course.price',
    'instructor.name', 
    'category.name', 
    'courseTopics.topic_id',                  
    'topic.topic',            
    'classes.title'            
  ])
  .getMany();

    //const courses = await this.courseRepository.find({relations: ['instructor']});
    if (!courses.length) throw new NotFoundException('No hay cursos');
    return courses;
  }

  async findOne(courseid: number): Promise<Course> {
    const course = await this.courseRepository
    .createQueryBuilder('course')
    .leftJoinAndSelect('course.instructor', 'instructor')
    .leftJoinAndSelect('course.category', 'category')
    .leftJoinAndSelect('course.courseTopics', 'courseTopics')
    .leftJoinAndSelect('courseTopics.topic', 'topic')
    .leftJoinAndSelect('course.classes', 'classes')
    .select([
      'course.id', 
      'course.title', 
      'course.description', 
      'course.duration', 
      'course.platform', 
      'course.price',
      'instructor.name', 
      'category.name', 
      'courseTopics.topic_id',                  
      'topic.topic',            
      'classes.title'            
    ])
      .where('course.id = :id', { id: courseid })
      .getOne();

    if (!course) {
      throw new NotFoundException('El curso no fue encontrado');
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepository.findOneByOrFail({ id });

    if (updateCourseDto.instructor_id) {
      course.instructor = await this.userRepository.findOneByOrFail({
        id: updateCourseDto.instructor_id,
      });
    }

    if (updateCourseDto.category_id) {
      course.category = await this.categoryRepository.findOneByOrFail({
        id: updateCourseDto.category_id,
      });
    }

    Object.assign(course, updateCourseDto);

    return this.courseRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course)
      throw new NotFoundException(`No se encontro el curso con id: ${id}`);
    course.disable= false;
    await this.courseRepository.save(course);
  }
}
