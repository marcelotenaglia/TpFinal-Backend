import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthyService } from './healthy.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('healthy')
export class HealthyController {
  constructor(private readonly healthyService: HealthyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verificar si el servicio está en línea y funcionando correctamente' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Devuelve el estado actual de salud del servicio',
    schema: {
      example: { estado: 'en línea', mensaje: '¡Todo en orden, seguimos adelante! 🚀' },
    },
  })
  findAll(): { estado: string; mensaje: string } {
    const mensaje = this.healthyService.checkHealth();
    return { estado: 'en línea', mensaje };
  }
}
