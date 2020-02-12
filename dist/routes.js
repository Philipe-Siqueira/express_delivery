"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _swaggeruiexpress = require('swagger-ui-express'); var _swaggeruiexpress2 = _interopRequireDefault(_swaggeruiexpress);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _AddressController = require('./app/controllers/AddressController'); var _AddressController2 = _interopRequireDefault(_AddressController);
var _DeliveryController = require('./app/controllers/DeliveryController'); var _DeliveryController2 = _interopRequireDefault(_DeliveryController);
var _PartnerController = require('./app/controllers/PartnerController'); var _PartnerController2 = _interopRequireDefault(_PartnerController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

var _swagger = require('./config/swagger'); var _swagger2 = _interopRequireDefault(_swagger);

const routes = new (0, _express.Router)();

const options = {
  explorer: true,
};

routes.use('/api-docs', _swaggeruiexpress2.default.serve, _swaggeruiexpress2.default.setup(_swagger2.default, options));

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

routes.post('/users', _UserController2.default.create);

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

routes.post('/sessions', _SessionController2.default.store);

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

routes.put('/users/:user_id', _UserController2.default.updateById);

routes.put('/users', _UserController2.default.update);

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

routes.get('/users', _UserController2.default.findAll);

routes.delete('/users/:user_id', _UserController2.default.delete);
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

routes.get('/users/:user_id', _UserController2.default.findById);

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

routes.post('/users/:user_id/address', _AddressController2.default.create);
routes.get('/users/:user_id/address', _AddressController2.default.findById);
routes.get('/addresses', _AddressController2.default.findAll);
routes.delete('/addresses/:address_id', _AddressController2.default.delete);
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

routes.post('/deliveries', _DeliveryController2.default.create);

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

routes.get('/deliveries', _DeliveryController2.default.findAll);

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
routes.get('/deliveries/:delivery_id', _DeliveryController2.default.findById);

routes.put('/deliveries', _DeliveryController2.default.update);

routes.put('/deliveries/done', _DeliveryController2.default.updateDone);

routes.delete('/deliveries/:delivery_id', _DeliveryController2.default.delete);

routes.get('/partner/list', _PartnerController2.default.findAll);
exports. default = routes;
