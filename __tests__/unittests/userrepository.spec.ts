import { Knex } from 'knex';
import UserRepository from '../../src/datalayer/UserRepository';
import { User } from '../../src/types';
import { beforeEach, describe, expect, it, MockInstance, vi } from 'vitest';

vi.mock('knex');

describe('UserRepository', () => {
  let db: ReturnType<typeof vi.fn> & Partial<Knex>;
  let userRepository: UserRepository;

  beforeEach(() => {
    const dbImplementation: Partial<Knex> = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      first: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{ id: 1 }]),
      del: vi.fn().mockReturnThis(),
      update: vi.fn().mockResolvedValue(1),
      orderBy: vi.fn().mockReturnThis(),
    };
    db = vi.fn(() => dbImplementation) as any;
    Object.assign(db, dbImplementation);
    userRepository = new UserRepository({ db: db as any });
  });

  describe('get', () => {
    it('should return a user when given a valid id', async () => {
      const user: User = { id: 1, name: 'John Doe', password: '' };
      ((db.first as unknown) as MockInstance).mockResolvedValue(user);

      const result = await userRepository.get(1);

      expect(result).toEqual(user);
      expect(db.select).toHaveBeenCalledWith('id', 'name');
      expect(db.from).toHaveBeenCalledWith('users');
      expect(db.where).toHaveBeenCalledWith({ id: 1 });
      expect(db.first).toHaveBeenCalled();
    });

    it('should throw an error when the user is not found', async () => {
      ((db.first as unknown) as MockInstance).mockResolvedValue(undefined);

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

      ((db.update as unknown) as MockInstance).mockResolvedValueOnce(0);
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
      ((db.orderBy as unknown) as MockInstance).mockResolvedValueOnce(users);

      const result = await userRepository.getAllUsers();

      expect(result).toEqual(users);
      expect(db.select).toHaveBeenCalledWith('id', 'name');
      expect(db.from).toHaveBeenCalledWith('users');
      expect(db.orderBy).toHaveBeenCalledWith('id');
    });
  });
});