import { FastifyInstance } from 'fastify';
import { User } from '../types/index.js';
import {
  createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema,
  getAllUserSchema,
} from './schemas/index.js';
import UserService from '../services/UserService.js';

export default async function routes(fastify: FastifyInstance) {
  const userService = fastify.diContainer.resolve('userService') as UserService;

  fastify.get('/:id', getUserSchema, async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      const user = await userService.getUser(Number(id));
      reply.send(user);
    } catch (error) {
      reply.status(500).send({ error: 'Failed to get user' });
    }
  });

  fastify.post('/', createUserSchema, async (request, reply) => {
    const user: User = request.body as User;
    try {
      const userId = await userService.saveUser(user);
      reply.send({ id: userId });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to save user' });
    }
  });

  fastify.delete('/:id', deleteUserSchema, async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
      await userService.deleteUser(Number(id));
      reply.send({ message: 'User deleted successfully' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to delete user' });
    }
  });

  fastify.put('/:id', updateUserSchema, async (request, reply) => {
    const { id } = request.params as { id: string };
    const user: User = request.body as User;
    try {
      await userService.updateUser(Number(id), user);
      reply.send({ message: 'User updated successfully' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to update user' });
    }
  });

  fastify.get('/', getAllUserSchema, async (request, reply) => {
    try {
      const users = await userService.getAllUsers();
      reply.send(users);
    } catch (error) {
      reply.status(500).send({ error: 'Failed to retrieve users' });
    }
  });
}
