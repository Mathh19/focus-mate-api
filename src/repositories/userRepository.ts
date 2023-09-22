import UserModel from "../models/User";

export interface IUser {
  username: string;
  email: string;
  password: string;
  profile?: string;
}

export const createUser = async (user: IUser) => {
  const newUser = new UserModel(user);
  const savedUser = await newUser.save();
  return savedUser.toObject();
};

export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email: email }).exec();