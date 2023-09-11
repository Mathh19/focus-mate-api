import { User } from "../../models/user";
export interface UpdateUserParams {
  username?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  update(id: string, params: UpdateUserParams): Promise<User>
}