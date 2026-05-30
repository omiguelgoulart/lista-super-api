import type { Request, Response, NextFunction } from "express";
import type { AuthService } from "../services/authService";
import { loginSchema, refreshSchema } from "../schemas/authSchema";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const tokens = await this.service.login(data);
      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = refreshSchema.parse(req.body);
      const tokens = this.service.refresh(refreshToken);
      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }
}
