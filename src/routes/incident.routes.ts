import { Router } from "express";
import { IncidentController } from "../controllers/incident.controller";
import { validateId } from "../middlewares/validate-id.middleware";
import { validateIncident } from "../middlewares/validate-incident.middleware";
import { validatePriority } from "../middlewares/validate-priority.middleware";
import { validateTime } from "../middlewares/validate-time.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

router.get("/critical", IncidentController.getCritical);
router.get("/pending", IncidentController.getPending);
router.get("/stats", IncidentController.getStats);

router.get("/", IncidentController.getAll);
router.get("/:id", validateId, IncidentController.getById);

router.post("/", validateIncident, validatePriority, validateTime, IncidentController.create);
router.put("/:id", validateId, validatePriority, validateTime, IncidentController.update);
router.patch("/:id/status", validateId, IncidentController.updateStatus);
router.delete("/:id", authMiddleware, adminMiddleware, validateId, IncidentController.remove);

export default router;