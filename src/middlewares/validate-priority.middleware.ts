import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";
import { IncidentPriority } from "../models/incident.model";

const validPriorities: IncidentPriority[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export const validatePriority = (req: Request, res: Response, next: NextFunction): void => {
    const { priority } = req.body;
    if (priority && !validPriorities.includes(priority)) {
        return next(new AppError(400, "Invalid priority value"));
    }
    next();
};