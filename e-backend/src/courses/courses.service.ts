import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { constants } from 'src/constants/constants';
import { Repository, In } from 'typeorm';
import { Course } from './entities/course.entity';
import { CourseTopic } from 'src/course_topics/entities/course_topic.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CourseMedia } from 'src/course_media/entities/course_media.entity';
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

    @Inject(constants.course_mediaRepository)
    private courseMediaRepository: Repository<CourseMedia>,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    fileName: string,
  ): Promise<Course> {
    const { instructor_id, category_id, topicIds, ...courseData } =
      createCourseDto;

    const [instructor, category] = await Promise.all([
      this.userRepository.findOne({
        where: { id: instructor_id },
        relations: ['role'],
      }),
      this.categoryRepository.findOneBy({ id: category_id }),
    ]);
    

    if (!instructor) {
      throw new NotFoundException('No se encontro el instructor');
    }

    if (instructor.role.id !== 2) {
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
   
    //Media
    
    const courseMedia = new CourseMedia();
    courseMedia.filename = fileName;
    courseMedia.course = course; // Relacionar con el curso creado
    courseMedia.videoUrl = courseData.videoUrl;

    await this.courseMediaRepository.save(courseMedia);


      
    // Topics
    if (topicIds && topicIds.length > 0) {
      const topics = await this.topicRepository.find({
        where: { id: In(topicIds) },
      });

      if (topics.length !== topicIds.length) {
        throw new NotFoundException(
          'No se encontraron todos los Topics especificados',
        );
      }

      const courseTopics = topics.map((topic) => {
        const courseTopic = new CourseTopic();
        courseTopic.course = course;
        courseTopic.topic = topic;
        return courseTopic;
      });
      await this.courseTopicsRepository.save(courseTopics);
    }
    return course;
  }
  async findAll(): Promise<Course[]> {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.courseTopics', 'courseTopics')
      .leftJoinAndSelect('courseTopics.topic', 'topic')
      .leftJoinAndSelect('course.classes', 'classes')
      .leftJoinAndSelect('course.media', 'courseMedia')
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
        'classes.title',
        'courseMedia.filename',
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
     // .leftJoinAndSelect('course.media', 'courseMedia')
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
        'classes.title',
       // 'courseMedia.filename',
       // 'courseMedia.videoUrl',
      ])
      .where('course.id = :id', { id: courseid })
      .getOne();

    if (!course) {
      throw new NotFoundException('El curso no fue encontrado');
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const { instructor_id, category_id, topicIds, ...courseData } =
      updateCourseDto;
    const course = await this.courseRepository.findOneByOrFail({ id });

    // Actualización del instructor
    if (instructor_id) {
      course.instructor = await this.userRepository.findOneOrFail({
        where: { id: instructor_id },
        relations: ['role'],
      });

      if (course.instructor.role.id === 2) {
        throw new ForbiddenException(
          'El instructor no tiene permisos para crear cursos',
        );
      }
    }

    // Actualización de la categoría
    if (category_id) {
      course.category = await this.categoryRepository.findOneByOrFail({
        id: category_id,
      });
    }

    // Actualización de los datos básicos del curso
    Object.assign(course, courseData);
    await this.courseRepository.save(course);

    // Actualización de los topics (temas)
    if (topicIds && topicIds.length > 0) {
      // Primero elimina las relaciones anteriores en `CourseTopic`
      await this.courseTopicsRepository.delete({ course: { id: course.id } });

      // Luego encuentra los nuevos topics y asigna la relación
      const topics = await this.topicRepository.find({
        where: { id: In(topicIds) },
      });

      if (topics.length !== topicIds.length) {
        throw new NotFoundException(
          'No se encontraron todos los Topics especificados',
        );
      }

      const courseTopics = topics.map((topic) => {
        const courseTopic = new CourseTopic();
        courseTopic.course = course;
        courseTopic.topic = topic;
        return courseTopic;
      });

      // Guarda los nuevos courseTopics
      await this.courseTopicsRepository.save(courseTopics);
    }

    return course;
  }

  async remove(id: number): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course)
      throw new NotFoundException(`No se encontro el curso con id: ${id}`);
    course.disable = false;
    await this.courseRepository.save(course);
  }
}
