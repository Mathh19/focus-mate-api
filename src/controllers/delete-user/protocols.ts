import { User } from "../../models/user";
export interface IDeleteUserReposistory {
  deleteUser(id: string): Promise<User>;
}