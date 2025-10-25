import jwt from "jsonwebtoken";
import adminSchema from "../model/adminSchema.js";
import { Message, Status } from "../utils/statusMessage.js";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
export const adminLoginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    // console.log("Email : ", email);
    // console.log("Password : ", password);

    const adminObj = await adminSchema.findOne({ email: email });
    if (adminObj) {
      const existingPassword = adminObj.password;
      const status = await bcrypt.compare(password, existingPassword);

      if (status) {
        const adminPayload = {
          email: email,
          role: "admin",
        };
        const token = jwt.sign(adminPayload, ADMIN_SECRET_KEY, {
          expiresIn: "1d",
        });
        response.cookie("admin_jwt", token, {
          httpOnly: true,
          maxAge: 760000 * 60 * 60,
        });
        // response.redirect("/admin/adminHome");
        response.render("adminHome.ejs",{email:email,message:"",status:""});
      } else {
        response.render("adminLogin", {
          message: Message.INVALID_PASSWORD,
          status: Status.ERROR,
        });
      }
    } else {
      response.render("adminLogin", {
        message: Message.INVALID_EMAIL,
        status: Status.ERROR,
      });
    }
  } catch (error) {
    console.log("Error in adminLogin Controller", error);

    response.render("adminLogin", { message:Message.SOMETHING_WENT_WRONG, status:Status.ERROR });
  }
};

export const adminHomeController=async(request,response)=>{
    try {
        response.render("adminHome",{email:request.adminPayload.email,message:"",status:""});
    } catch (error) {
        console.log("Error in adminHome controller",error);
        response.render("adminLogin", { message:Message.SOMETHING_WENT_WRONG, status:Status.ERROR });
        
    }
}

export const adminLogoutController =async(request,response)=>{
  try {
      response.clearCookie('admin_jwt');
      console.log("Logout Successfully");
      response.render("adminLogin.ejs",{message:Message.LOGOUT_SUCCESSFULLY,status:Status.SUCCESS})

      
  } catch (error) {
    console.log("Error  in adminLogout Controller",error);
    response.render("adminLogin.ejs",{message:Message.SOMETHING_WENT_WRONG,status:Status.ERROR})
    
  }
}
