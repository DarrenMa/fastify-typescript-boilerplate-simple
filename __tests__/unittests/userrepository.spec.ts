import { Knex } from 'knex';
import UserRepository from '../../src/datalayer/UserRepository';
import { User } from '../../src/types';

jest.mock('knex');

describe('UserRepository', () => {
  let db: jest.Mocked<Partial<Knex>> & jest.Mock;
  let userRepository: UserRepository;

  beforeEach(() => {
    const dbImplementation: Partial<Knex> = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      first: jest.fn() as jest.Mock,
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{ id: 1 }]),
      del: jest.fn().mockReturnThis(),
      update: jest.fn().mockResolvedValue(1),
      orderBy: jest.fn().mockReturnThis(),
    };
    db = jest.fn(() => dbImplementation) as any;
    Object.assign(db, dbImplementation);
    userRepository = new UserRepository({ db: db as any });
  });

  describe('get', () => {
    it('should return a user when given a valid id', async () => {
      const user: User = { id: 1, name: 'John Doe', password: '' };
      (db.first as jest.Mock).mockResolvedValue(user);

      const result = await userRepository.get(1);

      expect(result).toEqual(user);
      expect(db.select).toHaveBeenCalledWith('id', 'name');
      expect(db.from).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: 1 });
      expect(db.first).toHaveBeenCalled();
    });

    it('should throw an error when the user is not found', async () => {
      (db.first as jest.Mock).mockResolvedValue(undefined);

      await expect(userRepository.get(1)).rejects.toThrow('User not found');
    });
  });

  describe('save', () => {
    it('should save a user and return the new user id', async () => {
      const user: User = { id: 1, name: 'John Doe', password: 'password' };

      const result = await userRepository.save(user);

      expect(result).toEqual(1);
      expect(db).toHaveBeenCalledWith('users');
      expect(db.insert).toHaveBeenCalledWith(user);
      expect(db.returning).toHaveBeenCalledWith('id');
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = 1;

      await userRepository.delete(userId);

      expect(db).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: userId });
      expect(db.del).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user: User = { id: 1, name: 'John Doe', password: 'password' };

      await userRepository.update(user.id, user);

      expect(db).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: user.id });
      expect(db.update).toHaveBeenCalledWith(user);
    });

    it('should throw an error if no rows were affected', async () => {
      const user: User = { id: 1, name: 'John Doe', password: 'password' };

      (db.update as jest.Mock).mockResolvedValueOnce(0);

      await expect(userRepository.update(user.id, user))
        .rejects.toThrow('Failed to update user');

      expect(db).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: user.id });
      expect(db.update).toHaveBeenCalledWith(user);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users: User[] = [{ id: 1, name: 'John Doe', password: '' }];
      (db.orderBy as jest.Mock).mockResolvedValue(users);

      const result = await userRepository.getAllUsers();

      expect(result).toEqual(users);
      expect(db.select).toHaveBeenCalledWith('id', 'name');
      expect(db.from).toHaveBeenCalledWith('users');
      expect(db.orderBy).toHaveBeenCalledWith('id');
    });
  });
});