import { Router } from "express";
import { authenticate } from "../middleware/authentication.ts";
import { uploadImage } from "../middleware/upload.ts";
import { idSchema, testBodySchema, testQuerySchema, validateBody, validateParams, validateQuery } from "../middleware/validate.ts";

const router = Router();

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
  const validated = res.locals.validated!;
  res.status(200).json({
    message: "Validation successful",
    validatedParams: validated.params,
    validatedQuery: validated.query,
    validatedBody: validated.body,
  });
});

export default router;