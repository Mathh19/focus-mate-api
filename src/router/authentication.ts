import { UserController } from '../controllers/UserController';
import express from 'express';

export default (router: express.Router) => {
  const user = new UserController();
  router.post('/auth/register', user.create);
  router.post('/auth/login', user.login);
}