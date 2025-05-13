import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { LogExecution } from '../../../decorators/logging';
import {
  createValidationError,
  logValidationError,
} from '../../../shared/utils/validation/validation.utils';

export class ValidationMiddleware {
  @LogExecution()
  static validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Log validation errors
      logValidationError(req.path, req.method, errors.array());
      return res.status(400).json(createValidationError(errors.array()));
    }
    next();
  }
}
