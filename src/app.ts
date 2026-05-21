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
app.use('/api/users',userRoute)
app.use('/api/users', userRoute)
app.use('/api/users', userRoute)
app.use('/api/users', userRoute)


export default app;
