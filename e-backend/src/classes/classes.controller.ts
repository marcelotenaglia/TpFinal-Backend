import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseIntPipe, UploadedFile, UseInterceptors, UseGuards} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { FileInterceptor } from 'src/interceptor/download.interceptor';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor.createFileInterceptor('file'))  // Espera un archivo con el nombre 'file'
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crea una nueva clase' })
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado o cuenta desactivada',
  })
  
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateClassDto, description: 'Datos para crear una nueva clase, incluye un archivo' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Clase creada con éxito', type: Class })
  async create(
    @UploadedFile() file: Express.Multer.File, // Captura el archivo
    @Body() createClassDto: CreateClassDto      // Captura los otros campos de texto
  ) {

    const fileurl = file?.filename || 'no se recibio ningun archivo'; // Maneja el nombre del archivo si se recibe
    return this.classesService.create(fileurl,createClassDto ); // Envía a servicio
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene todas las clases' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de clases', type: [Class] })
  async getAllClasses(): Promise<Class[]> {
    return await this.classesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene una clase por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la clase' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Clase encontrada', type: Class })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Clase no encontrada' })
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  
  @Get('bycourseid/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene clases asociadas a un curso' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del curso' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de clases del curso', type: [Class] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No se encontraron clases para el curso' })
  async findClassesByCourseId(@Param('id') courseId: number): Promise<Class[]> {
    return this.classesService.findClassesByCourseId(courseId); // trae las clases asociadas a un curso
  }


 @Patch(':id') // Método PATCH para actualizar una clase específica
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor.createFileInterceptor('file')) 
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado o cuenta desactivada',
  })
  @ApiOperation({ summary: 'Actualiza una clase existente' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la clase a actualizar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateClassDto, description: 'Datos para actualizar una clase, incluye un archivo opcional' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Clase actualizada con éxito', type: Class })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Clase no encontrada' })
  async update(
    @Param('id') id: number, 
    @UploadedFile() file: Express.Multer.File, 
    @Body() updateClassDto: UpdateClassDto
  ) {
    const fileurl = file?.filename || null; // Obtiene el nombre del archivo si se recibe
    return this.classesService.update(+id, fileurl, updateClassDto); // Envía a servicio
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT) 
  @ApiUnauthorizedResponse({
    description: 'Acceso no autorizado o cuenta desactivada',
  })
  @ApiOperation({ summary: 'Elimina una clase por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la clase a eliminar' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Clase eliminada con éxito' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Clase no encontrada' })
  async deleteClass(@Param('id') id: number): Promise<void> {
    await this.classesService.delete(id);
  }
}
