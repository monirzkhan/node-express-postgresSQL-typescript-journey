import { pool } from "../db"
import type { Iuser } from "./user.interface";

const userIntoDB = async (payload: Iuser) => {

    const { name, email, password, age } = payload;
    const result = await pool.query(`
    INSERT INTO users(name, email, password, age) VALUES($1, $2, $3,$4)
    RETURNING *
    
    `, [name, email, password, age],)
    return result;
}

const getAllUsersFromDB=async()=>{
    const result = await pool.query(`
        SELECT * FROM users;
        `);
        return result;
}

const getSingleUserFromDB=async(id: string)=>{

    const result=await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [id],)
        return result;
}

const updateUserIntoDB=async(id: string, payload:Iuser)=>{
    const {name, age, password,is_active}=payload;
    
    const result=await pool.query(`
        UPDATE users 
        SET name=COALESCE($1, name), 
        age=COALESCE($2, age), 
        password=COALESCE($3, password), 
        is_active=COALESCE($4, is_active)
        WHERE id=$5 RETURNING *
        
        `, [name, age, password, is_active, id],
        )
        return result;
}

const deleteUserfromDB=async(id:string)=>{
    const result=await pool.query(`
        DELETE FROM users WHERE id=$1 RETURNING *
        `, [id],)
        return result;
}
export const userService = {
    userIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserfromDB
}