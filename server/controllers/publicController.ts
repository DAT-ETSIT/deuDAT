import type { Request, Response } from "express";

function getApiInfo(req: Request, res: Response) {
    res.status(200).json({
        message: "Welcome to the deudat API",
    });
}

function getApiHealth(req: Request, res: Response) {
    res.status(200).json({
        message: "API is running smoothly",
    });
}

export const publicController = {
    getApiInfo,
    getApiHealth,
};