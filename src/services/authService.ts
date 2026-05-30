import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserRepository } from "../repositories/userRepository";
import type { LoginInput } from "../schemas/authSchema";
import { AppError } from "../lib/AppError";

const ACCESS_EXPIRY = "15m";
const REFRESH_EXPIRY = "7d";

function getSecret(key: "JWT_SECRET" | "JWT_REFRESH_SECRET"): string {
  const value = process.env[key];
  if (!value) throw new Error(`Variável de ambiente ${key} não definida`);
  return value;
}

export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  async login(data: LoginInput) {
    const user = await this.repository.findByEmail(data.email);
    if (!user) throw new AppError(401, "Credenciais inválidas");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new AppError(401, "Credenciais inválidas");

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email },
      getSecret("JWT_SECRET"),
      { expiresIn: ACCESS_EXPIRY },
    );

    const refreshToken = jwt.sign(
      { sub: user.id },
      getSecret("JWT_REFRESH_SECRET"),
      { expiresIn: REFRESH_EXPIRY },
    );

    return { accessToken, refreshToken };
  }

  refresh(token: string) {
    try {
      const payload = jwt.verify(token, getSecret("JWT_REFRESH_SECRET")) as { sub: string };

      const accessToken = jwt.sign(
        { sub: payload.sub },
        getSecret("JWT_SECRET"),
        { expiresIn: ACCESS_EXPIRY },
      );

      return { accessToken };
    } catch {
      throw new AppError(401, "Refresh token inválido ou expirado");
    }
  }
}
