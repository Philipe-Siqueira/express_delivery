import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Unicad - Delivery Express!' });
});

export default routes;

routes.post('/users', UserController.store);

routes.put('/users', UserController.update);
