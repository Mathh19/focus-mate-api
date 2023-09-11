import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IDeleteUserReposistory {
  deleteUser(id: string): Promise<User>;
}