interface EnvironmentVariables {
  ENVIRONMENT: string;
  HOST_NAME: string;
  HOST_PORT: number;
  LOG_FOLDER_INFO: string;
  LOG_FOLDER_ERROR: string;
  DATE_PATTERN: string;
  ZIPPED_ARCHIVE: boolean;
  MAX_SIZE: string;
  MAX_FILES: string;
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
