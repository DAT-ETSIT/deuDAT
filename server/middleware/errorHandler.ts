import type { ErrorRequestHandler } from "express";

// CUSTOM ERROR CLASSES ----------------------------------------------------------

// API error codes

export const ErrorCode = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  GONE: "GONE",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type InputErrorDetail = {
  field: string;
  message: string;
};

// Base class for custom errors
export class AppError extends Error {
  public readonly httpCode: number;
  public readonly apiCode: ErrorCode;

  constructor(message: string, httpCode: number, apiCode: ErrorCode) {
    super(message);
    this.httpCode = httpCode;
    this.apiCode = apiCode;

    this.name = this.constructor.name;
  }
}

// Custom error classes for specific HTTP status codes

export class BadRequestError extends AppError {
  public readonly details?: InputErrorDetail[];

  constructor(message = "Bad request", details?: InputErrorDetail[]) {
    super(message, 400, ErrorCode.BAD_REQUEST);
    this.details = details;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, ErrorCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, ErrorCode.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404, ErrorCode.NOT_FOUND);
  }
}

export class GoneError extends AppError {
  constructor(message = "Resource gone") {
    super(message, 410, ErrorCode.GONE);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500, ErrorCode.INTERNAL_SERVER_ERROR);
  }
}

// ERROR HANDLER MIDDLEWARE ------------------------------------------------------

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError && err.httpCode < 500) {
    const errorResponse = {
      error: {
        message: err.message,
        code: err.apiCode,
        ...(err instanceof BadRequestError &&
          err.details && {
          details: err.details,
        }),
      },
    };

    const detailsMessage =
      err instanceof BadRequestError && err.details
        ? ` Input errors: ${JSON.stringify(err.details)}`
        : "";

    req.log.warn(
      `Client error: ${err.message}.${detailsMessage} (status code: ${err.httpCode})`,
    );

    res.status(err.httpCode).json(errorResponse);
    return;
  }

  req.log.error(`Unexpected error: ${err}`);

  res.status(500).json({
    error: {
      message: "Internal server error",
      code: ErrorCode.INTERNAL_SERVER_ERROR,
    },
  });
};

export default errorHandler;
