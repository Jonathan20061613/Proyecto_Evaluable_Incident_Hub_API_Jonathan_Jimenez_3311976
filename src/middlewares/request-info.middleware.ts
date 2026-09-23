import { Request, Response, NextFunction } from "express";

export interface RequestInfo {
    timestamp: string;
    method: string;
    path: string;
}

declare global {
    namespace Express {
        interface Request {
            requestInfo?: RequestInfo;
            userRole?: "instructor" | "technician";
        }
    }
}

export const requestInfoMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    req.requestInfo = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path
    };
    next();
};