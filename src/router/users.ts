import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export default (router: Router) => {
  const user = new UserController();
  router.get('/profile', user.getProfile);
};