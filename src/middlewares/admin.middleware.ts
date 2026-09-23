import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.userRole !== "instructor") {
        return next(new AppError(403, "Forbidden: Administrator access required"));
    }
    next();
};