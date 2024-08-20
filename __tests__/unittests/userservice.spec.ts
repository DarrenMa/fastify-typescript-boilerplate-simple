import UserService from '../../src/services/UserService';
import UserRepository from '../../src/datalayer/UserRepository';
import { User } from '../../src/types';
import { Knex } from 'knex';

jest.mock('../../src/datalayer/UserRepository');

const mockKnex = {
  VERSION: '0.95.6',
  __knex__: 'knex',
  raw: jest.fn(),
  transactionProvider: jest.fn(),
} as unknown as Knex;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = new UserRepository({ db: mockKnex }) as jest.Mocked<UserRepository>;
    userService = new UserService({ userRepository });
  });

  it('should get a user by ID', async () => {
    const user: User = { id: 1, name: 'John Doe', password: '' };
    userRepository.get.mockResolvedValue(user);

    const result = await userService.getUser(1);

    expect(result).toEqual(user);
    expect(userRepository.get).toHaveBeenCalledWith(1);
  });

  it('should save a user', async () => {
    const user: User = { id: 1, name: 'John Doe', password: '' };
    userRepository.save.mockResolvedValue(1);

    const result = await userService.saveUser(user);

    expect(result).toBe(1);
    expect(userRepository.save).toHaveBeenCalledWith(user);
  });

  it('should delete a user by ID', async () => {
    userRepository.delete.mockResolvedValue();

    await userService.deleteUser(1);

    expect(userRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should update a user by ID', async () => {
    const user: User = { id: 1, name: 'John Doe', password: '' };
    userRepository.update.mockResolvedValue();

    await userService.updateUser(1, user);

    expect(userRepository.update).toHaveBeenCalledWith(1, user);
  });

  it('should get all users', async () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', password: '' },
      { id: 2, name: 'Jane Doe', password: '' },
    ];
    userRepository.getAllUsers.mockResolvedValue(users);

    const result = await userService.getAllUsers();

    expect(result).toEqual(users);
    expect(userRepository.getAllUsers).toHaveBeenCalled();
  });
});