import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserReposistory } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserReposistory) { }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing use id.'
        }
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 200,
        body: user
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong.'
      }
    }
  }
}