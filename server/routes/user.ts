import { Router } from "express";

import { isAdmin } from "../middleware/authorization.ts";
import { userController } from "../controllers/userController.ts";

const router = Router();

// All routes start by /users, specified in app.ts
router.patch("/", userController.updateUser);
router.patch("/:userId", isAdmin, userController.updateOtherUser);

router.get("/balance", userController.getUserBalance);
router.get("/purchases", userController.getUserPurchases);
router.get("/movements", userController.getUserMovements);
router.get("/wishlist", userController.getUserWishlist);
router.get("/wishlist/history", userController.getUserWishlistHistory);
router.get("/wishlist/history/:periodId", userController.getUserWishlistForPeriod);

router.get("/:userId/balance", isAdmin, userController.getOtherUserBalance);
router.get("/:userId/purchases", isAdmin, userController.getOtherUserPurchases);
router.get("/:userId/movements", isAdmin, userController.getOtherUserMovements);
router.get("/:userId/wishlist", isAdmin, userController.getOtherUserWishlist);
router.get("/:userId/wishlist/history", isAdmin, userController.getOtherUserWishlistHistory);
router.get("/:userId/wishlist/history/:periodId", isAdmin, userController.getOtherUserWishlistForPeriod);

export default router;