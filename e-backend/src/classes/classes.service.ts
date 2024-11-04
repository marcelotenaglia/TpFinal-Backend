import { Injectable, Inject, NotFoundException, BadRequestException} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { constants } from 'src/constants/constants';
import { Repository, In} from 'typeorm';
import { Class } from './entities/class.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class ClassesService {
  constructor (@Inject(constants.coursesRepository)
  private courseRepository: Repository<Course>,

  @Inject(constants.classesRepository)
  private classesRepository: Repository<Class>,) {}

  async create(fileurl: string, createClassDto: CreateClassDto): Promise<Class> {
    const { course_id, title, videourl } = createClassDto;

     /* // Convertir los valores a números
      const courseIdNumber = Number(course_id);
   
    
      // Verificar que la conversión sea exitosa
      if (isNaN(courseIdNumber) ) {
        throw new BadRequestException('course_id y duration deben ser números válidos.');
      }*/

    const course = await this.courseRepository.findOneBy({ id:course_id });
    if (!course) {
      throw new NotFoundException('El curso con ese ID no existe o no se encontró.');
    }

    const newClass = this.classesRepository.create({
      title,
      fileurl,
      course,
      videourl
    });

    return await this.classesRepository.save(newClass);
}
  
  async findAll(): Promise<Class[]> {
    return await this.classesRepository.find();
  }
  
  async findClassesByCourseId(courseId: number): Promise<Class[]> {
    const classEntities = await this.classesRepository.find({
      where: {
        course: { id: courseId }, // Usa la relación para buscar por course_id
      },
    });
  
    if (classEntities.length === 0) {
      throw new NotFoundException(`No se encontraron clases para el curso con ID ${courseId}.`);
    }
  
    return classEntities;
  }

  async findOne(id: number): Promise<Class> {
    const classEntity = await this.classesRepository.findOneBy({ id });
    if (!classEntity) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada.`);
    }
    return classEntity;
  }

  async update(id: number, fileurl: string | null, updateClassDto: UpdateClassDto): Promise<Class> {
    
    const existingClass = await this.classesRepository.findOne({ where: { id } });

    if (!existingClass) {
      throw new NotFoundException('La clase con ese ID no existe o no se encontró.');
    }

    // Aquí se actualizan solo los campos que se pasaron en el DTO
    const updatedClass = {
      ...existingClass,
      ...updateClassDto,
      fileurl: fileurl !== null ? fileurl : existingClass.fileurl // Solo actualiza fileurl si se ha enviado un nuevo archivo
    };

    return await this.classesRepository.save(updatedClass);
  }

  async delete(id: number): Promise<void> {
    const classToDelete = await this.classesRepository.findOneBy({ id });
  
    if (!classToDelete) {
      throw new NotFoundException('La clase con ese ID no existe o no se encontró.');
    }
  
    await this.classesRepository.remove(classToDelete);
  }
  
}
