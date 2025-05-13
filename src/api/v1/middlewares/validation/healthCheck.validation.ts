import { query, ValidationChain } from 'express-validator';
import { sanitizeInput } from '../../../../shared/utils/validation/validation.utils';

export const healthCheckValidation: ValidationChain[] = [
  query('format')
    .optional()
    .customSanitizer((value) => sanitizeInput(value))
    .isIn(['simple', 'detailed'])
    .withMessage('format must be either "simple" or "detailed"'),
  query('timeout')
    .optional()
    .isInt({ min: 1000, max: 10000 })
    .withMessage('timeout must be between 1000 and 10000 ms'),
];
