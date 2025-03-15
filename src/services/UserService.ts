import UserRepository from '../datalayer/UserRepository.js';
import { User } from '../types';

export default class UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async getUser(userId: number): Promise<User> {
    return this.userRepository.get(userId);
  }

  async saveUser(user: User): Promise<number> {
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    return this.userRepository.delete(userId);
  }

  async updateUser(userId: number, user: User): Promise<void> {
    return this.userRepository.update(userId, user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
