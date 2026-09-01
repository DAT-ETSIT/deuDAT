import { Router } from "express";

import { isAdmin } from "../middleware/authorization.ts";
import { userController } from "../controllers/userController.ts";

const router = Router();

// All routes start by /users, specified in app.ts
router.patch("/", userController.updateUser);
router.patch("/:userId", isAdmin, userController.updateOtherUser);
router.delete("/:userId", isAdmin, userController.deleteOtherUser);

router.get("/balance", userController.getUserBalance);
router.get("/movements", userController.getUserMovements);
router.get("/movements/consumptions", userController.getUserConsumptions);
router.get("/movements/groceries", userController.getUserGroceries);
router.get("/movements/transfers", userController.getUserTransfers);
router.post("/movements/transfers", userController.createUserTransfer);
router.patch("/movements/transfers/:transferId", userController.updateUserTransfer);
router.delete("/movements/transfers/:transferId", userController.deleteUserTransfer);

router.get("/wishlist", userController.getUserWishlist);
router.get("/wishlist/history/:periodId", userController.getUserWishlistForPeriod);

router.get("/:userId/balance", isAdmin, userController.getOtherUserBalance);
router.get("/:userId/movements", isAdmin, userController.getOtherUserMovements);
router.get("/:userId/movements/consumptions", isAdmin, userController.getOtherUserConsumptions);
router.get("/:userId/movements/groceries", isAdmin, userController.getOtherUserGroceries);
router.get("/:userId/movements/transfers", isAdmin, userController.getOtherUserTransfers);

router.get("/:userId/wishlist", isAdmin, userController.getOtherUserWishlist);
router.get("/:userId/wishlist/history/:periodId", isAdmin, userController.getOtherUserWishlistForPeriod);

export default router;