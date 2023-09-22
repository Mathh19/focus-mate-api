import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../repositories/userRepository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password || username.length < 3 || password.length < 6) {
        return res.status(400).send('Field is required!');
      }

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return res.status(400).send('User already exists.');
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await createUser({
        email,
        username,
        password: hashPassword,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...user } = newUser;

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send('Field is required!');
      }

      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(400).send('User does not exist.');
      }

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return res.status(400).send('Invalid password.');
      }

      const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_PASS as string, { expiresIn: '7d' });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userLogin } = user;

      return res.status(200).json({
        user: userLogin,
        token: token
      }).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      return res.send('logged in user.');
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}