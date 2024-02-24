import { EnvironmentVariables } from '../types';

function getStringEnvVar(key: string): string {
  return process.env[key] ?? '';
}

function getNumberEnvVar(key: string): number {
  return parseInt(process.env[key] ?? '', 10);
}

function getBooleanEnvVar(key: string): boolean {
  return process.env[key] === 'true';
}

export default function getEnvironmentVariables(): EnvironmentVariables {
  return {
    ENVIRONMENT: getStringEnvVar('ENVIRONMENT'),
    HOST_NAME: getStringEnvVar('HOST_NAME'),
    HOST_PORT: getNumberEnvVar('HOST_PORT'),
    LOG_FOLDER_INFO: getStringEnvVar('LOG_FOLDER_INFO'),
    LOG_FOLDER_ERROR: getStringEnvVar('LOG_FOLDER_ERROR'),
    DATE_PATTERN: getStringEnvVar('DATE_PATTERN'),
    ZIPPED_ARCHIVE: getBooleanEnvVar('ZIPPED_ARCHIVE'),
    MAX_SIZE: getStringEnvVar('MAX_SIZE'),
    MAX_FILES: getStringEnvVar('MAX_FILES'),
    DB_CLIENT: getStringEnvVar('DB_CLIENT'),
    DB_CONNECTION: getStringEnvVar('DB_CONNECTION'),
    DB_SSL: getBooleanEnvVar('DB_SSL'),
    POOL_MIN: getNumberEnvVar('POOL_MIN'),
    POOL_MAX: getNumberEnvVar('POOL_MAX'),
    IDLE_TIMEOUT_MILLIS: getNumberEnvVar('IDLE_TIMEOUT_MILLIS'),
    MIGRATIONS_TABLE_NAME: getStringEnvVar('MIGRATIONS_TABLE_NAME'),
    DB_DEBUG: getBooleanEnvVar('DB_DEBUG'),
  };
}
