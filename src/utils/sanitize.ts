import sensitiveProps from '../utils/sensitiveProps.js';

export default function sanitize(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    // Not an object or array, return as is
    return obj;
  }

  if (Array.isArray(obj)) {
    // If it's an array, sanitize each element
    return obj.map(sanitize);
  }

  const sanitizedObj: Record<string, any> = {};

  Object.keys(obj).forEach((prop) => {
    if (Object.hasOwn(obj, prop)) {
      if (sensitiveProps.includes(prop)) {
        sanitizedObj[prop] = '[SENSITIVE]';
      } else {
        sanitizedObj[prop] = sanitize(obj[prop]); // Recursively sanitize nested objects
      }
    }
  });

  return sanitizedObj;
}
