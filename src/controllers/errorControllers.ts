import { Request, Response } from "express";
import AppError from "../utils/AppError";

function globalErrorHandler(err: AppError, req: Request, res: Response) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

export default globalErrorHandler;
