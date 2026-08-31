import type { Request, Response } from "express";

function getProducts(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function getProduct(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function createProduct(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function updateProduct(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function deleteProduct(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

// PRICES 

function getProductPrice(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function getProductPriceHistory(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function createProductPrice(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function updateProductPrice(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function deleteProductPrice(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function getProductInventoryHistory(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function createProductGrocery(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function createProductConsumption(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function createProductAdjustment(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function updateProductInventoryMovement(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function updateProductGrocery(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function updateProductConsumption(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function updateProductAdjustment(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function deleteProductGrocery(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function deleteProductConsumption(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

function deleteProductAdjustment(req: Request, res: Response) {
    res.status(200).json({
        message: "This is a placeholder function",
    });
}

export const productController = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductPrice,
    getProductPriceHistory,
    createProductPrice,
    updateProductPrice,
    deleteProductPrice,
    getProductInventoryHistory,
    createProductGrocery,
    createProductConsumption,
    createProductAdjustment,
    updateProductInventoryMovement,
    updateProductGrocery,
    updateProductConsumption,
    updateProductAdjustment,
    deleteProductGrocery,
    deleteProductConsumption,
    deleteProductAdjustment,
};