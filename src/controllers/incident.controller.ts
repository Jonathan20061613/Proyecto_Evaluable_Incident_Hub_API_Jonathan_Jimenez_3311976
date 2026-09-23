import { Request, Response, NextFunction } from "express";
import { incidents } from "../data/incidents.data";
import { CreateIncidentDto, UpdateIncidentDto, UpdateStatusDto } from "../dtos/incident.dto";
import { AppError } from "../errors/app-error";

export class IncidentController {

    static getAll = (req: Request, res: Response, next: NextFunction): void => {
        res.status(200).json({
            ok: true,
            total: incidents.length,
            data: incidents
        });
    };

    static getCritical = (req: Request, res: Response, next: NextFunction): void => {
        const criticalIncidents = incidents.filter(i => i.priority === "CRITICAL");
        res.status(200).json({
            ok: true,
            total: criticalIncidents.length,
            data: criticalIncidents
        });
    };

    static getPending = (req: Request, res: Response, next: NextFunction): void => {
        const pendingIncidents = incidents.filter(i => i.status === "OPEN" || i.status === "IN_PROGRESS");
        res.status(200).json({
            ok: true,
            total: pendingIncidents.length,
            data: pendingIncidents
        });
    };

    static getStats = (req: Request, res: Response, next: NextFunction): void => {
        const total = incidents.length;
        const open = incidents.filter(i => i.status === "OPEN").length;
        const inProgress = incidents.filter(i => i.status === "IN_PROGRESS").length;
        const resolved = incidents.filter(i => i.status === "RESOLVED").length;
        const critical = incidents.filter(i => i.priority === "CRITICAL").length;

        const totalMinutes = incidents.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
        const averageEstimatedMinutes = total > 0 ? Math.round(totalMinutes / total) : 0;

        res.status(200).json({
            ok: true,
            data: {
                total,
                open,
                inProgress,
                resolved,
                critical,
                averageEstimatedMinutes
            }
        });
    };

    static getById = (req: Request, res: Response, next: NextFunction): void => {
        const id = Number(req.params.id);
        const incident = incidents.find(i => i.id === id);

        if (!incident) {
            return next(new AppError(404, "Incident not found"));
        }

        res.status(200).json({
            ok: true,
            data: incident
        });
    };

    static create = (req: Request, res: Response, next: NextFunction): void => {
        const body = req.body as CreateIncidentDto;

        const newId = incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1;

        const newIncident = {
            id: newId,
            title: body.title,
            description: body.description,
            reporter: body.reporter,
            location: body.location,
            priority: body.priority,
            status: "OPEN" as const,
            estimatedMinutes: body.estimatedMinutes,
            createdAt: new Date().toISOString()
        };

        incidents.push(newIncident);

        res.status(201).json({
            ok: true,
            data: newIncident
        });
    };

    static update = (req: Request, res: Response, next: NextFunction): void => {
        const id = Number(req.params.id);
        const index = incidents.findIndex(i => i.id === id);

        if (index === -1) {
            return next(new AppError(404, "Incident not found"));
        }

        const body = req.body as UpdateIncidentDto;

        if (body.priority === "CRITICAL" && body.estimatedMinutes > 60) {
            return next(new AppError(400, "Critical incidents cannot exceed 60 estimated minutes"));
        }

        incidents[index] = {
            ...incidents[index],
            title: body.title ?? incidents[index].title,
            description: body.description ?? incidents[index].description,
            location: body.location ?? incidents[index].location,
            priority: body.priority ?? incidents[index].priority,
            estimatedMinutes: body.estimatedMinutes ?? incidents[index].estimatedMinutes
        };

        res.status(200).json({
            ok: true,
            data: incidents[index]
        });
    };

    static updateStatus = (req: Request, res: Response, next: NextFunction): void => {
        const id = Number(req.params.id);
        const incident = incidents.find(i => i.id === id);

        if (!incident) {
            return next(new AppError(404, "Incident not found"));
        }

        const { status } = req.body as UpdateStatusDto;

        if (!["OPEN", "IN_PROGRESS", "RESOLVED"].includes(status)) {
            return next(new AppError(400, "Invalid status value"));
        }

        const currentStatus = incident.status;

        if (currentStatus === "RESOLVED" && (status === "OPEN" || status === "IN_PROGRESS")) {
            return next(new AppError(400, `Invalid state transition from ${currentStatus} to ${status}`));
        }

        incident.status = status;

        res.status(200).json({
            ok: true,
            data: incident
        });
    };

    static remove = (req: Request, res: Response, next: NextFunction): void => {
        const id = Number(req.params.id);
        const index = incidents.findIndex(i => i.id === id);

        if (index === -1) {
            return next(new AppError(404, "Incident not found"));
        }

        incidents.splice(index, 1);

        res.status(204).send();
    };
}