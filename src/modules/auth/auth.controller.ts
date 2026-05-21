import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser=async(req:Request,res:Response )=>{
    const {email, password}=req.body;
    try {
        const result =await authService.loginIntoDB(req.body)
        res.status(200).json({
            success: true,
            message: "User Login Successfully",
            data: result
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
        
    }

}

export const authController={
    loginUser,
}