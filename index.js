import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.js"
import departmentRouter from './routes/department.js'
import employeeRoutes from "./routes/employee.js";


import dotenv from "dotenv"
dotenv.config()

import connectToDatabase from "./Database/db.js"

connectToDatabase()

const app = express()
app.use(cors())
app.use(express.json())
app.get("/test", (req, res) => res.send("Server is live"));


app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)

app.use("/uploads", express.static("uploads"));

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on the PORT ${PORT}`)
})
