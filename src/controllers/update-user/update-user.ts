import { User } from "../../models/user";
import { badResquest, serverError, successful } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) { }
  async handle(httpRequets: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequets?.params?.id;
      const body = httpRequets?.body;

      if (!body) {
        return badResquest('Missing user field.');
      }

      if (!id) {
        return badResquest('Missing user id.');
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = ['username', 'password'];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams));

      if (someFieldIsNotAllowedToUpdate) {
        return badResquest('Some received field is not allwed.');
      }

      const user = await this.updateUserRepository.update(id, body);

      return successful(user);
    } catch (error) {
      return serverError();
    }
  }
}