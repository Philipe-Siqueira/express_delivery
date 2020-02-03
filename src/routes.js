import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';
import DeliveryController from './app/controllers/DeliveryController';
import PartnerController from './app/controllers/PartnerController';

const routes = new Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Unicad - Delivery Express!' });
});

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
// routes.put('/users', UserController.update);

routes.post('/users/:user_id/address', AddressController.store);
routes.get('/users/:user_id/address', AddressController.index);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.findAll);
routes.get('/deliveries/:delivery_id', DeliveryController.findById);

routes.get('/partner/list', PartnerController.index);
export default routes;
