import express, { type Application, type Request, type Response } from "express"
import { Pool } from "pg"

const app: Application = express();
const port = 3000;

app.use(express.json())

const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_P54MJxIANeHu@ep-sparkling-math-aplk1l0i.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"
})

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) NOT NULL,
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

app.post('/', async (req: Request, res: Response) => {
    //console.log(req.body)

    const { name, email, password } = req.body;
    res.status(201).json({
        message: "Created Successfully",
        data: { name, email }
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
