import express from 'express';
import dotenv from 'dotenv';
import adminRouter from './router/adminRouter.js';
import { adminCredentials } from './utils/adminUtil.js';
import url from './connections/Db_config.js';
import mongoose from 'mongoose';
import { Message,Status } from './utils/statusMessage.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(url)
var app=express();
app.set("views","views");
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())

app.use("/admin",adminRouter);

app.get('/adminLogin',async(request,response)=>{
    const res = await adminCredentials();
    if(!res){
        console.log("Admin Credentials not inserted");
        response.render("adminLogin.ejs",{message:Message.ADMIN_CREDENTIAL_NOT_AVAILABLE,status:Status.ERROR});
    }else
       response.render("adminLogin.ejs",{message:"",status:""});
});

app.get("/",(request,response)=>{
    response.render("index.ejs");
})

app.listen(process.env.PORT,()=>{
    console.log("Server Connection Successfull ");
    
})






