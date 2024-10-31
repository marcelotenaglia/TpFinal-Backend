
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
        destination: './uploads/files', // Cambia la ruta a donde deseas guardar los archivos
        filename: (req, file, cb) => {
          const uniqueSuffix = crypto.randomUUID();
          const ext = extname(file.originalname);
          const filename = `file-${uniqueSuffix}${ext}`; // Cambia el prefijo de imagen a file
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Tipos de archivo permitidos
        const allowedTypes = /pdf|doc|docx|ppt|pptx|txt/; // Agrega los tipos que necesites
        const ext = extname(file.originalname).toLowerCase();
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(ext);
        if (mimeType && extName) {
          return cb(null, true);
        } else {
          cb(new BadRequestException('Solo se permiten archivos PDF, DOC, DOCX, PPT, PPTX y TXT'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // Limitar a 5 MB, ajusta según necesites
    });
  }
}
