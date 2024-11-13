import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as express from 'express'; // Asegúrate de usar esta línea
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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


  // Configurar el Swagger
  const config = new DocumentBuilder()
    .setTitle('API Einstein')
    .setDescription('Documentación de la API Einstein')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Docs', app, document);

  // Escuchar en el puerto 3000
  await app.listen(3000);
}

bootstrap();
