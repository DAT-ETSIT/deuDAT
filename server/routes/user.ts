import { Router } from "express";

import { isAdmin } from "../middleware/authorization.ts";
import { userController } from "../controllers/userController.ts";

import { validateParams, validateBody } from "../middleware/validate.ts";
import { userIdSchema, transferIdSchema, periodIdSchema, userPeriodIdsSchema, UserPatchSchema, TransferPatchSchema, TransferPostSchema } from "../middleware/validate.ts";

const router = Router();

// All routes start by /users, specified in app.ts
router.patch("/", validateBody(UserPatchSchema), userController.updateUser);
router.patch("/:userId", isAdmin, validateParams(userIdSchema), validateBody(UserPatchSchema), userController.updateOtherUser);
router.delete("/:userId", isAdmin, validateParams(userIdSchema), userController.deleteOtherUser);

router.get("/balance", userController.getUserBalance);
router.get("/movements", userController.getUserMovements);
router.get("/movements/consumptions", userController.getUserConsumptions);
router.get("/movements/groceries", userController.getUserGroceries);
router.get("/movements/transfers", userController.getUserTransfers);
router.post("/movements/transfers", validateBody(TransferPostSchema), userController.createUserTransfer);
router.patch("/movements/transfers/:transferId", validateParams(transferIdSchema), validateBody(TransferPatchSchema), userController.updateUserTransfer);
router.delete("/movements/transfers/:transferId", validateParams(transferIdSchema), userController.deleteUserTransfer);

router.get("/wishlist", userController.getUserWishlist);
router.get("/wishlist/history/:periodId", validateParams(periodIdSchema), userController.getUserWishlistForPeriod);

router.get("/:userId/balance", isAdmin, validateParams(userIdSchema), userController.getOtherUserBalance);
router.get("/:userId/movements", isAdmin, validateParams(userIdSchema), userController.getOtherUserMovements);
router.get("/:userId/movements/consumptions", isAdmin, validateParams(userIdSchema), userController.getOtherUserConsumptions);
router.get("/:userId/movements/groceries", isAdmin, validateParams(userIdSchema), userController.getOtherUserGroceries);
router.get("/:userId/movements/transfers", isAdmin, validateParams(userIdSchema), userController.getOtherUserTransfers);

router.get("/:userId/wishlist", isAdmin, validateParams(userIdSchema), userController.getOtherUserWishlist);
router.get("/:userId/wishlist/history/:periodId", isAdmin, validateParams(userPeriodIdsSchema), userController.getOtherUserWishlistForPeriod);

export default router;