import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { SettingService } from 'src/setting/setting.service';
import { HelperUser } from './shared/user.helpers';
import { CreateUserDto } from './dto/create-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private settingService: SettingService,
    private cloudinaryService: CloudinaryService
  ) { }

  async createUser(user: CreateUserDto) {
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

  async updateUser(id: string, user: User) {
    delete user.email
    delete user.avatar
    const hasUser = await this.userModel.findById(id);

    if (!hasUser) {
      throw new NotFoundException('User not found!');
    }

    if (user.username && user.username.length < 2) {
      throw new BadRequestException('Username must have at least 2 characters.')
    }

    if (user.avatar && user.password.length < 6) {
      throw new BadRequestException('Password must have at least 6 characters.');
    }

    const hashedPassword = user.password ? await hash(user.password, 10) : undefined;

    const updateFields: Partial<User> = {
      ...(user.username && { username: user.username }),
      ...(hashedPassword && { password: hashedPassword }),
    };

    return await this.userModel.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });
  }

  async updateAvatar(id: string, user: User) {
    delete user.username
    delete user.email
    delete user.password

    const currentUser = await this.userModel.findById(id);

    if (currentUser.avatar === null || currentUser.avatar === '' || currentUser.avatar === undefined) {
      return await this.userModel.findByIdAndUpdate(id, {
        avatar: user.avatar,
        avatar_url: user.avatar_url
      }, { new: true });
    }
    HelperUser.removeFile(currentUser.avatar);

    return await this.userModel.findByIdAndUpdate(id, {
      avatar: user.avatar,
      avatar_url: user.avatar_url
    }, { new: true });
  }

  async removeAvatar(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { avatar: null, avatar_url: null }, { new: true });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).select('+password').lean();
  }
}
