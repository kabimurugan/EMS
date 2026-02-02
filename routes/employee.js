import express from "express";
import { addEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "../controllers/employeeControllers.js";
import { upload } from "../middleware/Multer.js";
import authMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router();

router.get('/', authMiddleware, getEmployees)
router.post("/add" ,authMiddleware, upload.single("image"), addEmployee);

router.get("/:id", authMiddleware, getEmployee)
router.put("/:id",upload.single("image"),  authMiddleware, updateEmployee)
router.delete("/:id", authMiddleware, deleteEmployee)

export default router;

