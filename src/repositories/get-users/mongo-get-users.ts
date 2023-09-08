import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements  IGetUsersRepository {
  async getUsers(): Promise<User[]> {
      return [{
        username: 'Math',
        email: 'math@gmail.com',
        password: '******'
      }]
  }
}