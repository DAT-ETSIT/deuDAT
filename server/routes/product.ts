import { Router } from "express";

import { isAdmin } from "../middleware/authorization.ts";
import { productController } from "../controllers/productController.ts";
import { wishlistController } from "../controllers/wishlistController.ts";

const router = Router();

// All routes start by /products, specified in app.ts
router.get("/", productController.getProducts);
router.get("/:productId", productController.getProduct);
router.post("/", productController.createProduct);
router.patch("/:productId", isAdmin, productController.updateProduct);
router.delete("/:productId", isAdmin, productController.deleteProduct);

router.get("/:productId/price", productController.getProductPrice);
router.get("/:productId/prices", productController.getProductPriceHistory);
router.post("/:productId/price", isAdmin, productController.createProductPrice);
router.put("/:productId/prices/:priceId", isAdmin, productController.updateProductPrice);
router.delete("/:productId/prices/:priceId", isAdmin, productController.deleteProductPrice);

router.get("/:productId/inventory/movements", productController.getProductInventoryHistory);
router.post("/:productId/inventory/grocery", productController.createProductGrocery);
router.post("/:productId/inventory/consumption", productController.createProductConsumption);
router.post("/:productId/inventory/adjustment", isAdmin, productController.createProductAdjustment);
router.patch("/:productId/inventory/grocery/:groceryId", isAdmin, productController.updateProductGrocery);
router.patch("/:productId/inventory/consumption/:consumptionId", isAdmin, productController.updateProductConsumption);
router.patch("/:productId/inventory/adjustment/:adjustmentId", isAdmin, productController.updateProductAdjustment);
router.delete("/:productId/inventory/grocery/:groceryId", isAdmin, productController.deleteProductGrocery);
router.delete("/:productId/inventory/consumption/:consumptionId", isAdmin, productController.deleteProductConsumption);
router.delete("/:productId/inventory/adjustment/:adjustmentId", isAdmin, productController.deleteProductAdjustment);

router.get("/wishlist", wishlistController.getWishlist);
router.get("/wishlist/periods", wishlistController.getWishlistPeriods);
router.get("/wishlist/history/:periodId", wishlistController.getWishlistForPeriod);
router.post("/wishlist/periods", isAdmin, wishlistController.createWishlistPeriod);
router.patch("/wishlist/periods/:periodId", isAdmin, wishlistController.updateWishlistPeriod);
router.delete("/wishlist/periods/:periodId", isAdmin, wishlistController.deleteWishlistPeriod);

router.get("/:productId/wishlist", wishlistController.getProductWishlist);
router.get("/:productId/wishlist/history", wishlistController.getProductWishlistHistory);
router.get("/:productId/wishlist/history/:periodId", wishlistController.getProductWishlistForPeriod);

router.post("/:productId/wishlist", wishlistController.addProductToWishlist);
router.patch("/:productId/wishlist", wishlistController.updateProductWishlist);
router.delete("/:productId/wishlist", wishlistController.removeProductFromWishlist);
router.patch("/:productId/wishlist/users/:userid", isAdmin, wishlistController.updateUsersProductWishlist);
router.delete("/:productId/wishlist/users/:userid", isAdmin, wishlistController.removeUsersProductFromWishlist);
router.patch("/:productId/wishlist/history/:periodId/users/:userid", isAdmin, wishlistController.updateUsersProductWishlistForPeriod);
router.delete("/:productId/wishlist/history/:periodId/users/:userid", isAdmin, wishlistController.removeUsersProductFromWishlistForPeriod);



export default router;