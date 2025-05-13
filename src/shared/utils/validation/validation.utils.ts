import { ValidationError } from 'express-validator';

export interface ValidationErrorResponse {
  status: string;
  message: string;
  errors: ValidationError[];
  timestamp: string;
}

export const createValidationError = (
  errors: ValidationError[],
): ValidationErrorResponse => {
  return {
    status: 'error',
    message: 'Validation failed',
    errors: errors,
    timestamp: new Date().toISOString(),
  };
};

export const logValidationError = (
  path: string,
  method: string,
  errors: ValidationError[],
): void => {
  console.error(
    'Validation Error:',
    JSON.stringify(
      {
        path,
        method,
        errors,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
