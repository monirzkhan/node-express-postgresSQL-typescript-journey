import express, { type Application, type Request, type Response } from "express"
import { Pool } from "pg"
import config from "./config";

const app: Application = express();
const port = config.port;

app.use(express.json())

const pool = new Pool({
    connectionString: config.connectionString
})

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30),
            email VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            age INT,
            is_active BOOLEAN DEFAULT TRUE,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            
            `)
        console.log("Database Connected Successfully")
    }
    catch (error) {
        console.log(error)
    }
}

initDB();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        name: "Express Server Running",
        email: "express@gmail.com",
        "author": "monirzkhan@gmail.com"
    })

})

app.post('/api/users', async (req: Request, res: Response) => {
    //console.log(req.body)
    const { name, email, password, age } = req.body;
    try {
        const result = await pool.query(`
    INSERT INTO users(name, email, password, age) VALUES($1, $2, $3,$4)
    RETURNING *
    
    `, [name, email, password, age],)
        // console.log(result);

        res.status(201).json({
            message: "Profile Created Successfully",
            data: result.rows[0],
        })
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error,
        })
    }

})

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
        UPDATE users SET name=$1, age=$2, password=$3, is_active=$4
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
