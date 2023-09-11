import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) { }
  async handle(httpRequets: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequets?.params?.id;
      const body = httpRequets?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing user id.'
        }
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = ['username', 'password'];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams));

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: 'Some received field is not allwed.'
        }
      }

      const user = await this.updateUserRepository.update(id, body);

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