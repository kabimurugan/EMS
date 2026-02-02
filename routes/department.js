import express from "express";
import { getDepartments, getDepartment, add, updateDepartment, deleteDepartment } from "../controllers/departmentController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

// ✅ STATIC ROUTES
router.post("/add", authMiddleware, add);
router.get("/", authMiddleware, getDepartments);

// ✅ DYNAMIC ROUTE MUST BE LAST
router.get("/:id", authMiddleware, getDepartment);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
