import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthyService } from './healthy.service';


@Controller('healthy')
export class HealthyController {
  constructor(private readonly healthyService: HealthyService) {}


  @Get()
  findAll():{ estado: string, mensaje: string } {
    const mensaje = this.healthyService.checkHealth();
    return { estado: 'en línea', mensaje };
  }


}
