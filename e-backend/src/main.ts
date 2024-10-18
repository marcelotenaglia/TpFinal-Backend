import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as express from 'express'; // Asegúrate de usar esta línea
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usar Helmet para mejorar la seguridad de las cabeceras HTTP
  app.use(helmet());

  // Habilitar la validación global
  app.useGlobalPipes(new ValidationPipe());

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Cambia a la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir el envío de credenciales (cookies, auth)
  });

  // Servir archivos estáticos (imágenes)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Escuchar en el puerto 3000
  await app.listen(3000);
}

bootstrap();
