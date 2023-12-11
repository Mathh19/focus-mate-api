import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { HelperUser } from './shared/user.helpers';
import { SettingService } from 'src/setting/setting.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private settingService: SettingService
  ) { }

  async createUser(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findUser(id: string) {
    const user = await this.userModel.findById({ _id: id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findById(id);
    await this.settingService.remove(deletedUser.id);
    await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }

  async updateUser(id: string, user: Omit<User, 'email' | 'profile'>) {
    const { username, password } = user;
    const hasUser = await this.userModel.findById(id);

    if (!hasUser) {
      throw new NotFoundException('User not found!');
    }

    if (username.length < 2) {
      throw new BadRequestException('Username must have at least 2 characters.')
    }

    if (password.length < 6) {
      throw new BadRequestException('Password must have at least 6 characters.');
    }

    const hashedPassword = await hash(password, 10);

    return await this.userModel.findByIdAndUpdate(id, { username, password: hashedPassword }, {
      new: true,
      runValidators: true,
    });
  }

  async updateAvatar(id: string, file: string, filename: string) {
    const userAvatar = await this.userModel.findById({ _id: id });

    if (userAvatar.profile === null || userAvatar.profile === '' || userAvatar.profile === undefined) {
      await this.userModel.findByIdAndUpdate(id, {
        profile: file,
        profile_url: process.env.HOST + '/user/profile-image/' + filename
      });
    } else {
      await HelperUser.removeFile(userAvatar.profile);

      await this.userModel.findByIdAndUpdate(id, {
        profile: file,
        profile_url: process.env.HOST + '/user/profile-image/' + filename
      });
    }

    const user = await this.userModel.findById({ _id: id });

    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).select('+password').lean();
  }
}
