import { Router } from "express";
import { authenticate } from "../middleware/authentication.ts";
import { uploadImage } from "../middleware/upload.ts";
import { idSchema, testBodySchema, testQuerySchema, validateBody, validateParams, validateQuery } from "../middleware/validate.ts";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the template API",
  });
});

router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "API is running smoothly",
  });
});

router.get("/protected", authenticate, (_req, res) => {
  res.status(200).json({
    message: "You have access to this protected route",
  });
});

router.post("/upload", uploadImage, (req, res) => {
  res.status(200).json({
    message: "Image uploaded successfully",
    filename: req.file?.originalname,
  });
});

router.post("/validation/:id", validateParams(idSchema), validateQuery(testQuerySchema), validateBody(testBodySchema), (req, res) => {
  res.status(200).json({
    message: "Validation successful",
    validatedParams: res.locals.validated.params,
    validatedQuery: res.locals.validated.query,
    validatedBody: res.locals.validated.body,
  });
});

export default router;
