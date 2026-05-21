import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../../config";

const loginIntoDB = async (payload: any) => {
    const { email, password } = payload;

    const userData = await pool.query(`
        SELECT * from users WHERE email=$1
        
        `, [email],)
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials")
    }
    const user = userData.rows[0];
    // console.log(userData.rows[0])
    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials")
    }

    //Token Generation
    const jwtPayload={
        name: user.name,
        id: user.id,
        is_active: user.is_active,
        email:user.email
    }

    const accessToken= jwt.sign(jwtPayload, config.jwt_secret as string, {
        expiresIn: "1d"
    })
    return {accessToken};
}



export const authService = {
    loginIntoDB,
}