import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import UserService from '../services/UserService.js';
import UserRepository from '../datalayer/UserRepository.js';
import db from '../database/db_connection.js';

export default fp((fastify: FastifyInstance, opts: any, done: Function) => {
  const userRepository = new UserRepository(db);
  const userService = new UserService(userRepository);

  fastify.decorate('userService', userService);

  done();
});
