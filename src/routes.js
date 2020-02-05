import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';
import DeliveryController from './app/controllers/DeliveryController';
import PartnerController from './app/controllers/PartnerController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import swaggerDocs from './config/swagger';

const routes = new Router();

const options = {
  explorer: true,
};

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

/**
 * @swagger
 * /:
 *   get:
 *     description: Retorna pagina incial do projeto
 *     responses:
 *       200:
 *         description: Pagina inicial
 */

routes.get('/', async (req, res) => {
  return res.json({ message: 'Unicad - Delivery Express!' });
});

// Routes

/**
 * @swagger
 * /sessions:
 *          post:
 *              description: Use para Autenticar e gerar o token.
 *              name: New session
 *              produces:
 *                - application/json
 *              consumes:
 *                - application/json
 *              parameters:
 *                - name: body
 *                  in: body
 *                  schema:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: string
 *                      password:
 *                        type: string
 *                        format: password
 *                  required:
 *                    - email
 *                    - password
 *              responses:
 *                201:
 *                    description: Sessão Valida
 *                401:
 *                    description: Usuário não encontrado
 */

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.findAll);
routes.get('/users', UserController.create);
routes.get('/users/:user_id', UserController.findById);

routes.post('/users/:user_id/address', AddressController.create);
routes.get('/users/:user_id/address', AddressController.findById);

routes.post('/deliveries', DeliveryController.create);
routes.get('/deliveries', DeliveryController.findAll);
routes.get('/deliveries/:delivery_id', DeliveryController.findById);

routes.get('/partner/list', PartnerController.findAll);
export default routes;
