import type { AuthClaims } from "./middleware/authentication.ts";
import type { User } from "./database/models/user.ts";

declare global {
  namespace Express {
    interface Locals {
      auth?: AuthClaims;
      user?: User;

      validated?: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      };
    }
  }
}