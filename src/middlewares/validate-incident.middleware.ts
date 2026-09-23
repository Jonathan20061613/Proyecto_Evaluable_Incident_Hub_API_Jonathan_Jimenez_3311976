import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const validateIncident = (req: Request, res: Response, next: NextFunction): void => {
    const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

    if (!title || !description || !reporter || !location || !priority || estimatedMinutes === undefined) {
        return next(new AppError(400, "Missing required incident fields"));
    }
    next();
};