import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

const swaggerOptions = {
  swagger: {
    info: {
      title: 'User management service',
      description: 'User management service',
      version: '1.0.0',
    },
    host: '',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'User', description: 'User management' }],
  },
};

const swaggerUiOptions = {
  routePrefix: '/api-docs',
  exposeRoute: true,
};

export default function setupSwagger(app: FastifyInstance) {
  app.register(fastifySwagger, swaggerOptions);
  app.register(fastifySwaggerUi, swaggerUiOptions);
}
