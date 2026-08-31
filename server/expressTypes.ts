import type { AuthClaims } from "./middleware/authentication.ts";

declare global {
  namespace Express {
    interface Locals {
      auth?: AuthClaims;

      validated?: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      };
    }
  }
}