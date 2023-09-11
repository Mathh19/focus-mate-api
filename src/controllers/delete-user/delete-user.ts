import { User } from "../../models/user";
import { badResquest, serverError, successful } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserReposistory } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserReposistory) { }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badResquest('Missing use id.');
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return successful(user);
    } catch (error) {
      return serverError();
    }
  }
}