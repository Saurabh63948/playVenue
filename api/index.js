import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app=express();
const PORT =3005;

app.use(cors());

app.use(express.json());


mongoose.connect('mongodb+srv://saurabh07mahi:100Rabh07@cluster0.o6ktsbv.mongodb.net/').then(()=>console.log("mongodb is connected"))
.catch((err)=>console.error(err))


app.listen(PORT,()=>{
  console.log(`your server is running on https://localhost:${PORT}`)
})