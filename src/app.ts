import express, { type Application, type NextFunction, type Request, type Response } from "express"

import { pool } from "./db";
import { userRoute } from "./modules/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import fs from "fs"
import logger from "./modules/middleware/logger";

const app: Application = express();

app.use(express.json())

app.use(logger);


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        name: "Express Server Running",
        email: "express@gmail.com",
        "author": "monirzkhan@gmail.com"
    })

})

app.use('/api/users', userRoute)
app.use('/api/profile', profileRouter)
app.use('/api/auth', authRoute)


export default app;
