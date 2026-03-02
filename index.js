import { configDotenv } from "dotenv";
configDotenv()


import app from "./src/app.js";
import connectDB from "./src/db/db.js";


connectDB()
app.get("/",(req,res)=>{
    res.send('server running')
})
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})