import './config';
import fastify from 'fastify';
import { AddressInfo } from 'net';
import getEnvironmentVariables from './utils/environmentalVariables.js';
import routes from './routes/routes.js';
import logger from './utils/logger.js';
import setupSwagger from './swagger/swagger.js';
import diContainerPlugin from './plugins/diContainerPlugin';

const env = getEnvironmentVariables();

const app = fastify();

app.register(diContainerPlugin);
setupSwagger(app);
app.register(routes, { prefix: '/users' });

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
