import { Controller, Get, Param, Patch, Delete, Res, Req, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { NoAuth } from 'src/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperUser } from './shared/user.helpers';
import { join } from 'path';
import { existsSync } from 'fs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

const storage = {
  storage: diskStorage({
    destination: './upload/avatar',
    filename: HelperUser.customFile,
  }),
  limits: {
    fileSize: 1024 * 1024 * 20,
  }
};

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService, private cloudinaryService: CloudinaryService) { }

  @Get()
  async getUser(@Req() req) {
    const { id } = req.user;
    return this.userService.findUser(id);
  }

  @Delete()
  async deleteUSer(@Req() req) {
    const { id } = req.user;

    return this.userService.deleteUser(id);
  }

  @Patch()
  async updateUser(@Req() req) {
    const { id } = req.user;

    return this.userService.updateUser(id, req.body);
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    HelperUser.validateFile(file);
    const avatar_url = await this.cloudinaryService.uploadFile(file);

    return this.userService.updateAvatar(req.user.id, {
      ...req.user,
      avatar: file.filename,
      avatar_url: avatar_url
    });
  }

  @Delete('/avatar')
  deleteAvatar(@Req() req) {
    return this.userService.removeAvatar(req.user.id);
  }

  @NoAuth()
  @Get('profile-image/:imagename')
  async findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res: Response
  ) {
    const filePath = join(process.cwd(), './upload/avatar/', imagename);

    if (existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).send('File not found');
    }
  }
}
