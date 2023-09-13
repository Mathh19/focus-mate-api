import { Task, WeekDays } from "models/task";

export interface CreateTaskParams {
  name: string;
  description?: string;
  weekDays?: WeekDays[];
  finished?: boolean;
  inFocous?: boolean;
}

export interface ICreateTaskRepository {
  createTask(params: CreateTaskParams): Promise<Task>;
}