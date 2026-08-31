import type { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "./errorHandler.ts";

type AccessClaim = "deudat-user" | "deudat-admin";

function requireBooleanClaim(claim: AccessClaim, message: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = res.locals.auth;

    if (!auth) {
      throw new UnauthorizedError("User is not authenticated");
    }

    if (auth[claim] !== true) {
      throw new ForbiddenError(message);
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
