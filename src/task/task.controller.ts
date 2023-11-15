import { Body, Controller, Patch, Post, Req, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  async createTask(@Req() req, @Body() task: Task) {
    const { id } = req.user
    return this.taskService.create(task, id);
  }

  @Patch(':id')
  async updateTask(@Req() req, @Param('id') id: string, @Body() task: Task) {
    const { id: userId } = req.user;

    return this.taskService.update(id, task, userId);
  }

  @Delete(':id')
  async deleteTaskById(@Req() req, @Param('id') id: string) {
    const { id: userId } = req.user;

    return this.taskService.deleteById(id, userId);
  }
}
