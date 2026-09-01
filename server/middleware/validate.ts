import type { Request, Response, NextFunction } from "express";
import { z, type ZodType, type ZodError } from "zod";

import { BadRequestError, type InputErrorDetail } from "./errorHandler.ts";

// PARAM SCHEMAS

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

// BODY SCHEMAS

export const UserPatchSchema = z
  .object({
    email: z.email("Email must be a valid email address").optional(),
    givenName: z
      .string("Name must be a string")
      .max(255, "Name must not exceed 255 characters")
      .optional(),
  })
  .refine((data) => data.email !== undefined || data.givenName !== undefined, {
    error: "At least one field must be provided",
    path: [],
  });

export const TransferPostSchema = z.object({
  amount: z.coerce.number("Amount must be a number").int("Amount must be an integer").positive("Amount must be a positive number"),
  note: z.string("Note must be a string").max(255, "Note must not exceed 255 characters"),
  senderId: z.coerce.number("Sender ID must be a number").int("Sender ID must be an integer").positive("Sender ID must be a positive number"),
  recipientId: z.coerce.number("Recipient ID must be a number").int("Recipient ID must be an integer").positive("Recipient ID must be a positive number"),
});

export const TransferPatchSchema = z.object({
  amount: z.coerce.number("Amount must be a number").int("Amount must be an integer").positive("Amount must be a positive number").optional(),
  note: z.string("Note must be a string").max(255, "Note must not exceed 255 characters").optional(),
  senderId: z.coerce.number("Sender ID must be a number").int("Sender ID must be an integer").positive("Sender ID must be a positive number").optional(),
  recipientId: z.coerce.number("Recipient ID must be a number").int("Recipient ID must be an integer").positive("Recipient ID must be a positive number").optional(),
}).refine((data) => data.amount !== undefined || data.note !== undefined || data.senderId !== undefined || data.recipientId !== undefined, {
  error: "At least one field must be provided",
  path: [],
});

export const ProductPostSchema = z.object({
  name: z.string("Name must be a string").max(255, "Name must not exceed 255 characters")
});

export const ProductPatchSchema = z.object({
  name: z.string("Name must be a string").max(255, "Name must not exceed 255 characters").optional()
})

export const ProductPricePostSchema = z.object({
  price: z.coerce.number("Price must be a number").int("Price must be an integer").positive("Price must be a positive number"),
  startDate: z.string("Start date must be a string").refine((date) => !isNaN(Date.parse(date)), "Start date must be a valid date"),
});

export const ProductGroceryPostSchema = z.object({
  units: z.coerce.number("Quantity must be a number").int("Quantity must be an integer").positive("Quantity must be a positive number"),
  totalCost: z.coerce.number("Total cost must be a number").nonnegative("Total cost must be a non-negative number").refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), "Total cost must have at most two decimal places"),
  note: z.string("Note must be a string").max(255, "Note must not exceed 255 characters").optional(),
  date: z.string("Date must be a string").refine((date) => !isNaN(Date.parse(date)), "Date must be a valid date"),
});

export const ProductGroceryPatchSchema = z.object({
  units: z.coerce.number("Quantity must be a number").int("Quantity must be an integer").positive("Quantity must be a positive number").optional(),
  totalCost: z.coerce.number("Total cost must be a number").nonnegative("Total cost must be a non-negative number").refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), "Total cost must have at most two decimal places").optional(),
  note: z.string("Note must be a string").max(255, "Note must not exceed 255 characters").optional(),
  date: z.string("Date must be a string").refine((date) => !isNaN(Date.parse(date)), "Date must be a valid date").optional(),
}).refine((data) => data.units !== undefined || data.totalCost !== undefined || data.note !== undefined || data.date !== undefined, {
  error: "At least one field must be provided",
  path: [],
});

export const ProductConsumptionPostSchema = z.object({
  units: z.coerce.number("Quantity must be a number").int("Quantity must be an integer").positive("Quantity must be a positive number"),
  date: z.string("Date must be a string").refine((date) => !isNaN(Date.parse(date)), "Date must be a valid date"),
});

export const ProductConsumptionPatchSchema = z.object({
  units: z.coerce.number("Quantity must be a number").int("Quantity must be an integer").positive("Quantity must be a positive number").optional(),
  date: z.string("Date must be a string").refine((date) => !isNaN(Date.parse(date)), "Date must be a valid date").optional(),
}).refine((data) => data.units !== undefined || data.date !== undefined, {
  error: "At least one field must be provided",
  path: [],
});

export const ProductAdjustmentPostSchema = z.object({
  units: z.coerce.number("Quantity must be a number").int("Quantity must be an integer").refine((value) => value !== 0, "Quantity cannot be zero"),
  note: z.string("Note must be a string").max(255, "Note must not exceed 255 characters").optional(),
  date: z.string("Date must be a string").refine((date) => !isNaN(Date.parse(date)), "Date must be a valid date"),
});

export const ProductAdjustmentPatchSchema = z.object({
  units: z.coerce.number("Quantity must be a number").int("Quantity must be an integer").refine((value) => value !== 0, "Quantity cannot be zero").optional(),
  note: z.string("Note must be a string").max(255, "Note must not exceed 255 characters").optional(),
  date: z.string("Date must be a string").refine((date) => !isNaN(Date.parse(date)), "Date must be a valid date").optional(),
}).refine((data) => data.units !== undefined || data.note !== undefined || data.date !== undefined, {
  error: "At least one field must be provided",
  path: [],
});

export const WishlistPeriodPostSchema = z.object({
  closedAt: z.string("Closed at must be a string").refine((date) => !isNaN(Date.parse(date)), "Closed at must be a valid date").optional(),
  reason: z.string("Reason must be a string").max(255, "Reason must not exceed 255 characters").optional(),
});

export const WishlistPeriodPatchSchema = z.object({
  closedAt: z.string("Closed at must be a string").refine((date) => !isNaN(Date.parse(date)), "Closed at must be a valid date").optional(),
  reason: z.string("Reason must be a string").max(255, "Reason must not exceed 255 characters").optional(),
}).refine((data) => data.closedAt !== undefined || data.reason !== undefined, {
  error: "At least one field must be provided",
  path: [],
});

export const WishlistEntrySchema = z.object({
  amount: z.enum(["small", "large"], "Amount must be either 'small' or 'large'"),
});


// Helper function

function getZodInputErrors(error: ZodError): InputErrorDetail[] {
  return error.issues.map((issue) => ({
    field: issue.path.length ? issue.path.join(".") : null,
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