import { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  CreateTaskParams,
  ICreateTaskRepository,
} from "./protocols";
import { badResquest, created, serverError } from "../helpers";
import { Task } from "models/task";

export class CreateTaskController implements IController {
  constructor(private readonly createTaskRepository: ICreateTaskRepository) { }
  async handle(
    httpRequest: HttpRequest<CreateTaskParams>
  ): Promise<HttpResponse<Task | string>> {
    try {
      const validDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
      const cleanSpacesTaskName = httpRequest.body.name.trim().replace(/\s+/g, ' ');

      if (!cleanSpacesTaskName.length || cleanSpacesTaskName === '') {
        return badResquest(`Fields name is required!`);
      }

      if (httpRequest.body.weekDays) {
        const validate = httpRequest.body.weekDays.map((day) => validDays.includes(day)
        );
        if (validate.includes(false)) {
          return badResquest('Field with value invalid.');
        }
      }

      const formattedTask = { ...httpRequest.body, name: cleanSpacesTaskName };

      const task = await this.createTaskRepository.createTask(formattedTask);

      return created<Task>(task);
    } catch (error) {
      return serverError();
    }
  }
}