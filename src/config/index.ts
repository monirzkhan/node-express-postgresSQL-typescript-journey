import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({
    path: path.join(process.cwd(),'.env')
})

const config={
    connectionString:process.env.CONNECTIONSTRING as string,
    port: process.env.PORT,
}

export default config;