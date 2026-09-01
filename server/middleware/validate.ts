import type { Request, Response, NextFunction } from "express";
import { z, type ZodType, type ZodError } from "zod";

import { BadRequestError, type InputErrorDetail } from "./errorHandler.ts";

// SCHEMAS

export const userIdSchema = z.object({
  userId: z.coerce.number("User ID must be a number").int("User ID must be an integer").positive("User ID must be a positive number"),
});

export const transferIdSchema = z.object({
  transferId: z.coerce.number("Transfer ID must be a number").int("Transfer ID must be an integer").positive("Transfer ID must be a positive number"),
});

export const periodIdSchema = z.object({
  periodId: z.coerce.number("Period ID must be a number").int("Period ID must be an integer").positive("Period ID must be a positive number"),
});

export const productIdSchema = z.object({
  productId: z.coerce.number("Product ID must be a number").int("Product ID must be an integer").positive("Product ID must be a positive number"),
});

export const priceIdSchema = z.object({
  priceId: z.coerce.number("Price ID must be a number").int("Price ID must be an integer").positive("Price ID must be a positive number"),
});

export const groceryIdSchema = z.object({
  groceryId: z.coerce.number("Grocery ID must be a number").int("Grocery ID must be an integer").positive("Grocery ID must be a positive number"),
});

export const consumptionIdSchema = z.object({
  consumptionId: z.coerce.number("Consumption ID must be a number").int("Consumption ID must be an integer").positive("Consumption ID must be a positive number"),
});

export const adjustmentIdSchema = z.object({
  adjustmentId: z.coerce.number("Adjustment ID must be a number").int("Adjustment ID must be an integer").positive("Adjustment ID must be a positive number"),
});

export const userPeriodIdsSchema = userIdSchema.extend(periodIdSchema.shape);

export const productUserIdsSchema = productIdSchema.extend(userIdSchema.shape);

export const productPriceIdsSchema = productIdSchema.extend(priceIdSchema.shape);

export const productGroceryIdsSchema = productIdSchema.extend(groceryIdSchema.shape);

export const productConsumptionIdsSchema = productIdSchema.extend(consumptionIdSchema.shape);

export const productAdjustmentIdsSchema = productIdSchema.extend(adjustmentIdSchema.shape);

export const productPeriodIdsSchema = productIdSchema.extend(periodIdSchema.shape);

export const productUserPeriodIdsSchema = productIdSchema.extend(userIdSchema.shape).extend(periodIdSchema.shape);

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