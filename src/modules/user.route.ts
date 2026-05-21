import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";


const router = Router();

export const userRoute = router;

router.post('', userController.createUser)
