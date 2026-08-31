import { Router } from "express";

import { isAdmin } from "../middleware/authorization.ts";
import { wishlistController } from "../controllers/wishlistController.ts";

const router = Router();

// All routes start by /wishlist, specified in app.ts
router.get("/", wishlistController.getWishlist);
router.get("/products/:productId", wishlistController.getProductWishlist);
router.post("/products/:productId", wishlistController.addProductToWishlist);
router.patch("/products/:productId", wishlistController.updateProductWishlist);
router.delete("/products/:productId", wishlistController.removeProductFromWishlist);
router.patch("/products/:productId/users/:userid", isAdmin, wishlistController.updateUsersProductWishlist);
router.delete("/products/:productId/users/:userid", isAdmin, wishlistController.removeUsersProductFromWishlist);

router.get("/history", wishlistController.getWishlistHistory);
router.get("/history/:periodId", wishlistController.getWishlistForPeriod);
router.get("/history/:periodId/products/:productId", wishlistController.getProductWishlistForPeriod);
router.patch("/history/:periodId/products/:productId/users/:userid", isAdmin, wishlistController.updateUsersProductWishlistForPeriod);
router.delete("/history/:periodId/products/:productId/users/:userid", isAdmin, wishlistController.removeUsersProductFromWishlistForPeriod);

export default router;
