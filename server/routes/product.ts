import { Router } from "express";

import { isAdmin } from "../middleware/authorization.ts";
import { productController } from "../controllers/productController.ts";
import { wishlistController } from "../controllers/wishlistController.ts";

import { validateParams, validateBody } from "../middleware/validate.ts";
import { productIdSchema, periodIdSchema, productPriceIdsSchema, productGroceryIdsSchema, productAdjustmentIdsSchema, productConsumptionIdsSchema, productPeriodIdsSchema, productUserIdsSchema, productUserPeriodIdsSchema } from "../middleware/validate.ts";
import { ProductPostSchema, ProductPatchSchema, ProductPricePostSchema, ProductGroceryPostSchema ,ProductGroceryPatchSchema, ProductConsumptionPostSchema, ProductConsumptionPatchSchema, ProductAdjustmentPostSchema, ProductAdjustmentPatchSchema, WishlistPeriodPostSchema, WishlistPeriodPatchSchema, WishlistEntrySchema } from "../middleware/validate.ts";

const router = Router();

// All routes start by /products, specified in app.ts
router.get("/", productController.getProducts);
router.get("/:productId", validateParams(productIdSchema), productController.getProduct);
router.post("/", validateBody(ProductPostSchema), productController.createProduct);
router.patch("/:productId", isAdmin, validateParams(productIdSchema), validateBody(ProductPatchSchema), productController.updateProduct);
router.delete("/:productId", isAdmin, validateParams(productIdSchema), productController.deleteProduct);

router.get("/:productId/price", validateParams(productIdSchema), productController.getProductPrice);
router.get("/:productId/prices", validateParams(productIdSchema), productController.getProductPriceHistory);
router.post("/:productId/price", isAdmin, validateParams(productIdSchema), validateBody(ProductPricePostSchema), productController.createProductPrice);
router.put("/:productId/prices/:priceId", isAdmin, validateParams(productPriceIdsSchema), validateBody(ProductPricePostSchema), productController.updateProductPrice);
router.delete("/:productId/prices/:priceId", isAdmin, validateParams(productPriceIdsSchema), productController.deleteProductPrice);

router.get("/:productId/inventory/movements", validateParams(productIdSchema), productController.getProductInventoryHistory);
router.post("/:productId/inventory/grocery", validateParams(productIdSchema), validateBody(ProductGroceryPostSchema), productController.createProductGrocery);
router.post("/:productId/inventory/consumption", validateParams(productIdSchema), validateBody(ProductConsumptionPostSchema), productController.createProductConsumption);
router.post("/:productId/inventory/adjustment", isAdmin, validateParams(productIdSchema), validateBody(ProductAdjustmentPostSchema), productController.createProductAdjustment);
router.patch("/:productId/inventory/grocery/:groceryId", isAdmin, validateParams(productGroceryIdsSchema), validateBody(ProductGroceryPatchSchema), productController.updateProductGrocery);
router.patch("/:productId/inventory/consumption/:consumptionId", isAdmin, validateParams(productConsumptionIdsSchema), validateBody(ProductConsumptionPatchSchema), productController.updateProductConsumption);
router.patch("/:productId/inventory/adjustment/:adjustmentId", isAdmin, validateParams(productAdjustmentIdsSchema), validateBody(ProductAdjustmentPatchSchema), productController.updateProductAdjustment);
router.delete("/:productId/inventory/grocery/:groceryId", isAdmin, validateParams(productGroceryIdsSchema), productController.deleteProductGrocery);
router.delete("/:productId/inventory/consumption/:consumptionId", isAdmin, validateParams(productConsumptionIdsSchema), productController.deleteProductConsumption);
router.delete("/:productId/inventory/adjustment/:adjustmentId", isAdmin, validateParams(productAdjustmentIdsSchema), productController.deleteProductAdjustment);

router.get("/wishlist", wishlistController.getWishlist);
router.get("/wishlist/periods", wishlistController.getWishlistPeriods);
router.get("/wishlist/history/:periodId", wishlistController.getWishlistForPeriod);
router.post("/wishlist/periods", isAdmin, validateBody(WishlistPeriodPostSchema), wishlistController.createWishlistPeriod);
router.patch("/wishlist/periods/:periodId", isAdmin, validateParams(periodIdSchema), validateBody(WishlistPeriodPatchSchema), wishlistController.updateWishlistPeriod);
router.delete("/wishlist/periods/:periodId", isAdmin, validateParams(periodIdSchema), wishlistController.deleteWishlistPeriod);

router.get("/:productId/wishlist", validateParams(productIdSchema), wishlistController.getProductWishlist);
router.get("/:productId/wishlist/history", validateParams(productIdSchema), wishlistController.getProductWishlistHistory);;
router.get("/:productId/wishlist/history/:periodId", validateParams(productPeriodIdsSchema), wishlistController.getProductWishlistForPeriod);

router.post("/:productId/wishlist", validateParams(productIdSchema), validateBody(WishlistEntrySchema), wishlistController.addProductToWishlist);
router.patch("/:productId/wishlist", validateParams(productIdSchema), validateBody(WishlistEntrySchema), wishlistController.updateProductWishlist);
router.delete("/:productId/wishlist", validateParams(productIdSchema), wishlistController.removeProductFromWishlist);
router.patch("/:productId/wishlist/users/:userid", isAdmin, validateParams(productUserIdsSchema), validateBody(WishlistEntrySchema), wishlistController.updateUsersProductWishlist);
router.delete("/:productId/wishlist/users/:userid", isAdmin, validateParams(productUserIdsSchema), wishlistController.removeUsersProductFromWishlist);
router.patch("/:productId/wishlist/history/:periodId/users/:userid", isAdmin, validateParams(productUserPeriodIdsSchema), validateBody(WishlistEntrySchema), wishlistController.updateUsersProductWishlistForPeriod);
router.delete("/:productId/wishlist/history/:periodId/users/:userid", isAdmin, validateParams(productUserPeriodIdsSchema), wishlistController.removeUsersProductFromWishlistForPeriod);



export default router;