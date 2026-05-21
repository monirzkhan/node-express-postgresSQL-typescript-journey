import type { Request, Response } from "express";
import { pool } from "../db";
import { userService } from "./user.service";

const createUser=async (req: Request, res: Response) => {
    //console.log(req.body)
    const { user, email, password, age ,role} = req.body;
    try {
        const result=await userService.userIntoDB(req.body)
        // console.log(result);

        res.status(201).json({
            message: "User Created Successfully",
            data: result.rows[0],
        })
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error,
        })
    }

}

const getAllusers=async (req: Request, res: Response) => {
    console.log('From Controller', req.user)

    try {
        const result=await userService.getAllUsersFromDB();
        //console.log(result)


        res.status(201).json({
            success: true,
            message: "Users Retrived Successfully",
            data: result.rows
        })


    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })

    }
}

const getSingleUser=async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.getSingleUserFromDB(id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                data: {}

            })
        }
        res.status(201).json({
            success: true,
            message: "User Retrived Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })

    }
}

const updateUser=async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age, password, is_active } = req.body;


    try {
        const result = await userService.updateUserIntoDB(id as string, req.body)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                data: {}
            })
        }
        res.status(201).json({
            success: true,
            message: "User updated Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })

    }
}

const deleteUser=async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await userService.deleteUserfromDB(id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
                data: {}

            })
        }
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })

    }
}

export const userController= {
    createUser,
    getAllusers,
    getSingleUser,
    updateUser,
    deleteUser
}