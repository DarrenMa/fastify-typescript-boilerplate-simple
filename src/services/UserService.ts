import UserRepository from '../datalayer/UserRepository.js';
import { User } from '../types';
import loggable from '../decorators/loggable';

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  @loggable
  async getUser(userId: number): Promise<User> {
    return this.userRepository.get(userId);
  }

  @loggable
  async saveUser(user: User): Promise<number> {
    return this.userRepository.save(user);
  }

  @loggable
  async deleteUser(userId: number): Promise<void> {
    return this.userRepository.delete(userId);
  }

  @loggable
  async updateUser(user: User): Promise<void> {
    return this.userRepository.update(user);
  }
}
