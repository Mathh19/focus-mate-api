import { Controller, Get, Param, Patch, Delete, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
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

  @Delete(':id')
  async deleteUSer(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];

    const { id: currentId } = this.jwtService.decode(token) as { id: string, iat: number, exp: number };

    if (id !== currentId) {
      throw new UnauthorizedException('Unable to delete account.');
    }

    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];

    const { id: currentId } = this.jwtService.decode(token) as { id: string, iat: number, exp: number };

    if (id !== currentId) {
      throw new UnauthorizedException('Unable to update account.');
    }

    return this.usersService.updateUser(id, req.body);
  }

  @Patch(':id/avatar')
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
    @Req() req: Request,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const token = req.headers.authorization.split(' ')[1];

    const { id: currentId } = this.jwtService.decode(token) as { id: string, iat: number, exp: number };

    if (id !== currentId) {
      throw new UnauthorizedException('Unable to update avatar.');
    }

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
