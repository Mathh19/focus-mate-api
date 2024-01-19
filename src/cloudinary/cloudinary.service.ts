import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File) {
    const filePath = `./upload/avatar/${file.filename}`;
    const options = {
      resource_type: 'image',
      folder: process.env.CLOUDINARY_API_FOLDER_NAME,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: {
        width: 150,
        height: 150,
        crop: 'thumb',
        gravity: 'center'
      }
    } as UploadApiOptions;

    try {
      const result = await cloudinary.uploader.upload(filePath, options);
      return result.secure_url;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}