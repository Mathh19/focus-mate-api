import { Request } from 'express';
import { existsSync, unlinkSync } from 'fs';
import { extname } from 'path';
export class HelperUser {
  static customFile(req: Request, file: Express.Multer.File, cb: any) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const fileName = cb(null, `${randomName}${extname(file.originalname)}`);

    return fileName;
  }

  static removeFile(file: string) {
    if (existsSync(`./upload/avatar/${file}`)) {
      return unlinkSync(`./upload/avatar/${file}`);
    }
    throw new Error('File does not exist.');
  }
}