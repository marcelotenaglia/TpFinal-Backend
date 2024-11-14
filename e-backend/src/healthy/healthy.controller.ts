import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthyService } from './healthy.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('healthy')
export class HealthyController {
  constructor(private readonly healthyService: HealthyService) {}


  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check if the service is online and healthy' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the current health status of the service',
    schema: {
      example: { estado: 'en línea', mensaje: '¡Todo en orden, seguimos adelante! 🚀' },
    },
  })
  findAll():{ estado: string, mensaje: string } {
    const mensaje = this.healthyService.checkHealth();
    return { estado: 'en línea', mensaje };
  }


}
