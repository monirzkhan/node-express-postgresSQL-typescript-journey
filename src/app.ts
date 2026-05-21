import express, { type Application, type Request, type Response } from "express"

import { pool } from "./db";
import { userRoute } from "./modules/user.route";

const app: Application = express();

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        name: "Express Server Running",
        email: "express@gmail.com",
        "author": "monirzkhan@gmail.com"
    })

})

app.use('/api/users', userRoute)
app.get('/api/users', async (req: Request, res: Response) => {

    try {
        const result = await pool.query(`
        SELECT * FROM users;
        `);
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
})

app.get('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [id],)

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
})

app.put("/api/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age, password, is_active } = req.body;


    try {
        const result = await pool.query(`
        UPDATE users 
        SET name=COALESCE($1, name), 
        age=COALESCE($2, age), 
        password=COALESCE($3, password), 
        is_active=COALESCE($4, is_active)
        WHERE id=$5 RETURNING *
        
        `, [name, age, password, is_active, id],
        )
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
})

app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
        DELETE FROM users WHERE id=$1 RETURNING *
        `, [id],)

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
})

export default app;
