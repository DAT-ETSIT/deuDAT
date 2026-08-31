import { Router } from "express";

import { publicController } from "../controllers/publicController.ts";

const router = Router();

router.get("/", publicController.getApiInfo);
router.get("/health", publicController.getApiHealth);

export default router;
