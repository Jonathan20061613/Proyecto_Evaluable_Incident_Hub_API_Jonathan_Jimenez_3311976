import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
    const idParam = req.params.id;
    const id = Number(idParam);

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return next(new AppError(400, "Invalid incident id"));
    }
    next();
};