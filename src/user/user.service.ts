import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async createUser(user: User): Promise<User> {
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
    await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }

  async updateUser(id: string, user: Omit<User, 'email'>) {
    const { username, password, profile } = user;
    const hasUser = await this.userModel.findById(id);

    if (!hasUser) {
      throw new NotFoundException('User not found!');
    }

    return await this.userModel.findByIdAndUpdate(id, { username, password, profile }, {
      new: true,
      runValidators: true,
    });
  }
}
