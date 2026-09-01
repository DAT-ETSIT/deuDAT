import type { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

import config from "../config.json" with { type: "json" };
import { UnauthorizedError } from "./errorHandler.ts";

const JWKS = createRemoteJWKSet(new URL(config.authentik.jwks_url));

export type AuthClaims = {
  iss: string;
  sub: string;
  "deudat-user": boolean;
  "deudat-admin": boolean;

  email: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  groups: string[];

  [key: string]: unknown;
};

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  const prefix = "Bearer ";

  if (!authorization?.startsWith(prefix)) {
    throw new UnauthorizedError("Missing bearer token");
  }

  const token = authorization.slice(prefix.length);

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: config.authentik.issuer,
      audience: config.authentik.audience,
      requiredClaims: ['sub', 'exp', 'iat'],
      maxTokenAge: '10 minutes',
    });

    res.locals.auth = payload as AuthClaims;

    next();
  } catch (error) {
    console.error(error)
    throw new UnauthorizedError("Invalid or expired token");
  }
}
