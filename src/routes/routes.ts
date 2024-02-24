import { FastifyInstanceWithServices, User } from '../types/index.js';
import {
  createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema,
} from './schemas/index.js';

export default async function routes(
  fastify: FastifyInstanceWithServices,
  opts: any,
  done: Function,
) {
  const { userService } = fastify;

  fastify.get('/', getUserSchema, async (request, reply) => {
    const { id } = request.query as { id: string };
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

  fastify.put('/', updateUserSchema, async (request, reply) => {
    const user: User = request.body as User;
    try {
      await userService.updateUser(user);
      reply.send({ message: 'User updated successfully' });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to update user' });
    }
  });

  done();
}
