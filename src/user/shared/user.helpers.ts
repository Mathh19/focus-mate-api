import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { existsSync, unlinkSync } from 'fs';
import { extname } from 'path';

export enum MimeTypes {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  GIF = 'image/gif',
}
export class HelperUser {
  static customFile(req: Request, file: Express.Multer.File, cb: any) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const fileName = cb(null, `${randomName}${extname(file.originalname)}`);

    return fileName;
  }

  static validateFile(file: Express.Multer.File) {
    const allowedMimeTypes: MimeTypes[] = [MimeTypes.JPEG, MimeTypes.PNG, MimeTypes.SVG, MimeTypes.GIF];

    if (!allowedMimeTypes.includes(file.mimetype as MimeTypes)) {
      throw new BadRequestException('Invalid file type. Only jpeg, png, svg and gif are allowed.');
    }
  }

  static removeFile(file: string) {
    if (existsSync(`./upload/avatar/${file}`)) {
      return unlinkSync(`./upload/avatar/${file}`);
    }
    throw new Error('File does not exist.');
  }
}