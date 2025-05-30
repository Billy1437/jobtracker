import express from "express"
import { connectDb } from "./config/db.js";
import authRouter from "./routes/auth.js";
import applicationRouter from "./routes/application.js"
import cors from "cors"



const app = express()
const PORT = process.env.PORT  | 5001;


app.use(express.json())
app.use(cors())



// route auth
app.use("/api/auth",authRouter)

// application route

app.use("/api/application",applicationRouter )









// database connection
connectDb().then(() => {
     app.listen(PORT,(req,res) => {
        console.log("server is started on",PORT)
})
})



