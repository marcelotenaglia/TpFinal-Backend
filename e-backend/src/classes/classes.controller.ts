import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseIntPipe, UploadedFile, UseInterceptors} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { FileInterceptor } from 'src/interceptor/download.interceptor';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor.createFileInterceptor('file'))  // Espera un archivo con el nombre 'file'
  async create(
    @UploadedFile() file: Express.Multer.File, // Captura el archivo
    @Body() createClassDto: CreateClassDto      // Captura los otros campos de texto
  ) {

    const fileurl = file?.filename || 'no se recibio ningun archivo'; // Maneja el nombre del archivo si se recibe
    return this.classesService.create(fileurl,createClassDto ); // Envía a servicio
  }

  @Get()
  async getAllClasses(): Promise<Class[]> {
    return await this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  
  @Get('bycourseid/:id')
  @HttpCode(HttpStatus.OK)
  async findClassesByCourseId(@Param('id') courseId: number): Promise<Class[]> {
    return this.classesService.findClassesByCourseId(courseId); // trae las clases asociadas a un curso
  }


 @Patch(':id') // Método PATCH para actualizar una clase específica
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor.createFileInterceptor('file')) 
  async update(
    @Param('id') id: number, 
    @UploadedFile() file: Express.Multer.File, 
    @Body() updateClassDto: UpdateClassDto
  ) {
    const fileurl = file?.filename || null; // Obtiene el nombre del archivo si se recibe
    return this.classesService.update(+id, fileurl, updateClassDto); // Envía a servicio
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async deleteClass(@Param('id') id: number): Promise<void> {
    await this.classesService.delete(id);
  }
}
