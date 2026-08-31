import { Router } from "express";

import { isAdmin } from "../middleware/authorization.ts";
import { productController } from "../controllers/productController.ts";

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



export default router;