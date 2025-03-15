import './config';
import fastify from 'fastify';
import { AddressInfo } from 'net';
import getEnvironmentVariables from './utils/environmentalVariables.js';
import routes from './routes/routes.js';
import setupSwagger from './swagger/swagger.js';
import diContainerPlugin from './plugins/diContainerPlugin';

const env = getEnvironmentVariables();

const app = fastify({
  logger: true,
});

app.register(diContainerPlugin);
setupSwagger(app);
app.register(routes, { prefix: '/users' });

app.setErrorHandler((error, request, reply) => {
  app.log.error(error);

  reply.status(500).send({ error: 'Internal Server Error' });
});

const start = async () => {
  try {
    await app.ready();
    await app.listen({ host: env.HOST_NAME, port: env.HOST_PORT });

    if (app.server.address()) {
      const address = app.server.address() as AddressInfo;
      app.log.info(`Platform: ${env.ENVIRONMENT} Server listening on ${address.address}:${address.port}`);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
