"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');

var _swaggerjsdoc = require('swagger-jsdoc'); var _swaggerjsdoc2 = _interopRequireDefault(_swaggerjsdoc);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: process.env.NODE_APP_NAME,
      description: 'API para Desafio',
      contact: {
        name: 'Philipe Siqueira',
        url: 'https://github.com/Philipe-Siqueira/express_delivery',
        email: 'philipe.tec@gmail.com',
      },
      host: `localhost:${process.env.NODE_APP_PORT}`,
      basePath: '/api-docs',
    },
  },
  // ['.routes/*.js']
  apis: ['**/routes.js'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};

const swaggerDocs = _swaggerjsdoc2.default.call(void 0, swaggerOptions);

exports. default = swaggerDocs;
