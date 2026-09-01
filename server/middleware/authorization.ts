import type { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "./errorHandler.ts";
import { User } from "../database/models/user.ts";

type AccessClaim = "deudat-user" | "deudat-admin";

function requireBooleanClaim(claim: AccessClaim, message: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = res.locals.auth;

    if (!auth) {
      throw new UnauthorizedError("User is not authenticated");
    }

    if (auth[claim] !== true) {
      throw new ForbiddenError(message);
    }

    if (claim === "deudat-user") {
      await ensureUserExists(res);
    }

    next();
  };
}

export const isUser = requireBooleanClaim(
  "deudat-user",
  "You are not allowed to use this application",
);

export const isAdmin = requireBooleanClaim(
  "deudat-admin",
  "Admin access is required",
);

async function ensureUserExists(res: Response) {
  const auth = res.locals.auth!;

  const [user] = await User.findOrCreate({
        where: {
            issuer: auth.iss,
            subject: auth.sub,
        },
        defaults: {
            issuer: auth.iss,
            subject: auth.sub,
            email: auth.email,
            username: auth.preferred_username,
            givenName: auth.given_name,
        },
    });

  res.locals.user = user;
}