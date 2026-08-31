import type { Request, Response, NextFunction } from "express";
import { z, type ZodType, type ZodError } from "zod";

import { BadRequestError, type InputErrorDetail } from "./errorHandler.ts";

// SCHEMAS

export const idSchema = z.object({
  id: z.coerce.number("ID must be a number").int("ID must be an integer").positive("ID must be a positive number"),
});

export const testQuerySchema = z.object({
  query: z.string().min(1, "Query parameter cannot be empty"),
});

export const testBodySchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
});

// Helper function

function getZodInputErrors(error: ZodError): InputErrorDetail[] {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}


// VALIDATION MIDDLEWARE

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new BadRequestError("Invalid request body", getZodInputErrors(result.error)));
    }

    res.locals.validated ??= {};
    res.locals.validated.body = result.data;

    next();
  };
}

export function validateParams(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return next(new BadRequestError("Invalid route parameters", getZodInputErrors(result.error)));
    }

    res.locals.validated ??= {};
    res.locals.validated.params = result.data;

    next();
  };
}

export function validateQuery(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(
        new BadRequestError("Invalid query parameters", getZodInputErrors(result.error))
      );
    }

    res.locals.validated ??= {};
    res.locals.validated.query = result.data;

    next();
  };
}