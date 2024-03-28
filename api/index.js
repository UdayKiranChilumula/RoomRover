import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app=express()

//mongo connection 
main().then((res)=>{console.log("server connected to mongoDB")}).catch((err)=>console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO)
}

//middle wares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    })
})

app.listen(3000,()=>{
    console.log("server running on port 3000")
})
