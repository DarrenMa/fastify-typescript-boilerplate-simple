import { Knex } from 'knex';
import UserRepository from '../../src/datalayer/UserRepository';

jest.mock('knex');

describe('UserRepository', () => {
  let db: jest.Mocked<Partial<Knex>> & jest.Mock;
  let userRepository: UserRepository;

  beforeEach(() => {
    const dbImplementation: Partial<Knex> = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      first: jest.fn(),
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{ id: 1 }]),
      del: jest.fn().mockReturnThis(),
      update: jest.fn().mockResolvedValue(1),
    };
    db = jest.fn(() => dbImplementation) as any;
    Object.assign(db, dbImplementation);
    userRepository = new UserRepository(db as any);
  });

  describe('get', () => {
    it('should return a user when given a valid id', async () => {
      const user = { id: 1, name: 'John Doe' };
      db.select = jest.fn().mockReturnThis();
      db.from = jest.fn().mockReturnThis();
      db.where = jest.fn().mockReturnThis();
      db.first = jest.fn().mockResolvedValue(user);

      const result = await userRepository.get(1);

      expect(result).toEqual(user);
      expect(db.select).toHaveBeenCalledWith('id', 'name');
      expect(db.from).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: 1 });
      expect(db.first).toHaveBeenCalled();
    });

    it('should throw an error when the user is not found', async () => {
      db.select = jest.fn().mockReturnThis();
      db.from = jest.fn().mockReturnThis();
      db.where = jest.fn().mockReturnThis();
      db.first = jest.fn().mockResolvedValue(undefined);

      await expect(userRepository.get(1)).rejects.toThrow('User not found');
    });
  });

  describe('save', () => {
    it('should save a user and return the new user id', async () => {
      const user = { id: 1, name: 'John Doe', password: 'password' };

      const result = await userRepository.save(user);

      expect(result).toEqual(1);
      expect(db).toHaveBeenCalledWith('users');
      expect(db.insert).toHaveBeenCalledWith(user);
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
      const user = { id: 1, name: 'John Doe', password: 'password' };

      await userRepository.update(user);

      expect(db).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: user.id });
      expect(db.update).toHaveBeenCalledWith(user);
    });

    it('should throw an error if no rows were affected', async () => {
      const user = { id: 1, name: 'John Doe', password: 'password' };

      (db.update as jest.Mock).mockImplementationOnce(() => Promise.resolve(0));
      
      await expect(userRepository.update(user))
        .rejects.toThrow('Failed to update user');

      expect(db).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: user.id });
      expect(db.update).toHaveBeenCalledWith(user);
    });
  });

});