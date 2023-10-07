import { Request } from 'express';
import { unlink } from 'fs';
import { extname } from 'path';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);

export class HelperUser {
  static customFile(req: Request, file: Express.Multer.File, cb: any) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const nameFile = cb(null, `${randomName}${extname(file.originalname)}`);

    return nameFile;
  }

  static async removeFile(file: string) {
    try {
      await unlinkAsync(file);
    } catch (error) {
      throw new Error('File not exist.');
    }
  }
}