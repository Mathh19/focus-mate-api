import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { getCurrentDayOfWeek } from './utils/getCurrentDay';

const currentDay = getCurrentDayOfWeek();

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>
  ) { }

  async find(userId: string) {
    return await this.taskModel.find({ user: userId });
  }

  async create(task: Task, userId: string) {
    return this.taskModel.create({ ...task, user: userId });
  }

  async update(id: string, task: Task, userId: string) {
    const { name, day, description, finished } = task;
    const updatedTask = await this.taskModel.findById(id);

    if (!updatedTask) {
      throw new NotFoundException('Not found task.');
    }

    const taskUpdated = await this.taskModel.findByIdAndUpdate(id, {
      name,
      day,
      description,
      finished,
      user: userId
    });

    const currentTask = await this.taskModel.findById(taskUpdated._id)

    return currentTask;
  }

  async finishAllTasks(userId: string, hasDay: boolean) {
    if (hasDay) {
      return await this.taskModel.updateMany({
        user: userId,
        day: currentDay
      }, { $set: { finished: true } });
    }

    return await this.taskModel.updateMany({
      user: userId,
      day: undefined,
    }, { $set: { finished: true } });
  }

  async setFocusTask(id: string, taskId: string) {
    const tasks = await this.taskModel.find({ user: id });
    tasks.map(async (task) => {
      task.id === taskId ? await this.taskModel.findByIdAndUpdate(taskId, { inFocus: true })
        : await this.taskModel.updateMany({ user: id, _id: { $ne: taskId } }, { $set: { inFocus: false } })
    })
    return;
  }

  async deleteById(id: string, userId: string) {
    const deletedTask = await this.taskModel.findById(id);

    if (!deletedTask) {
      throw new NotFoundException('Not found task.');
    }

    if (deletedTask.user.toString() !== userId) {
      throw new UnauthorizedException();
    }

    await this.taskModel.findByIdAndDelete(id);

    return deletedTask;
  }

  async deleteTasks(hasDay: boolean, finished: boolean, userId: string) {

    if (hasDay && !finished) {
      return await this.taskModel.deleteMany({ user: userId, day: currentDay })
    }

    if (hasDay && finished) {
      return await this.taskModel.deleteMany({ user: userId, finished: true, day: currentDay });
    }

    if (!hasDay && finished) {
      return await this.taskModel.deleteMany({ user: userId, finished: true, day: undefined });
    }

    return await this.taskModel.deleteMany({ user: userId, day: undefined });
  }
}
