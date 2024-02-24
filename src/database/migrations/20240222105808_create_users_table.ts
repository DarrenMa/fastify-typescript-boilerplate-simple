/* eslint-disable no-console */
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
  });
  console.log('Created table: users');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  console.log('Dropped table: users');
}
