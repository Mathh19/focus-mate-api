import { User } from "../../models/user";
import { serverError, successful } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";
export class GetUsersController implements IController {

  constructor(private readonly getUsersRepository: IGetUsersRepository) { }

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return successful<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}