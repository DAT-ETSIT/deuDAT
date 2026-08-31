import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the deudat API",
  });
});

router.get("/health", (_req, res) => {
  res.status(200).json({
    message: "API is running smoothly",
  });
});

export default router;
