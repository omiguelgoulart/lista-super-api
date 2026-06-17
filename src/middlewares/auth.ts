import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../lib/AppError";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next(new AppError(401, "Token não fornecido"));
    }

    const token = header.slice(7);
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET não definido");

    try {
        const payload = jwt.verify(token, secret) as { sub: string; email: string };
        res.locals.userId = payload.sub;
        next();
    } catch {
        next(new AppError(401, "Token inválido ou expirado"));
    }
}
