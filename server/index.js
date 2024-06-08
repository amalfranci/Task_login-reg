import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'


import dotenv from 'dotenv'
dotenv.config()
import { UserRouter } from './Routes/UserRoutes.js'


const app = express()
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use('/auth',UserRouter)


mongoose.connect('mongodb://localhost:27017/MechineTaskUser')

mongoose.connection.on('connected', (err) => {
    
    if (err)
    {
        console.log(err)
    }
    
    console.log("MongoDb Connect successfully")
})


app.listen(process.env.PORT || 3001, () => {
    
    console.log("Server Connected ")
})