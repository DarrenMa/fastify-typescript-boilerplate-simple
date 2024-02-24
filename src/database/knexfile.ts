import { Knex } from 'knex';
import getEnvironmentVariables from '../utils/environmentalVariables';

const env = getEnvironmentVariables();

const knexConfig: Knex.Config = {
  client: env.DB_CLIENT,
  connection: env.DB_CONNECTION,
  pool: {
    min: env.POOL_MIN,
    max: env.POOL_MAX,
    idleTimeoutMillis: env.IDLE_TIMEOUT_MILLIS,
  },
  migrations: {
    tableName: env.MIGRATIONS_TABLE_NAME,
  },
  debug: env.DB_DEBUG,
};

export default knexConfig;
