import { Task } from "models/task";

export type MongoTask = Omit<Task, 'id'>;