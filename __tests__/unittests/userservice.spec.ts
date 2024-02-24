import UserRepository from '../../src/datalayer/UserRepository';
import UserService from '../../src/services/UserService';
import { User } from '../../src/types';

class MockUserRepository extends UserRepository {
  get = jest.fn();
  save = jest.fn();
  update = jest.fn();
}

describe('UserService', () => {
  let userRepositoryMock: MockUserRepository;
  let userService: UserService;
  let dbMock: any;

  beforeEach(() => {
    userRepositoryMock = new MockUserRepository(dbMock);
    userService = new UserService(userRepositoryMock);
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const user: User = { id: 1, name: 'John Doe', password: 'password' };
      userRepositoryMock.get.mockResolvedValue(user);

      const result = await userService.getUser(1);

      expect(result).toEqual(user);
      expect(userRepositoryMock.get).toHaveBeenCalledWith(1);
    });
  });

  describe('saveUser', () => {
    it('should save a user and return the new user id', async () => {
      const user: User = { id: 1, name: 'John Doe', password: 'password' };
      userRepositoryMock.save.mockResolvedValue(1);

      const result = await userService.saveUser(user);

      expect(result).toEqual(1);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user and return the updated user', async () => {
      const user: User = { id: 1, name: 'John Doe', password: 'password' };
      const updatedUser: User = { ...user, name: 'Jane Doe' };
      userRepositoryMock.update.mockResolvedValue(updatedUser);

      const result = await userService.updateUser(updatedUser);

      expect(result).toEqual(updatedUser);
      expect(userRepositoryMock.update).toHaveBeenCalledWith(updatedUser);
    });

    it('should throw an error if the user does not exist', async () => {
      const user: User = { id: 1, name: 'John Doe', password: 'password' };
      userRepositoryMock.update.mockImplementation(() => {
        throw new Error('Failed to update user');
      });

      await expect(userService.updateUser(user))
        .rejects.toThrow('Failed to update user');

      expect(userRepositoryMock.update).toHaveBeenCalledWith(user);
    });
  });


});