import { Body, Controller, Patch, Post, Req, Param, UseGuards, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @UseGuards(AuthGuard)
  async createTask(@Req() req, @Body() task: Task) {
    const { id } = req.user
    return this.taskService.create(task, id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateTask(@Req() req, @Param('id') id: string, @Body() task: Task) {
    const { id: userId } = req.user;

    return this.taskService.update(id, task, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTaskById(@Req() req, @Param('id') id: string) {
    const { id: userId } = req.user;

    return this.taskService.deleteById(id, userId);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteAllTasks(@Req() req) {
    const { id: userId } = req.user;

    return this.taskService.deleteAll(userId);
  }
}
