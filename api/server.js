import { config } from "dotenv"
import express from "express"
import connectDB from "./config/db.js"
import cors from "cors"
import corsOptions from "./middlewares/corsOptions.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
// import routes
import authRouter from "./routes/auth.js"
import projectRouter from "./routes/project.js"
import journeyRouter from "./routes/journey.js"
import taskRouter from "./routes/task.js"


const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000

// dotenv config
config()

// connect to mongodb
connectDB()

// configure routes
app.use('/api/auth' , authRouter)
app.use('/api/project' , projectRouter)
app.use('/api/journey' , journeyRouter)
app.use('/api/task' , taskRouter)

app.listen(PORT , ()=>{
    console.log(`app is running on http://localhost:${PORT}`)
})