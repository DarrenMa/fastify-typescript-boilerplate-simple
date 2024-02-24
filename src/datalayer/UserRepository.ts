import { Knex } from 'knex';
import { User } from '../types';

export default class UserRepository {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async get(userId: number): Promise<User> {
    const user = await this.db.select('id', 'name')
      .from<User>('users')
      .where({ id: userId })
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async save(user: User): Promise<number> {
    const newUser = await this.db('users')
      .insert(user)
      .returning('id');

    return newUser[0].id;
  }

  async delete(userId: number): Promise<void> {
    await this.db('users')
      .where({ id: userId })
      .del();
  }

  async update(user: User): Promise<void> {
    const rowsAffected = await this.db('users')
      .where({ id: user.id })
      .update(user);

    if (!rowsAffected) {
      throw new Error('Failed to update user');
    }
  }
}
