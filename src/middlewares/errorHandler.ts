import type { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/AppError";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  console.error(err.stack);
  res.status(500).json({ error: err.message ?? "Internal server error" });
}