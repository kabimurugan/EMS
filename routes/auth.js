import express from "express";
import  {login, verify}  from "../controllers/authControllers.js";
import authMiddleware from '../middleware/AuthMiddleware.js'


const router = express.Router()

router.post("/login", login )
          //path    controller (req, res) => {}
//api.use(api/auth/login)   

router.get("/verify", authMiddleware, verify)

export default router;