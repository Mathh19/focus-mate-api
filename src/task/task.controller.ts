import { Body, Controller, Patch, Post, Req, Param, Delete, Query, Get, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { RemoveIdInterceptor } from './remove-id.interceptor';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async findAllTasks(@Req() req) {
    const { id } = req.user;
    return this.taskService.find(id);
  }

  @Post()
  @UseInterceptors(RemoveIdInterceptor)
  async createTask(@Req() req, @Body() task: Task) {
    const { id } = req.user
    return this.taskService.create(task, id);
  }

  @Patch(':id')
  async updateTask(@Req() req, @Param('id') id: string, @Body() task: Task) {
    const { id: userId } = req.user;

    return this.taskService.update(id, task, userId);
  }

  @Patch()
  async finishAllTask(@Req() req, @Query('hasDay') hasDay: boolean,) {
    const { id: userId } = req.user;

    return this.taskService.finishAllTasks(userId, hasDay);
  }

  @Delete(':id')
  async deleteTaskById(@Req() req, @Param('id') id: string) {
    const { id: userId } = req.user;

    return this.taskService.deleteById(id, userId);
  }

  @Delete()
  async deleteTasks(@Req() req, @Query('hasDay') hasDay: boolean, @Query('finished') finished: boolean) {
    const { id } = req.user;

    return await this.taskService.deleteTasks(hasDay, finished, id)
  }
}
