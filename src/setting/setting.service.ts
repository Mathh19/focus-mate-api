import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './setting.schema';
import { Model } from 'mongoose';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<Setting>
  ) { }

  async create(userId: string) {
    return await this.settingModel.create({ user: userId });
  }

  async findSetting(id: string) {
    return await this.settingModel.findOne({ user: id });
  }

  async update(userId: string, setting: Setting) {
    const { pomodoroTime, shortRestTime, longRestTime, cycles, auto, notification, routineMode, theme, volume } = setting;

    await this.settingModel.findOneAndUpdate({ user: userId }, {
      pomodoroTime,
      shortRestTime,
      longRestTime,
      cycles,
      auto,
      notification,
      routineMode,
      theme,
      volume
    });

    if (pomodoroTime <= 0 || shortRestTime <= 0 || longRestTime <= 0 || cycles <= 0) {
      throw new BadRequestException('Your pomodoro contains invalid value.');
    }

    if (pomodoroTime && !Number.isInteger(pomodoroTime)
      || shortRestTime && !Number.isInteger(shortRestTime)
      || longRestTime && !Number.isInteger(longRestTime)
      || cycles && !Number.isInteger(cycles)) {
      throw new BadRequestException('Your pomodoro contains invalid value.');
    }

    if (volume < 0 || volume > 100 || !Number.isInteger(volume)) {
      throw new BadRequestException('Invalid volume value.');
    }

    const updatedSetting = await this.settingModel.findOne({ user: userId });
    return updatedSetting;
  }

  async remove(userId: string) {
    return await this.settingModel.deleteOne({ user: userId });
  }
}
