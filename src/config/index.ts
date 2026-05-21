import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({
    path: path.join(process.cwd(),'.env')
})

const config={
    connectionString:process.env.CONNECTIONSTRING as string,
    port: process.env.PORT,
    jwt_secret:process.env.JWT_SECRET,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET
}

export default config;