import { Controller, Get, Param, Post, Patch, Delete, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) { }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  async deleteUSer(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(id, user);
  }
}
