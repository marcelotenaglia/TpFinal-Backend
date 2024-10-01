import { Injectable, BadRequestException } from '@nestjs/common';
import { FileInterceptor as MulterInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto';

@Injectable()
export class FileInterceptor {
  static createFileInterceptor(fieldName: string) {
    return MulterInterceptor(fieldName, {
      storage: diskStorage({
        destination: '../uploads/coursesFiles',
        filename: (req, file, cb) => {
          const uniqueSuffix = crypto.randomUUID();
          const ext = extname(file.originalname);
          const filename = `photo-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const ext = extname(file.originalname).toLowerCase();
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(ext);
        if (mimeType && extName) {
          return cb(null, true);
        } else {
          cb(new BadRequestException('Solo se permiten imágenes'), false);
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // Limitar a 2 MB
    });
  }
}