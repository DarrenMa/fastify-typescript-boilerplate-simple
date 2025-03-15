interface EnvironmentVariables {
  ENVIRONMENT: string;
  HOST_NAME: string;
  HOST_PORT: number;
  DB_CLIENT: string;
  DB_CONNECTION: string;
  DB_SSL: boolean;
  POOL_MIN: number;
  POOL_MAX: number;
  IDLE_TIMEOUT_MILLIS: number;
  MIGRATIONS_TABLE_NAME: string;
  DB_DEBUG: boolean;
}

export default EnvironmentVariables;
