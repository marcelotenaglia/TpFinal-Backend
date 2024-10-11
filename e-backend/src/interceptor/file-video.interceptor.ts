import { Injectable, BadRequestException } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileVideoInterceptor {
  static createInterceptor() {
    return AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Determinar la carpeta de destino según el campo del archivo
          const destinationPath = file.fieldname === 'video' ? './uploads/videos' : './uploads/images';
          cb(null, destinationPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 }, // Limitar a 25 MB para videos
      fileFilter: (req, file, cb) => {
        const allowedImageTypes = /jpeg|jpg|png/;
        const allowedVideoTypes = /mp4|mov|avi|wmv/;
        const ext = extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype.toLowerCase();
        
        if (
          (file.fieldname === 'file' && allowedImageTypes.test(ext) && allowedImageTypes.test(mimeType)) ||
          (file.fieldname === 'video' && allowedVideoTypes.test(ext) && allowedVideoTypes.test(mimeType))
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Solo se permiten archivos válidos de imagen o video'), false);
        }
      },
    });
  }
}