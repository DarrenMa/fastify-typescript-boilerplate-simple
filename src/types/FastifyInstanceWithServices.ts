import { FastifyInstance } from 'fastify';
import UserService from '../services/UserService';

interface FastifyInstanceWithServices extends FastifyInstance {
  userService: UserService;
}

export default FastifyInstanceWithServices;
