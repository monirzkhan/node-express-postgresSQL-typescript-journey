import { Pool } from "pg"
import config from "../config"

export const pool = new Pool({
    connectionString: config.connectionString
})

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30),
            email VARCHAR(30) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            age INT,
            is_active BOOLEAN DEFAULT TRUE,
            role VARCHAR(10) DEFAULT 'user',

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            
            `)
        await pool.query(`
                CREATE TABLE IF NOT EXISTS profiles(
                id SERIAL PRIMARY KEY,
                user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

                bio TEXT,
                address TEXT,
                phone VARCHAR(20),
                gender VARCHAR(15),

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
