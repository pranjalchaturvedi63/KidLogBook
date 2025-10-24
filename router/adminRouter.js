import express from 'express';
import { adminLoginController ,adminHomeController } from '../controller/adminController.js';
import { Message, Status } from '../utils/statusMessage.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


var adminRouter=express.Router();

const ADMIN_SECRET_KEY=process.env.ADMIN_SECRET_KEY;
const authenticateJWT=(request,response,next)=>{
        try {
            const token =request.cookies.admin_jwt;
            if(!token){
                response.render("adminLogin",{message:Message.AUTHENTICATE_ERROR,status:Status.ERROR});
                console.log("Token not found in Authentication");
            }
            else{
                jwt.verify(token,ADMIN_SECRET_KEY,(error,adminPayload)=>{
                    if(error){
                        console.log("Error while verifying token");
                        response.render("adminLogin",{message:Message.JWT_VERIFYING_ERROR,status:Status.ERROR});
                    }
                    else{
                        request.adminPayload=adminPayload;
                        next();
                    }
                })
            }
            
        } catch (error) {
            console.log("Error inside adminAuthentication",error);
            
            response.render("adminLogin.ejs",{message:Message.SOMETHING_WENT_WRONG,status:Status.ERROR});
        }
}

const authorizeJWT=async(request,response,next)=>{
    try {
        if(request.adminPayload.role=="admin"){
            next();
        }
        else{
            console.log("Else part of AuthorizeJWT");
            response.render("adminLogin",{message:Message.AUTHORIZE_ERROR,status:Status.ERROR})
        }
    } catch (error) {
        console.log("Error inside AuthorizeJWT",error);
        response.render("adminLogin",{message:Message.AUTHORIZE_ERROR,status:Status.ERROR})
        
    }
}

adminRouter.post("/adminLogin",adminLoginController);
adminRouter.get('/adminHome',authenticateJWT,authorizeJWT,adminHomeController);
export default adminRouter;