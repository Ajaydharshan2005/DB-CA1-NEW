const express = require('express')
const mongoose = require('mongoose')
const dotenv=require('dotenv')

dotenv.config(); 

const PORT=process.env.PORT
const app=express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Restaurant api running')
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MONGODB CONNECTED"))
.catch((err)=>console.log("CONNECTION FAILED",err))



const resSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    menuitem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu"
    }]

})
const res=mongoose.model('Res',resSchema)

const menuSchema=new mongoose.Schema({
    dishname:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    }
})

const menu=mongoose.model('Menu',menuSchema)

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
