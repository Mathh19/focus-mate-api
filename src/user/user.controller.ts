import { Controller, Get, Param, Patch, Delete, Request, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperUser } from './shared/user.helpers';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService, private jwtService: JwtService) { }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUSer(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];

    const { id: currentId } = this.jwtService.decode(token) as { id: string, iat: number, exp: number };

    if (id !== currentId) {
      throw new UnauthorizedException('Unable to delete account.');
    }

    return this.usersService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Request() req) {
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
    })
  }))
  async updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {

    return this.usersService.updateAvatar(id, file.path);
  }
}
