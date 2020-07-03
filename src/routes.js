import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';
import DeliveryController from './app/controllers/DeliveryController';
import PartnerController from './app/controllers/PartnerController';
import SessionController from './app/controllers/SessionController';
import WeatherController from './app/controllers/WeatherController';

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
  return res.json({ message: 'Unicad - Express Delivery!' });
});

routes.get('/weather/:woeid', WeatherController.getWeather);

// Routes

routes.post('/users', UserController.create);

/**
 * @swagger
 * /sessions:
 *          post:
 *              tags:
 *                - Sessão
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

// routes.use(authMiddleware);

/**
 * @swagger
 * /users/:
 *   post:
 *     tags:
 *      - Usuários
 *     description: Adiciona um novo usuário ao sistema
 *     name: Cadastrar Usuário
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     parameters:
 *      - name: body
 *        in: body
 *        schema:
 *         type: object
 *         properties:
 *          name:
 *            type: string
 *          surname:
 *            type: string
 *          email:
 *           type: string
 *          password:
 *           type: string
 *           format: password
 *          cellphone:
 *            type: string
 *          partiner:
 *            type: boolean
 *        required:
 *         - email
 *         - password
 *     responses:
 *       200:
 *         description: Pagina inicial
 */

routes.put('/users/:user_id', UserController.updateById);

routes.put('/users', UserController.update);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *      - Usuários
 *     description: Lista usuários
 *     responses:
 *       200:
 *         description: Pagina inicial
 */

routes.get('/users', UserController.findAll);

routes.delete('/users/:user_id', UserController.delete);
/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *      - Usuários
 *     description: Lista usuários pelo ID
 *     responses:
 *       201:
 *         description: Pagina inicial
 */

routes.get('/users/:user_id', UserController.findById);

/**
 * @swagger
 * /users/:user_id/address:
 *   post:
 *     tags:
 *      - Endereços
 *     summary: Cria Endereço
 *     description: Adiciona o endereço ao usuário
 *     name: Cadastrar Endereço
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     parameters:
 *      - name: user_id
 *        in: path
 *        type: integer
 *        required: true
 *      - name: body
 *        in: body
 *        schema:
 *         type: object
 *         properties:
 *          postcode:
 *            type: string
 *          country:
 *            type: string
 *          state:
 *           type: string
 *          city:
 *           type: string
 *          district:
 *            type: string
 *          address:
 *            type: boolean
 *          number:
 *            type: integer
 *          complement:
 *            type: boolean
 *     responses:
 *       200:
 *         description: Pagina inicial
 */

routes.post('/users/:user_id/address', AddressController.create);
routes.get('/users/:user_id/address', AddressController.findById);
routes.get('/addresses', AddressController.findAll);
routes.delete('/addresses/:address_id', AddressController.delete);
/**
 * @swagger
 * /deliveries:
 *   post:
 *     tags:
 *      - Entregas
 *     description: Lista usuários pelo ID
 *     name: Cadastrar uma entrega.
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     parameters:
 *      - name: body
 *        in: body
 *        schema:
 *         type: object
 *         properties:
 *          client_id:
 *            type: integer
 *          partner_id:
 *            type: integer
 *          product:
 *           type: string
 *          value:
 *           type: number
 *           format: float
 *     responses:
 *       201:
 *         description: Pagina inicial
 */

routes.post('/deliveries', DeliveryController.create);

/**
 * @swagger
 * /deliveries/:
 *   get:
 *     tags:
 *      - Entregas
 *     description: Lista usuários pelo ID
 *     responses:
 *       201:
 *         description: Pagina inicial
 */

routes.get('/deliveries', DeliveryController.findAll);

/**
 * @swagger
 * /deliveries/:delivery_id:
 *   get:
 *     tags:
 *      - Entregas
 *     description: Lista endereço pelo Id
 *     parameters:
 *      - name: delivery_id
 *        in: path
 *        type: integer
 *        required: true
 *     responses:
 *       201:
 *         description: Pagina inicial
 */
routes.get('/deliveries/:delivery_id', DeliveryController.findById);

routes.put('/deliveries', DeliveryController.update);

routes.put('/deliveries/done', DeliveryController.updateDone);

routes.delete('/deliveries/:delivery_id', DeliveryController.delete);

routes.get('/partner/list', PartnerController.findAll);
export default routes;
