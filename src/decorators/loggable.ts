/* eslint-disable no-param-reassign */
import logger from '../utils/logger';
import sanitize from '../utils/sanitize';

function loggable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function log(...args: any[]) {
    const className = target.constructor.name;
    const start = Date.now();
    try {
      const sanitizedArgs = args.map((arg) => sanitize(arg));

      logger.info(`Start ${className}.${propertyKey} params: ${JSON.stringify(sanitizedArgs)}`);

      const result = await originalMethod.apply(this, args);

      const end = Date.now();
      const duration = end - start;

      logger.info(`End ${className}.${propertyKey}. Duration: ${duration}ms`);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error ${className}.${propertyKey}: ${error.message} params: ${JSON.stringify(args)}`);
      } else {
        logger.error(`Error ${className}.${propertyKey}: ${error} params: ${JSON.stringify(args)}`);
      }
      throw error;
    }
  };

  return descriptor;
}

export default loggable;
