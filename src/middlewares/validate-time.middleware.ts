import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateTime = (req: Request, res: Response, next: NextFunction): void => {
    const { estimatedMinutes, priority } = req.body;

    if (estimatedMinutes !== undefined) {
        if (typeof estimatedMinutes !== "number" || isNaN(estimatedMinutes)) {
            return next(new AppError(400, "Estimated minutes must be a number"));
        }
        if (estimatedMinutes <= 0) {
            return next(new AppError(400, "Estimated minutes must be greater than 0"));
        }
        if (estimatedMinutes > 480) {
            return next(new AppError(400, "Estimated minutes cannot exceed 480"));
        }

        if (priority === "CRITICAL" && estimatedMinutes > 60) {
            return next(new AppError(400, "Critical incidents cannot exceed 60 estimated minutes"));
        }
    }
    next();
};