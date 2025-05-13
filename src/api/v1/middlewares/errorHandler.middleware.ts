import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { LogExecution } from '../../../decorators/logging';
import {
  createValidationError,
  logValidationError,
} from '../../../shared/utils/validation/validation.utils';

export class ValidationMiddleware {
  @LogExecution()
  static validate(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logValidationError(req.path, req.method, errors.array());
      res.status(400).json(createValidationError(errors.array()));
      return;
    }
    next();
  }
}
