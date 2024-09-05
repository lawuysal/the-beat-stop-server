import { Request, Response, NextFunction } from "express";

function catchAsync(
  fn: (arg0: Request, arg1: Response, arg2: NextFunction) => Promise<void>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((err: Error) => next(err));
  };
}

export default catchAsync;
