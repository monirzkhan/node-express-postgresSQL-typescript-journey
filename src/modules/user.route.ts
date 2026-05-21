import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
import { pool } from "../db";
import auth from "./middleware/auth";
import { USER_ROLE } from "../types/role";


const router = Router();

export const userRoute = router;

router.post('', userController.createUser)
router.get('', auth(USER_ROLE.admin), userController.getAllusers)
router.get('/:id',userController.getSingleUser)
router.put("/:id", userController.updateUser)
router.delete('/:id', userController.deleteUser)

