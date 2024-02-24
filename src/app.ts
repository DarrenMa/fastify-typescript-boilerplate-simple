import './config';
import fastify from 'fastify';
import { AddressInfo } from 'net';
import getEnvironmentVariables from './utils/environmentalVariables.js';
import routes from './routes/routes.js';
import logger from './utils/logger.js';

import servicesPlugin from './plugins/services.js';
import { FastifyInstanceWithServices } from './types/index.js';
import setupSwagger from './swagger/swagger.js';

const env = getEnvironmentVariables();

const app = fastify();

app.register(servicesPlugin);

setupSwagger(app);

app.register((appInstance, options, done) => {
  routes(appInstance as FastifyInstanceWithServices, options, done);
}, { prefix: '/user' });

const start = async () => {
  try {
    await app.ready();
    await app.listen({ host: env.HOST_NAME, port: env.HOST_PORT });

    if (app.server.address()) {
      const address = app.server.address() as AddressInfo;
      logger.info(`Platform: ${env.ENVIRONMENT} Server listening on ${address.address}:${address.port}`);
    }
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

start();

export default app;
