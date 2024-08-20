import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { asClass, asValue } from 'awilix';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import UserRepository from '../datalayer/UserRepository';
import UserService from '../services/UserService';
import db from '../database/db_connection';

const diContainerPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: false,
  });

  fastify.after(() => {
    fastify.diContainer.register({
      db: asValue(db),
      userRepository: asClass(UserRepository).singleton(),
      userService: asClass(UserService).singleton(),
    });
  });
};

export default fp(diContainerPlugin);
