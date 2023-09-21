import bcrypt from 'bcrypt';

export const authenticationBcrypt = async (password: string) => {
  return await bcrypt.hash(password, 10)
}