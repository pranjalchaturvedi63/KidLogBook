import express from 'express';
import { adminLoginController } from '../controller/adminController.js';
var adminRouter=express.Router();

adminRouter.post("/adminLogin",adminLoginController);
export default adminRouter;