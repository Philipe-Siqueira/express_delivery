import 'dotenv/config';

import swaggerJsDoc from 'swagger-jsdoc';

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

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
