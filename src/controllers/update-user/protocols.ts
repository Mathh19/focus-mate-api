import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserParams {
  username?: string;
  password?: string;
}

export interface IUpdateUserController {
  handle(httpRequets: HttpRequest<any>): Promise<HttpResponse<User>>
}

export interface IUpdateUserRepository {
  update(id: string, params: UpdateUserParams): Promise<User>
}