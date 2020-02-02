import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';

const routes = new Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Unicad - Delivery Express!' });
});

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
// routes.put('/users', UserController.update);

routes.post('/users/:user_id/address', AddressController.store);
routes.get('/users/:user_id/address', AddressController.index);
export default routes;
