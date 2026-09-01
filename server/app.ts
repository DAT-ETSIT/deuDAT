import express from "express";
import pino from "pino";
import { pinoHttp } from "pino-http";
import helmet from "helmet";
import cors from "cors";

import config from "./config.json" with { type: "json" };

import publicRouter from "./routes/public.ts";
import productRouter from "./routes/product.ts";
import userRouter from "./routes/user.ts";

import errorHandler, { NotFoundError } from "./middleware/errorHandler.ts";
import { authenticate } from "./middleware/authentication.ts";
import { isUser } from "./middleware/authorization.ts";

const app = express();

// --- LOGGER -----------------------------------------------------------------------
const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",

  transport:
    process.env.NODE_ENV !== "production"
      ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
        },
      }
      : undefined,
});

const httpLogger = pinoHttp({
  logger,

  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
      };
    },

    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

app.use(httpLogger);

// --- SECURITY ---------------------------------------------------------------------

// Prevents exposing technology in the headers
app.disable("x-powered-by");

app.use(helmet());

var corsOptions = {
  origin: config.cors.frontendUrl,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

if (config.server.usingProxy) {
  app.set("trust proxy", 1); // If we use a proxy (Nginx), let Express trust its headers
}

// --- PROCESSING REQUESTS ----------------------------------------------------------

// Parse request bodies as JSON
app.use(express.json({ limit: config.server.jsonLimit }));

// --- ROUTES -----------------------------------------------------------------------

app.use("/", publicRouter);
app.use(authenticate, isUser);
app.use("/products", productRouter);
app.use("/users", userRouter);


// --- ERROR HANDLING --------------------------------------------------------------

// 404
app.use((req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
