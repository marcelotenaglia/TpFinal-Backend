import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los temas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Devuelve una lista de todos los temas.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Aprendizaje Automático',
          description: 'Una introducción a los conceptos de aprendizaje automático.',
        },
        {
          id: 2,
          name: 'Ciencia de Datos',
          description: 'Descripción general de los métodos y prácticas de la ciencia de datos.',
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron temas.',
  })
  findAll() {
    return this.topicsService.findAll();
  }
}
