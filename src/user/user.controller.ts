import { Controller, Get, Param, Patch, Delete, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperUser } from './shared/user.helpers';
import { NoAuth } from 'src/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService, private jwtService: JwtService) { }

  @Get()
  async getUser(@Req() req) {
    const { id } = req.user;
    return this.usersService.findUser(id);
  }

  @Delete()
  async deleteUSer(@Req() req) {
    const { id } = req.user;

    return this.usersService.deleteUser(id);
  }

  @Patch()
  async updateUser(@Req() req) {
    const { id } = req.user;

    return this.usersService.updateUser(id, req.body);
  }

  @Patch('/avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './upload/avatar',
      filename: HelperUser.customFile,
    }),
    limits: {
      fileSize: 1024 * 1024 * 5,
    }
  }))

  async updateAvatar(
    @Req() req,
    @UploadedFile() file: Express.Multer.File
  ) {
    const { id } = req.user;


    return this.usersService.updateAvatar(id, file.path, file.filename);
  }

  @NoAuth()
  @Get('profile-image/:imagename')
  async findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res: Response
  ) {
    return res.sendFile(imagename, {
      root: './upload/avatar'
    });
  }
}
